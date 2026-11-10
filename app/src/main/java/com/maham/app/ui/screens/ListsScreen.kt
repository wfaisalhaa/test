package com.maham.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
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
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.MoreVert
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExtendedFloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
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
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.unit.dp
import com.maham.app.R
import com.maham.app.data.CheckList
import com.maham.app.data.ListColors
import com.maham.app.data.ListItem
import com.maham.app.ui.components.ListIcons
import com.maham.app.ui.components.NgPanel
import com.maham.app.ui.components.listIcon
import com.maham.app.ui.components.listTint
import com.maham.app.ui.theme.Gold
import com.maham.app.ui.theme.Navy
import com.maham.app.ui.theme.Ng

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
                color = Ng.tokens.muted,
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
            containerColor = Gold,
            contentColor = Navy,
            shape = MaterialTheme.shapes.small,
            elevation = androidx.compose.material3.FloatingActionButtonDefaults.elevation(0.dp, 0.dp, 0.dp, 0.dp),
            icon = { Icon(Icons.Default.Add, null) },
            text = { Text(stringResource(R.string.add_list), style = MaterialTheme.typography.titleSmall) }
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
    val t = Ng.tokens
    val tint = listTint(list.color)
    var menu by remember { mutableStateOf(false) }
    var renaming by remember { mutableStateOf(false) }
    var newItem by remember { mutableStateOf("") }

    NgPanel(color = tint.bg, border = tint.line) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Box(
                Modifier
                    .size(44.dp)
                    .clip(RoundedCornerShape(12.dp))
                    .background(t.panel)
                    .border(1.dp, tint.line, RoundedCornerShape(12.dp)),
                contentAlignment = Alignment.Center
            ) { Icon(listIcon(list.icon), null, tint = tint.ink, modifier = Modifier.size(22.dp)) }
            Spacer(Modifier.width(12.dp))
            Column(Modifier.weight(1f)) {
                Text(list.name, style = MaterialTheme.typography.titleLarge, color = t.ink)
                val done = items.count { it.done }
                if (items.isNotEmpty()) Text(
                    "$done / ${items.size}",
                    style = MaterialTheme.typography.bodySmall,
                    color = t.muted
                )
            }
            Box {
                IconButton(onClick = { menu = true }) { Icon(Icons.Default.MoreVert, null, tint = t.muted) }
                DropdownMenu(expanded = menu, onDismissRequest = { menu = false }) {
                    DropdownMenuItem(text = { Text(stringResource(R.string.rename)) },
                        onClick = { menu = false; renaming = true })
                    DropdownMenuItem(text = { Text(stringResource(R.string.delete), color = t.dangerInk) },
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
                        .background(if (item.done) t.selected else t.panel)
                        .border(1.5.dp, if (item.done) t.selected else t.lineStrong, CircleShape),
                    contentAlignment = Alignment.Center
                ) {
                    if (item.done) Icon(Icons.Default.Check, null, Modifier.size(14.dp), tint = t.onSelected)
                }
                Spacer(Modifier.width(12.dp))
                Text(
                    item.text,
                    modifier = Modifier.weight(1f),
                    style = MaterialTheme.typography.bodyLarge,
                    textDecoration = if (item.done) TextDecoration.LineThrough else null,
                    color = if (item.done) t.muted else t.ink
                )
                IconButton(onClick = { onDeleteItem(item) }, modifier = Modifier.size(28.dp)) {
                    Icon(Icons.Default.Close, null, Modifier.size(16.dp), tint = t.muted)
                }
            }
        }

        OutlinedTextField(
            value = newItem,
            onValueChange = { newItem = it },
            placeholder = { Text(stringResource(R.string.list_item_hint)) },
            singleLine = true,
            modifier = Modifier.fillMaxWidth().padding(top = 6.dp),
            shape = MaterialTheme.shapes.small,
            keyboardOptions = KeyboardOptions(imeAction = ImeAction.Done),
            keyboardActions = KeyboardActions(onDone = {
                if (newItem.isNotBlank()) { onAddItem(newItem.trim()); newItem = "" }
            }),
            trailingIcon = {
                IconButton(onClick = { if (newItem.isNotBlank()) { onAddItem(newItem.trim()); newItem = "" } }) {
                    Icon(Icons.Default.Add, null, tint = t.link)
                }
            }
        )
    }

    if (renaming) {
        var name by remember { mutableStateOf(list.name) }
        AlertDialog(
            onDismissRequest = { renaming = false },
            containerColor = t.panel,
            confirmButton = { TextButton(onClick = { if (name.isNotBlank()) onRename(name.trim()); renaming = false }) { Text(stringResource(R.string.save)) } },
            dismissButton = { TextButton(onClick = { renaming = false }) { Text(stringResource(R.string.cancel)) } },
            text = { OutlinedTextField(value = name, onValueChange = { name = it }, singleLine = true, shape = MaterialTheme.shapes.small) }
        )
    }
}

