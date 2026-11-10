package com.maham.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.MoreVert
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExtendedFloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
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
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.unit.dp
import com.maham.app.R
import com.maham.app.data.CheckList
import com.maham.app.data.ListItem

private val LIST_ICONS = listOf("📝", "🎓", "🛒", "🎬", "📚", "✈️", "🏠", "💪", "🎁", "💡")
private val LIST_COLORS = listOf(
    0xFFE3ECFF.toInt(), 0xFFE6F4EA.toInt(), 0xFFFCEBDD.toInt(),
    0xFFF3E8FF.toInt(), 0xFFFFE4EC.toInt(), 0xFFFFF7D6.toInt()
)

@Composable
fun ListsScreen(
    modifier: Modifier = Modifier,
    lists: List<CheckList>,
    items: List<ListItem>,
    onAddList: (String, String, Int) -> Unit,
    onDeleteList: (CheckList) -> Unit,
    onRenameList: (CheckList, String) -> Unit,
    onAddItem: (Long, String) -> Unit,
    onToggleItem: (ListItem) -> Unit,
    onDeleteItem: (ListItem) -> Unit
) {
    var showNew by remember { mutableStateOf(false) }

    Box(modifier.fillMaxSize()) {
        if (lists.isEmpty()) {
            Text(
                stringResource(R.string.empty_lists),
                modifier = Modifier.align(Alignment.Center).padding(32.dp),
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                textAlign = TextAlign.Center,
                style = MaterialTheme.typography.bodyLarge
            )
        }
        LazyColumn(
            contentPadding = PaddingValues(start = 16.dp, end = 16.dp, top = 12.dp, bottom = 96.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            item {
                Text(stringResource(R.string.lists_title), style = MaterialTheme.typography.headlineMedium)
            }
            items(lists, key = { it.id }) { list ->
                ListCard(
                    list = list,
                    items = items.filter { it.listId == list.id },
                    onDelete = { onDeleteList(list) },
                    onRename = { onRenameList(list, it) },
                    onAddItem = { onAddItem(list.id, it) },
                    onToggleItem = onToggleItem,
                    onDeleteItem = onDeleteItem
                )
            }
        }
        ExtendedFloatingActionButton(
            onClick = { showNew = true },
            modifier = Modifier.align(Alignment.BottomEnd).padding(16.dp),
            containerColor = MaterialTheme.colorScheme.primary,
            contentColor = MaterialTheme.colorScheme.onPrimary,
            icon = { Icon(Icons.Default.Add, null) },
            text = { Text(stringResource(R.string.add_list)) }
        )
    }

    if (showNew) {
        NewListDialog(onDismiss = { showNew = false }) { name, icon, color ->
            onAddList(name, icon, color); showNew = false
        }
    }
}

@Composable
private fun ListCard(
    list: CheckList,
    items: List<ListItem>,
    onDelete: () -> Unit,
    onRename: (String) -> Unit,
    onAddItem: (String) -> Unit,
    onToggleItem: (ListItem) -> Unit,
    onDeleteItem: (ListItem) -> Unit
) {
    var menu by remember { mutableStateOf(false) }
    var renaming by remember { mutableStateOf(false) }
    var newItem by remember { mutableStateOf("") }

    Surface(
        shape = MaterialTheme.shapes.large,
        color = Color(list.color),
        shadowElevation = 2.dp,
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(Modifier.padding(16.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    Modifier.size(40.dp).clip(CircleShape).background(MaterialTheme.colorScheme.surface),
                    contentAlignment = Alignment.Center
                ) { Text(list.icon, style = MaterialTheme.typography.titleMedium) }
                Spacer(Modifier.width(12.dp))
                Column(Modifier.weight(1f)) {
                    Text(list.name, style = MaterialTheme.typography.titleMedium, color = Color(0xFF1F2937))
                    val done = items.count { it.done }
                    if (items.isNotEmpty()) Text(
                        "$done / ${items.size}",
                        style = MaterialTheme.typography.bodySmall,
                        color = Color(0xFF6B7280)
                    )
                }
                Box {
                    IconButton(onClick = { menu = true }) { Icon(Icons.Default.MoreVert, null, tint = Color(0xFF6B7280)) }
                    DropdownMenu(expanded = menu, onDismissRequest = { menu = false }) {
                        DropdownMenuItem(text = { Text(stringResource(R.string.rename)) },
                            onClick = { menu = false; renaming = true })
                        DropdownMenuItem(text = { Text(stringResource(R.string.delete), color = MaterialTheme.colorScheme.error) },
                            onClick = { menu = false; onDelete() })
                    }
                }
            }

            Spacer(Modifier.height(8.dp))
            items.forEach { item ->
                Row(
                    Modifier.fillMaxWidth().clickable { onToggleItem(item) }.padding(vertical = 6.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        Modifier
                            .size(22.dp)
                            .clip(CircleShape)
                            .background(if (item.done) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.surface),
                        contentAlignment = Alignment.Center
                    ) {
                        if (item.done) Icon(Icons.Default.Check, null, Modifier.size(14.dp), tint = Color.White)
                    }
                    Spacer(Modifier.width(12.dp))
                    Text(
                        item.text,
                        modifier = Modifier.weight(1f),
                        textDecoration = if (item.done) TextDecoration.LineThrough else null,
                        color = if (item.done) Color(0xFF9CA3AF) else Color(0xFF1F2937)
                    )
                    IconButton(onClick = { onDeleteItem(item) }, modifier = Modifier.size(28.dp)) {
                        Icon(Icons.Default.Close, null, Modifier.size(16.dp), tint = Color(0xFF9CA3AF))
                    }
                }
            }

            OutlinedTextField(
                value = newItem,
                onValueChange = { newItem = it },
                placeholder = { Text(stringResource(R.string.list_item_hint)) },
                singleLine = true,
                modifier = Modifier.fillMaxWidth().padding(top = 6.dp),
                shape = MaterialTheme.shapes.medium,
                keyboardOptions = KeyboardOptions(imeAction = ImeAction.Done),
                keyboardActions = KeyboardActions(onDone = {
                    if (newItem.isNotBlank()) { onAddItem(newItem.trim()); newItem = "" }
                }),
                trailingIcon = {
                    IconButton(onClick = { if (newItem.isNotBlank()) { onAddItem(newItem.trim()); newItem = "" } }) {
                        Icon(Icons.Default.Add, null)
                    }
                }
            )
        }
    }

    if (renaming) {
        var name by remember { mutableStateOf(list.name) }
        AlertDialog(
            onDismissRequest = { renaming = false },
            confirmButton = { TextButton(onClick = { if (name.isNotBlank()) onRename(name.trim()); renaming = false }) { Text(stringResource(R.string.save)) } },
            dismissButton = { TextButton(onClick = { renaming = false }) { Text(stringResource(R.string.cancel)) } },
            text = { OutlinedTextField(value = name, onValueChange = { name = it }, singleLine = true) }
        )
    }
}

