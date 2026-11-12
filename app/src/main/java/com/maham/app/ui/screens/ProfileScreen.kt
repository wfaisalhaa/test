package com.maham.app.ui.screens

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
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
import androidx.compose.foundation.shape.RoundedCornerShape
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
import androidx.compose.material3.Switch
import androidx.compose.material3.SwitchDefaults
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
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.maham.app.R
import com.maham.app.data.AppSettings
import com.maham.app.data.Task
import com.maham.app.ui.components.GoldRule
import com.maham.app.ui.components.IconTile
import com.maham.app.ui.components.NgPanel
import com.maham.app.ui.components.taskColor
import com.maham.app.ui.theme.Gold
import com.maham.app.ui.theme.GoldWash
import com.maham.app.ui.theme.Navy
import com.maham.app.ui.theme.Navy3
import com.maham.app.ui.theme.NavyDeep
import com.maham.app.ui.theme.Ng
import com.maham.app.ui.theme.OnNavy
import com.maham.app.ui.theme.OnNavy2
import com.maham.app.ui.theme.OnNavyMuted
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
    val t = Ng.tokens
    val today = LocalDate.now()
    val completed = tasks.count { it.done }
    val pending = tasks.count { !it.done }

    val weekDays = (0..6).map { settings.firstDayOfWeek.plus(it.toLong()) }
    val startOfWeek = today.minusDays(((today.dayOfWeek.value - settings.firstDayOfWeek.value) + 7) % 7L)
    val perDay = weekDays.mapIndexed { i, _ ->
        val d = startOfWeek.plusDays(i.toLong())
        tasks.count { task ->
            task.completedAt?.let { Instant.ofEpochMilli(it).atZone(ZoneId.systemDefault()).toLocalDate() == d } ?: false
        }
    }

    val completedDays = tasks.mapNotNull { task ->
        task.completedAt?.let { Instant.ofEpochMilli(it).atZone(ZoneId.systemDefault()).toLocalDate() }
    }.toSet()
    var streak = 0
    var cursor = if (today in completedDays) today else today.minusDays(1)
    while (cursor in completedDays) { streak++; cursor = cursor.minusDays(1) }

    val next7 = tasks.filter { !it.done && it.dueDay != null && it.dueDay > today.toEpochDay() && it.dueDay <= today.plusDays(7).toEpochDay() }
        .sortedBy { it.dueDay }

    LazyColumn(
        modifier,
        contentPadding = PaddingValues(16.dp, 12.dp, 16.dp, 24.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        // Navy hero panel: the design's signature ground, with one gold number.
        item {
            Column(
                Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(16.dp))
                    .background(Navy)
                    .padding(18.dp)
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        Modifier.size(48.dp).clip(RoundedCornerShape(12.dp)).background(GoldWash),
                        contentAlignment = Alignment.Center
                    ) { Icon(Icons.Outlined.Person, null, tint = Gold, modifier = Modifier.size(26.dp)) }
                    Spacer(Modifier.width(12.dp))
                    Column {
                        Text(stringResource(R.string.stats_title), style = MaterialTheme.typography.headlineSmall, color = OnNavy)
                        Text(stringResource(R.string.stats_streak, streak.toString()), style = MaterialTheme.typography.bodyMedium, color = OnNavy2)
                    }
                }
                Spacer(Modifier.height(14.dp))
                Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                    NavyStat(completed.toString(), stringResource(R.string.stats_completed), Modifier.weight(1f))
                    NavyStat(pending.toString(), stringResource(R.string.stats_pending), Modifier.weight(1f))
                }
            }
        }

        item {
            NgPanel(padding = PaddingValues(0.dp)) {
                GoldRule()
                Column(Modifier.padding(16.dp)) {
                    Text(stringResource(R.string.stats_daily), style = MaterialTheme.typography.titleLarge)
                    Spacer(Modifier.height(12.dp))
                    BarChart(values = perDay, labels = weekDays.map { it.getDisplayName(TextStyle.NARROW, Locale.getDefault()) })
                }
            }
        }

        item {
            NgPanel {
                Text(stringResource(R.string.stats_next7), style = MaterialTheme.typography.titleLarge)
                Spacer(Modifier.height(8.dp))
                if (next7.isEmpty()) {
                    Text(stringResource(R.string.stats_none_next7), color = t.muted, style = MaterialTheme.typography.bodyMedium)
                }
                next7.take(6).forEach { task ->
                    Row(Modifier.padding(vertical = 6.dp), verticalAlignment = Alignment.CenterVertically) {
                        Icon(Icons.Outlined.Event, null, tint = taskColor(task.color), modifier = Modifier.size(18.dp))
                        Spacer(Modifier.width(10.dp))
                        Text(
                            listOf(task.emoji, task.title).filter { it.isNotBlank() }.joinToString(" "),
                            modifier = Modifier.weight(1f), style = MaterialTheme.typography.bodyMedium
                        )
                        val d = LocalDate.ofEpochDay(task.dueDay!!)
                        Text("${d.dayOfMonth}/${d.monthValue}", color = t.muted, style = MaterialTheme.typography.bodySmall)
                    }
                }
            }
        }

        item {
            Text(stringResource(R.string.settings), style = MaterialTheme.typography.headlineSmall)
            Spacer(Modifier.height(8.dp))
            NgPanel {
                var dayMenu by remember { mutableStateOf(false) }
                SettingRow(Icons.Outlined.CalendarMonth, stringResource(R.string.settings_first_day)) {
                    Box {
                        TextButton(onClick = { dayMenu = true }) {
                            Text(settings.firstDayOfWeek.getDisplayName(TextStyle.FULL, Locale.getDefault()), color = t.link)
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
                    NgSwitch(settings.notificationsEnabled, onNotifications)
                }
                SettingRow(Icons.Outlined.DarkMode, stringResource(R.string.settings_theme)) {
                    NgSwitch(settings.darkTheme, onDark)
                }
                SettingRow(Icons.Outlined.Info, stringResource(R.string.settings_about)) {
                    Text(stringResource(R.string.settings_version), color = t.muted, style = MaterialTheme.typography.bodySmall)
                }
            }
        }
    }
}

