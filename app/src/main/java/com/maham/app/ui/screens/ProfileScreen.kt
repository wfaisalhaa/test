package com.maham.app.ui.screens

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.CalendarMonth
import androidx.compose.material.icons.outlined.DarkMode
import androidx.compose.material.icons.outlined.Event
import androidx.compose.material.icons.outlined.Info
import androidx.compose.material.icons.outlined.NotificationsActive
import androidx.compose.material.icons.outlined.Person
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.maham.app.R
import com.maham.app.data.AppSettings
import com.maham.app.data.Task
import java.time.DayOfWeek
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneId
import java.time.format.TextStyle
import java.util.Locale

@Composable
fun ProfileScreen(
    modifier: Modifier = Modifier,
    tasks: List<Task>,
    settings: AppSettings,
    onFirstDay: (DayOfWeek) -> Unit,
    onNotifications: (Boolean) -> Unit,
    onDark: (Boolean) -> Unit
) {
    val today = LocalDate.now()
    val completed = tasks.count { it.done }
    val pending = tasks.count { !it.done }

    // Completed per day for the current week
    val weekDays = (0..6).map { settings.firstDayOfWeek.plus(it.toLong()) }
    val startOfWeek = today.minusDays(((today.dayOfWeek.value - settings.firstDayOfWeek.value) + 7) % 7L)
    val perDay = weekDays.mapIndexed { i, _ ->
        val d = startOfWeek.plusDays(i.toLong())
        tasks.count { t ->
            t.completedAt?.let { Instant.ofEpochMilli(it).atZone(ZoneId.systemDefault()).toLocalDate() == d } ?: false
        }
    }

    // Streak: consecutive days (ending today or yesterday) with at least one completion
    val completedDays = tasks.mapNotNull { t ->
        t.completedAt?.let { Instant.ofEpochMilli(it).atZone(ZoneId.systemDefault()).toLocalDate() }
    }.toSet()
    var streak = 0
    var cursor = if (today in completedDays) today else today.minusDays(1)
    while (cursor in completedDays) { streak++; cursor = cursor.minusDays(1) }

    val next7 = tasks.filter { !it.done && it.dueDay != null && it.dueDay > today.toEpochDay() && it.dueDay <= today.plusDays(7).toEpochDay() }
        .sortedBy { it.dueDay }

    LazyColumn(
        modifier,
        contentPadding = PaddingValues(16.dp, 12.dp, 16.dp, 96.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        item {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    Modifier.size(56.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Surface(shape = CircleShape, color = MaterialTheme.colorScheme.primaryContainer, modifier = Modifier.size(56.dp)) {}
                    Icon(Icons.Outlined.Person, null, tint = MaterialTheme.colorScheme.primary, modifier = Modifier.size(30.dp))
                }
                Spacer(Modifier.width(12.dp))
                Column {
                    Text(stringResource(R.string.stats_title), style = MaterialTheme.typography.titleLarge)
                    Text(stringResource(R.string.stats_streak, streak), color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
        }

        item {
            Text(stringResource(R.string.stats_overview), style = MaterialTheme.typography.titleMedium)
            Spacer(Modifier.height(8.dp))
            Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                StatTile(completed.toString(), stringResource(R.string.stats_completed), Modifier.weight(1f))
                StatTile(pending.toString(), stringResource(R.string.stats_pending), Modifier.weight(1f))
            }
        }

        item {
            Card {
                Text(stringResource(R.string.stats_daily), style = MaterialTheme.typography.titleMedium)
                Spacer(Modifier.height(12.dp))
                BarChart(values = perDay, labels = weekDays.map { it.getDisplayName(TextStyle.NARROW, Locale.getDefault()) })
            }
        }

        item {
            Card {
                Text(stringResource(R.string.stats_next7), style = MaterialTheme.typography.titleMedium)
                Spacer(Modifier.height(8.dp))
                if (next7.isEmpty()) {
                    Text(stringResource(R.string.stats_none_next7), color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
                next7.take(6).forEach { t ->
                    Row(Modifier.padding(vertical = 6.dp), verticalAlignment = Alignment.CenterVertically) {
                        Icon(Icons.Outlined.Event, null, tint = Color(t.color), modifier = Modifier.size(18.dp))
                        Spacer(Modifier.width(10.dp))
                        Text(listOf(t.emoji, t.title).filter { it.isNotBlank() }.joinToString(" "), modifier = Modifier.weight(1f))
                        val d = LocalDate.ofEpochDay(t.dueDay!!)
                        Text("${d.dayOfMonth}/${d.monthValue}", color = MaterialTheme.colorScheme.onSurfaceVariant, style = MaterialTheme.typography.bodySmall)
                    }
                }
            }
        }

        item {
            Text(stringResource(R.string.settings), style = MaterialTheme.typography.titleMedium)
            Spacer(Modifier.height(8.dp))
            Card {
                var dayMenu by remember { mutableStateOf(false) }
                SettingRow(Icons.Outlined.CalendarMonth, stringResource(R.string.settings_first_day)) {
                    Box {
                        TextButton(onClick = { dayMenu = true }) {
                            Text(settings.firstDayOfWeek.getDisplayName(TextStyle.FULL, Locale.getDefault()))
                        }
                        DropdownMenu(expanded = dayMenu, onDismissRequest = { dayMenu = false }) {
                            listOf(DayOfWeek.SATURDAY, DayOfWeek.SUNDAY, DayOfWeek.MONDAY).forEach { d ->
                                DropdownMenuItem(
                                    text = { Text(d.getDisplayName(TextStyle.FULL, Locale.getDefault())) },
                                    onClick = { onFirstDay(d); dayMenu = false }
                                )
                            }
                        }
                    }
                }
                SettingRow(Icons.Outlined.NotificationsActive, stringResource(R.string.settings_notifications)) {
                    Switch(checked = settings.notificationsEnabled, onCheckedChange = onNotifications)
                }
                SettingRow(Icons.Outlined.DarkMode, stringResource(R.string.settings_theme)) {
                    Switch(checked = settings.darkTheme, onCheckedChange = onDark)
                }
                SettingRow(Icons.Outlined.Info, stringResource(R.string.settings_about)) {
                    Text(stringResource(R.string.settings_version), color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
        }
    }
}

@Composable
private fun Card(content: @Composable () -> Unit) {
    Surface(
        shape = MaterialTheme.shapes.large,
        color = MaterialTheme.colorScheme.surface,
        shadowElevation = 2.dp,
        modifier = Modifier.fillMaxWidth()
    ) { Column(Modifier.padding(16.dp)) { content() } }
}

@Composable
private fun StatTile(value: String, label: String, modifier: Modifier = Modifier) {
    Surface(shape = MaterialTheme.shapes.large, color = MaterialTheme.colorScheme.surface, shadowElevation = 2.dp, modifier = modifier) {
        Column(Modifier.padding(vertical = 20.dp), horizontalAlignment = Alignment.CenterHorizontally) {
            Text(value, style = MaterialTheme.typography.headlineMedium, color = MaterialTheme.colorScheme.onSurface)
            Text(label, color = MaterialTheme.colorScheme.onSurfaceVariant, textAlign = TextAlign.Center)
        }
    }
}

@Composable
private fun SettingRow(icon: androidx.compose.ui.graphics.vector.ImageVector, title: String, trailing: @Composable () -> Unit) {
    Row(Modifier.fillMaxWidth().padding(vertical = 8.dp), verticalAlignment = Alignment.CenterVertically) {
        Icon(icon, null, tint = MaterialTheme.colorScheme.primary)
        Spacer(Modifier.width(12.dp))
        Text(title, modifier = Modifier.weight(1f))
        trailing()
    }
}

@Composable
private fun BarChart(values: List<Int>, labels: List<String>) {
    val max = (values.maxOrNull() ?: 0).coerceAtLeast(5)
    val primary = MaterialTheme.colorScheme.primary
    val soft = MaterialTheme.colorScheme.primaryContainer
    Column {
        Canvas(Modifier.fillMaxWidth().height(140.dp)) {
            val n = values.size
            val slot = size.width / n
            val barW = slot * 0.55f
            values.forEachIndexed { i, v ->
                val h = size.height * (v.toFloat() / max)
                val left = i * slot + (slot - barW) / 2
                drawRoundRect(
                    color = if (v == 0) soft else primary.copy(alpha = 0.55f + 0.45f * (v.toFloat() / max)),
                    topLeft = Offset(left, size.height - h.coerceAtLeast(4f)),
                    size = Size(barW, h.coerceAtLeast(4f)),
                    cornerRadius = CornerRadius(6f, 6f)
                )
            }
        }
        Row(Modifier.fillMaxWidth()) {
            labels.forEach {
                Text(it, modifier = Modifier.weight(1f), textAlign = TextAlign.Center,
                    style = MaterialTheme.typography.labelMedium, color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
        }
    }
}
