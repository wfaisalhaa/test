package com.maham.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.KeyboardArrowLeft
import androidx.compose.material.icons.automirrored.filled.KeyboardArrowRight
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.maham.app.R
import com.maham.app.data.Task
import com.maham.app.ui.components.TaskCard
import java.time.DayOfWeek
import java.time.LocalDate
import java.time.YearMonth
import java.time.format.TextStyle
import java.util.Locale

@Composable
fun CalendarScreen(
    modifier: Modifier = Modifier,
    tasks: List<Task>,
    firstDayOfWeek: DayOfWeek,
    onToggle: (Task, Boolean) -> Unit,
    onStar: (Task) -> Unit,
    onOpen: (Task) -> Unit
) {
    val today = LocalDate.now()
    var month by remember { mutableStateOf(YearMonth.from(today)) }
    var selected by remember { mutableStateOf(today) }

    val byDay = remember(tasks) { tasks.filter { it.dueDay != null }.groupBy { it.dueDay!! } }
    val selectedTasks = byDay[selected.toEpochDay()].orEmpty()

    LazyColumn(
        modifier.fillMaxSize(),
        contentPadding = PaddingValues(start = 16.dp, end = 16.dp, top = 8.dp, bottom = 96.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        item {
            Surface(shape = MaterialTheme.shapes.large, color = MaterialTheme.colorScheme.surface, shadowElevation = 2.dp) {
                Column(Modifier.padding(12.dp)) {
                    // Month header
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        IconButton(onClick = { month = month.minusMonths(1) }) {
                            Icon(Icons.AutoMirrored.Filled.KeyboardArrowLeft, null)
                        }
                        Text(
                            "${month.month.getDisplayName(TextStyle.FULL, Locale.getDefault())}، ${month.year}",
                            style = MaterialTheme.typography.titleLarge,
                            modifier = Modifier.weight(1f),
                            textAlign = TextAlign.Center
                        )
                        IconButton(onClick = { month = month.plusMonths(1) }) {
                            Icon(Icons.AutoMirrored.Filled.KeyboardArrowRight, null)
                        }
                    }

                    // Weekday labels
                    val days = (0..6).map { firstDayOfWeek.plus(it.toLong()) }
                    Row(Modifier.fillMaxWidth()) {
                        days.forEach { d ->
                            Text(
                                d.getDisplayName(TextStyle.NARROW, Locale.getDefault()),
                                modifier = Modifier.weight(1f),
                                textAlign = TextAlign.Center,
                                style = MaterialTheme.typography.labelLarge,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        }
                    }

                    // Grid
                    val first = month.atDay(1)
                    val offset = ((first.dayOfWeek.value - firstDayOfWeek.value) + 7) % 7
                    val cells = offset + month.lengthOfMonth()
                    val rows = (cells + 6) / 7
                    for (r in 0 until rows) {
                        Row(Modifier.fillMaxWidth()) {
                            for (c in 0 until 7) {
                                val idx = r * 7 + c - offset
                                Box(Modifier.weight(1f).aspectRatio(1f).padding(3.dp), contentAlignment = Alignment.Center) {
                                    if (idx in 0 until month.lengthOfMonth()) {
                                        val date = month.atDay(idx + 1)
                                        DayCell(
                                            date = date,
                                            isToday = date == today,
                                            isSelected = date == selected,
                                            dayTasks = byDay[date.toEpochDay()].orEmpty(),
                                            onClick = { selected = date }
                                        )
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        item {
            Text(
                "${selected.dayOfMonth} ${selected.month.getDisplayName(TextStyle.FULL, Locale.getDefault())} · ${selectedTasks.size}",
                style = MaterialTheme.typography.titleMedium,
                modifier = Modifier.padding(top = 6.dp)
            )
        }
        if (selectedTasks.isEmpty()) {
            item {
                Text(
                    stringResource(R.string.empty_tasks),
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    modifier = Modifier.fillMaxWidth().padding(24.dp),
                    textAlign = TextAlign.Center
                )
            }
        }
        items(selectedTasks, key = { it.id }) { task ->
            TaskCard(task = task, onToggle = { onToggle(task, it) }, onStar = { onStar(task) }, onClick = { onOpen(task) })
        }
    }
}

@Composable
private fun DayCell(date: LocalDate, isToday: Boolean, isSelected: Boolean, dayTasks: List<Task>, onClick: () -> Unit) {
    val pending = dayTasks.filter { !it.done }
    val ringColor = pending.firstOrNull()?.let { Color(it.color) }
    val emoji = pending.firstOrNull { it.emoji.isNotBlank() }?.emoji

    Box(
        Modifier
            .fillMaxSize()
            .clip(CircleShape)
            .background(if (isSelected) MaterialTheme.colorScheme.primary else Color.Transparent)
            .then(
                if (!isSelected && ringColor != null) Modifier.border(2.dp, ringColor, CircleShape)
                else if (!isSelected && isToday) Modifier.border(1.dp, MaterialTheme.colorScheme.primary, CircleShape)
                else Modifier
            )
            .clickable(onClick = onClick),
        contentAlignment = Alignment.Center
    ) {
        if (emoji != null && !isSelected) {
            Text(emoji, style = MaterialTheme.typography.titleMedium)
        } else {
            Text(
                date.dayOfMonth.toString(),
                color = when {
                    isSelected -> MaterialTheme.colorScheme.onPrimary
                    ringColor != null -> ringColor
                    else -> MaterialTheme.colorScheme.onSurface
                },
                fontWeight = if (isToday || isSelected) FontWeight.Bold else FontWeight.Normal
            )
        }
    }
}