@Composable
private fun NgSwitch(checked: Boolean, onChange: (Boolean) -> Unit) {
    val t = Ng.tokens
    Switch(
        checked = checked, onCheckedChange = onChange,
        colors = SwitchDefaults.colors(
            checkedThumbColor = Navy, checkedTrackColor = Gold, checkedBorderColor = Gold,
            uncheckedThumbColor = t.muted, uncheckedTrackColor = t.neutralSoft, uncheckedBorderColor = t.lineStrong
        )
    )
}

@Composable
private fun NavyStat(value: String, label: String, modifier: Modifier = Modifier) {
    Column(
        modifier
            .clip(RoundedCornerShape(12.dp))
            .background(NavyDeep)
            .padding(vertical = 14.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(value, style = MaterialTheme.typography.displaySmall, color = Gold)
        Text(label, style = MaterialTheme.typography.bodySmall, color = OnNavyMuted, textAlign = TextAlign.Center)
    }
}

@Composable
private fun SettingRow(icon: ImageVector, title: String, trailing: @Composable () -> Unit) {
    Row(Modifier.fillMaxWidth().padding(vertical = 6.dp), verticalAlignment = Alignment.CenterVertically) {
        IconTile(icon, size = 36)
        Spacer(Modifier.width(12.dp))
        Text(title, modifier = Modifier.weight(1f), style = MaterialTheme.typography.bodyLarge)
        trailing()
    }
}

@Composable
private fun BarChart(values: List<Int>, labels: List<String>) {
    val t = Ng.tokens
    val max = (values.maxOrNull() ?: 0).coerceAtLeast(5)
    val bar = if (t.dark) com.maham.app.ui.theme.Gold2 else Navy3
    val peak = Gold
    val empty = t.neutralSoft
    Column {
        Canvas(Modifier.fillMaxWidth().height(140.dp)) {
            val n = values.size
            val slot = size.width / n
            val barW = slot * 0.5f
            val top = values.maxOrNull() ?: 0
            values.forEachIndexed { i, v ->
                val h = size.height * (v.toFloat() / max)
                val left = i * slot + (slot - barW) / 2
                drawRoundRect(
                    color = when { v == 0 -> empty; v == top -> peak; else -> bar },
                    topLeft = Offset(left, size.height - h.coerceAtLeast(4f)),
                    size = Size(barW, h.coerceAtLeast(4f)),
                    cornerRadius = CornerRadius(6f, 6f)
                )
            }
        }
        Row(Modifier.fillMaxWidth()) {
            labels.forEach {
                Text(it, modifier = Modifier.weight(1f), textAlign = TextAlign.Center,
                    style = MaterialTheme.typography.labelMedium, color = t.muted)
            }
        }
    }
}