@Composable
private fun NewListDialog(onDismiss: () -> Unit, onCreate: (String, String, Int) -> Unit) {
    var name by remember { mutableStateOf("") }
    var icon by remember { mutableStateOf(LIST_ICONS[0]) }
    var color by remember { mutableStateOf(LIST_COLORS[0]) }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text(stringResource(R.string.add_list)) },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                OutlinedTextField(
                    value = name, onValueChange = { name = it }, singleLine = true,
                    placeholder = { Text(stringResource(R.string.list_name_hint)) },
                    modifier = Modifier.fillMaxWidth()
                )
                Text(stringResource(R.string.list_icon), style = MaterialTheme.typography.labelLarge)
                Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                    LIST_ICONS.take(5).forEach { IconChoice(it, icon == it) { icon = it } }
                }
                Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                    LIST_ICONS.drop(5).forEach { IconChoice(it, icon == it) { icon = it } }
                }
                Text(stringResource(R.string.task_color), style = MaterialTheme.typography.labelLarge)
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    LIST_COLORS.forEach { c ->
                        Box(
                            Modifier.size(30.dp).clip(CircleShape).background(Color(c)).clickable { color = c },
                            contentAlignment = Alignment.Center
                        ) { if (color == c) Icon(Icons.Default.Check, null, Modifier.size(16.dp), tint = Color(0xFF1F2937)) }
                    }
                }
            }
        },
        confirmButton = {
            Button(onClick = { if (name.isNotBlank()) onCreate(name.trim(), icon, color) }, enabled = name.isNotBlank()) {
                Text(stringResource(R.string.save))
            }
        },
        dismissButton = { TextButton(onClick = onDismiss) { Text(stringResource(R.string.cancel)) } }
    )
}

@Composable
private fun IconChoice(e: String, selected: Boolean, onClick: () -> Unit) {
    Box(
        Modifier
            .size(40.dp)
            .clip(CircleShape)
            .background(if (selected) MaterialTheme.colorScheme.primaryContainer else MaterialTheme.colorScheme.surfaceVariant)
            .clickable(onClick = onClick),
        contentAlignment = Alignment.Center
    ) { Text(e) }
}