@Composable
private fun NewListDialog(onDismiss: () -> Unit, onCreate: (String, String, Int) -> Unit) {
    val t = Ng.tokens
    var name by remember { mutableStateOf("") }
    var icon by remember { mutableStateOf(ListIcons[0].first) }
    var color by remember { mutableStateOf(ListColors.palette[0]) }

    AlertDialog(
        onDismissRequest = onDismiss,
        containerColor = t.panel,
        title = { Text(stringResource(R.string.add_list), style = MaterialTheme.typography.headlineSmall) },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                OutlinedTextField(
                    value = name, onValueChange = { name = it }, singleLine = true,
                    placeholder = { Text(stringResource(R.string.list_name_hint)) },
                    modifier = Modifier.fillMaxWidth(),
                    shape = MaterialTheme.shapes.small
                )
                Text(stringResource(R.string.list_icon), style = MaterialTheme.typography.labelMedium, color = t.muted)
                Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                    ListIcons.take(5).forEach { (k, v) -> IconChoice(v, icon == k) { icon = k } }
                }
                Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                    ListIcons.drop(5).forEach { (k, v) -> IconChoice(v, icon == k) { icon = k } }
                }
                Text(stringResource(R.string.task_color), style = MaterialTheme.typography.labelMedium, color = t.muted)
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    ListColors.palette.forEach { c ->
                        val tint = listTint(c)
                        Box(
                            Modifier
                                .size(30.dp)
                                .clip(CircleShape)
                                .background(tint.bg)
                                .border(if (color == c) 2.dp else 1.dp, if (color == c) t.ink else tint.line, CircleShape)
                                .clickable { color = c },
                            contentAlignment = Alignment.Center
                        ) { if (color == c) Icon(Icons.Default.Check, null, Modifier.size(16.dp), tint = tint.ink) }
                    }
                }
            }
        },
        confirmButton = {
            Button(
                onClick = { if (name.isNotBlank()) onCreate(name.trim(), icon, color) },
                enabled = name.isNotBlank(),
                shape = MaterialTheme.shapes.small,
                colors = ButtonDefaults.buttonColors(containerColor = Gold, contentColor = Navy)
            ) { Text(stringResource(R.string.save)) }
        },
        dismissButton = { TextButton(onClick = onDismiss) { Text(stringResource(R.string.cancel)) } }
    )
}

@Composable
private fun IconChoice(icon: ImageVector, selected: Boolean, onClick: () -> Unit) {
    val t = Ng.tokens
    Box(
        Modifier
            .size(40.dp)
            .clip(RoundedCornerShape(12.dp))
            .background(if (selected) t.goldSoft else t.neutralSoft)
            .border(1.dp, if (selected) t.goldLine else t.line, RoundedCornerShape(12.dp))
            .clickable(onClick = onClick),
        contentAlignment = Alignment.Center
    ) { Icon(icon, null, tint = if (selected) t.goldInk else t.muted, modifier = Modifier.size(20.dp)) }
}
