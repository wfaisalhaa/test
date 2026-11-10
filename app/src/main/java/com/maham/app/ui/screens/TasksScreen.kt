package com.maham.app.ui.screens

import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyListScope
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.SwipeToDismissBox
import androidx.compose.material3.SwipeToDismissBoxValue
import androidx.compose.material3.Text
import androidx.compose.material3.rememberSwipeToDismissBoxState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.maham.app.R
import com.maham.app.data.Category
import com.maham.app.data.Task
import com.maham.app.ui.components.NgChip
import com.maham.app.ui.components.TaskCard
import com.maham.app.ui.theme.Ng
import java.time.LocalDate

private enum class Filter(val labelRes: Int, val category: Category?) {
    ALL(R.string.filter_all, null),
    PERSONAL(R.string.filter_personal, Category.PERSONAL),
    WORK(R.string.filter_work, Category.WORK),
    LIST(R.string.filter_list, Category.LIST)
}

@Composable
fun TasksScreen(
    modifier: Modifier = Modifier,
    tasks: List<Task>,
    onToggle: (Task, Boolean) -> Unit,
    onStar: (Task) -> Unit,
    onOpen: (Task) -> Unit,
    onDelete: (Task) -> Unit
) {
    var filter by rememberSaveable { mutableStateOf(Filter.ALL) }
    val today = LocalDate.now().toEpochDay()

    val visible = tasks.filter { filter.category == null || it.category == filter.category }
    val overdue = visible.filter { !it.done && it.dueDay != null && it.dueDay < today }
    val todayTasks = visible.filter { !it.done && it.dueDay == today }
    val other = visible.filter { !it.done && (it.dueDay == null || it.dueDay > today) }
    val done = visible.filter { it.done }

    Column(modifier.fillMaxSize()) {
        Row(
            Modifier
                .fillMaxWidth()
                .horizontalScroll(rememberScrollState())
                .padding(horizontal = 16.dp, vertical = 12.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Filter.entries.forEach { f ->
                NgChip(text = stringResource(f.labelRes), selected = filter == f) { filter = f }
            }
        }

        if (visible.isEmpty()) {
            Box(Modifier.fillMaxSize().padding(32.dp), contentAlignment = Alignment.Center) {
                Text(
                    stringResource(R.string.empty_tasks),
                    style = MaterialTheme.typography.bodyLarge,
                    color = Ng.tokens.muted,
                    textAlign = TextAlign.Center
                )
            }
        } else {
            LazyColumn(
                contentPadding = PaddingValues(start = 16.dp, end = 16.dp, bottom = 96.dp),
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                section(R.string.section_overdue, overdue, onToggle, onStar, onOpen, onDelete)
                section(R.string.section_today, todayTasks, onToggle, onStar, onOpen, onDelete)
                section(R.string.section_other, other, onToggle, onStar, onOpen, onDelete)
                section(R.string.section_done, done, onToggle, onStar, onOpen, onDelete)
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
private fun LazyListScope.section(
    titleRes: Int,
    list: List<Task>,
    onToggle: (Task, Boolean) -> Unit,
    onStar: (Task) -> Unit,
    onOpen: (Task) -> Unit,
    onDelete: (Task) -> Unit
) {
    if (list.isEmpty()) return
    item(key = "header_$titleRes") {
        Text(
            text = "${stringResource(titleRes)} (${list.size})",
            style = MaterialTheme.typography.headlineSmall,
            modifier = Modifier.padding(top = 10.dp, bottom = 2.dp)
        )
    }
    items(list, key = { it.id }) { task ->
        val state = rememberSwipeToDismissBoxState(
            confirmValueChange = {
                if (it != SwipeToDismissBoxValue.Settled) { onDelete(task); true } else false
            }
        )
        SwipeToDismissBox(state = state, backgroundContent = {}) {
            TaskCard(
                task = task,
                onToggle = { onToggle(task, it) },
                onStar = { onStar(task) },
                onClick = { onOpen(task) }
            )
        }
    }
}
