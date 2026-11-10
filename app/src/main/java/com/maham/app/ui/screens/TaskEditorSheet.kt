package com.maham.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.outlined.AccessTime
import androidx.compose.material.icons.outlined.CalendarToday
import androidx.compose.material.icons.outlined.Delete
import androidx.compose.material3.AssistChip
import androidx.compose.material3.Button
import androidx.compose.material3.DatePicker
import androidx.compose.material3.DatePickerDialog
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilterChip
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TimePicker
import androidx.compose.material3.rememberDatePickerState
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.material3.rememberTimePickerState
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
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Dialog
import com.maham.app.R
import com.maham.app.data.Category
import com.maham.app.data.Task
import com.maham.app.data.TaskColors
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneOffset
import java.time.format.DateTimeFormatter
import java.time.format.FormatStyle
import java.util.Locale

private val EMOJIS = listOf("", "🎂", "🏫", "✍️", "🎵", "🎬", "🛒", "💼", "🏃", "💧", "📚", "📞", "✈️", "🍽️", "💊", "🧹")

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TaskEditorSheet(
    task: Task?,
    onDismiss: () -> Unit,
    onSave: (Task) -> Unit,
    onDelete: (Task) -> Unit
) {
    val sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true)

    var title by remember { mutableStateOf(task?.title ?: "") }
    var note by remember { mutableStateOf(task?.note ?: "") }
    var emoji by remember { mutableStateOf(task?.emoji ?: "") }
    var category by remember { mutableStateOf(task?.category ?: Category.PERSONAL) }
    var dueDay by remember { mutableStateOf(task?.dueDay ?: LocalDate.now().toEpochDay()) }
    var hasDate by remember { mutableStateOf(task == null || task.dueDay != null) }
    var dueMinute by remember { mutableStateOf(task?.dueMinute) }
    var reminder by remember { mutableStateOf(task?.reminder ?: false) }
    var important by remember { mutableStateOf(task?.important ?: false) }
    var color by remember { mutableStateOf(task?.color ?: TaskColors.palette[0]) }

    var showDate by remember { mutableStateOf(false) }
    var showTime by remember { mutableStateOf(false) }

    ModalBottomSheet(onDismissRequest = onDismiss, sheetState = sheetState) {
        Column(
            Modifier
                .verticalScroll(rememberScrollState())
                .padding(horizontal = 20.dp)
                .navigationBarsPadding()
                .padding(bottom = 24.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text(
                    stringResource(if (task == null) R.string.add_task else R.string.edit_task),
                    style = MaterialTheme.typography.titleLarge,
                    modifier = Modifier.weight(1f)
                )
                if (task != null) {
                    IconButton(onClick = { onDelete(task) }) {
                        Icon(Icons.Outlined.Delete, stringResource(R.string.delete), tint = MaterialTheme.colorScheme.error)
                    }
                }
            }

            val leading: (@Composable () -> Unit)? =
                if (emoji.isNotBlank()) { { Text(emoji) } } else null
            OutlinedTextField(
                value = title, onValueChange = { title = it },
                placeholder = { Text(stringResource(R.string.task_title_hint)) },
                modifier = Modifier.fillMaxWidth(), singleLine = true,
                shape = MaterialTheme.shapes.medium,
                leadingIcon = leading
            )
            OutlinedTextField(
                value = note, onValueChange = { note = it },
                placeholder = { Text(stringResource(R.string.task_note_hint)) },
                modifier = Modifier.fillMaxWidth(), minLines = 2,
                shape = MaterialTheme.shapes.medium
            )

            // Emoji picker
            Label(R.string.task_emoji)
            Row(
                Modifier.fillMaxWidth().horizontalScroll(rememberScrollState()),
                horizontalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                EMOJIS.forEach { e ->
                    Box(
                        Modifier
                            .size(40.dp)
                            .clip(CircleShape)
                            .background(if (emoji == e) MaterialTheme.colorScheme.primaryContainer else MaterialTheme.colorScheme.surfaceVariant)
                            .clickable { emoji = e },
                        contentAlignment = Alignment.Center
                    ) { Text(if (e.isEmpty()) "–" else e) }
                }
            }

            // Date & time
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                AssistChip(
                    onClick = { showDate = true },
                    label = {
                        Text(
                            if (hasDate) LocalDate.ofEpochDay(dueDay).format(DateTimeFormatter.ofLocalizedDate(FormatStyle.MEDIUM))
                            else stringResource(R.string.no_date)
                        )
                    },
                    leadingIcon = { Icon(Icons.Outlined.CalendarToday, null, Modifier.size(18.dp)) }
                )
                AssistChip(
                    onClick = { showTime = true },
                    enabled = hasDate,
                    label = {
                        Text(dueMinute?.let { String.format(Locale.US, "%02d:%02d", it / 60, it % 60) }
                            ?: stringResource(R.string.no_time))
                    },
                    leadingIcon = { Icon(Icons.Outlined.AccessTime, null, Modifier.size(18.dp)) }
                )
            }

            // Category
            Label(R.string.task_category)
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                CategoryChip(R.string.filter_personal, category == Category.PERSONAL) { category = Category.PERSONAL }
                CategoryChip(R.string.filter_work, category == Category.WORK) { category = Category.WORK }
                CategoryChip(R.string.filter_list, category == Category.LIST) { category = Category.LIST }
            }

            // Color
            Label(R.string.task_color)
            Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                TaskColors.palette.forEach { c ->
                    Box(
                        Modifier
                            .size(32.dp)
                            .clip(CircleShape)
                            .background(Color(c))
                            .border(
                                width = if (color == c) 3.dp else 0.dp,
                                color = if (color == c) MaterialTheme.colorScheme.onSurface else Color.Transparent,
                                shape = CircleShape
                            )
                            .clickable { color = c },
                        contentAlignment = Alignment.Center
                    ) {
                        if (color == c) Icon(Icons.Default.Check, null, tint = Color.White, modifier = Modifier.size(16.dp))
                    }
                }
            }

            ToggleRow(R.string.task_reminder, reminder, enabled = hasDate && dueMinute != null) { reminder = it }
            ToggleRow(R.string.task_important, important) { important = it }

            Spacer(Modifier.height(4.dp))
            Button(
                onClick = {
                    if (title.isBlank()) return@Button
                    onSave(
                        (task ?: Task(title = "")).copy(
                            title = title.trim(),
                            note = note.trim(),
                            emoji = emoji,
                            category = category,
                            dueDay = if (hasDate) dueDay else null,
                            dueMinute = if (hasDate) dueMinute else null,
                            reminder = reminder && hasDate && dueMinute != null,
                            important = important,
                            color = color
                        )
                    )
                },
                enabled = title.isNotBlank(),
                modifier = Modifier.fillMaxWidth().height(52.dp),
                shape = MaterialTheme.shapes.medium
            ) { Text(stringResource(R.string.save), style = MaterialTheme.typography.titleMedium) }
        }
    }

    if (showDate) {
        val state = rememberDatePickerState(
            initialSelectedDateMillis = LocalDate.ofEpochDay(dueDay).atStartOfDay().toInstant(ZoneOffset.UTC).toEpochMilli()
        )
        DatePickerDialog(
            onDismissRequest = { showDate = false },
            confirmButton = {
                TextButton(onClick = {
                    state.selectedDateMillis?.let {
                        dueDay = Instant.ofEpochMilli(it).atZone(ZoneOffset.UTC).toLocalDate().toEpochDay()
                        hasDate = true
                    }
                    showDate = false
                }) { Text(stringResource(R.string.save)) }
            },
            dismissButton = {
                TextButton(onClick = { hasDate = false; dueMinute = null; reminder = false; showDate = false }) {
                    Text(stringResource(R.string.no_date))
                }
            }
        ) { DatePicker(state = state) }
    }

    if (showTime) {
        val state = rememberTimePickerState(
            initialHour = (dueMinute ?: 540) / 60,
            initialMinute = (dueMinute ?: 540) % 60,
            is24Hour = true
        )
        Dialog(onDismissRequest = { showTime = false }) {
            Column(
                Modifier
                    .clip(MaterialTheme.shapes.extraLarge)
                    .background(MaterialTheme.colorScheme.surface)
                    .padding(20.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                TimePicker(state = state)
                Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.End) {
                    TextButton(onClick = { dueMinute = null; reminder = false; showTime = false }) {
                        Text(stringResource(R.string.no_time))
                    }
                    Spacer(Modifier.width(8.dp))
                    TextButton(onClick = { dueMinute = state.hour * 60 + state.minute; showTime = false }) {
                        Text(stringResource(R.string.save))
                    }
                }
            }
        }
    }
}

@Composable
private fun Label(res: Int) {
    Text(stringResource(res), style = MaterialTheme.typography.labelLarge, color = MaterialTheme.colorScheme.onSurfaceVariant)
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun CategoryChip(res: Int, selected: Boolean, onClick: () -> Unit) {
    FilterChip(selected = selected, onClick = onClick, label = { Text(stringResource(res)) }, shape = MaterialTheme.shapes.large)
}

@Composable
private fun ToggleRow(res: Int, checked: Boolean, enabled: Boolean = true, onChange: (Boolean) -> Unit) {
    Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
        Text(
            stringResource(res), modifier = Modifier.weight(1f),
            color = if (enabled) MaterialTheme.colorScheme.onSurface else MaterialTheme.colorScheme.outline
        )
        Switch(checked = checked && enabled, onCheckedChange = onChange, enabled = enabled)
    }
}
