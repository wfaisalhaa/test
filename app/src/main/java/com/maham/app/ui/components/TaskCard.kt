package com.maham.app.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Star
import androidx.compose.material.icons.outlined.Notes
import androidx.compose.material.icons.outlined.NotificationsNone
import androidx.compose.material.icons.outlined.StarBorder
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import com.maham.app.data.Task
import com.maham.app.ui.theme.Ng
import java.util.Locale

fun Task.timeLabel(): String? = dueMinute?.let { String.format(Locale.US, "%02d:%02d", it / 60, it % 60) }

@Composable
fun TaskCard(
    task: Task,
    onToggle: (Boolean) -> Unit,
    onStar: () -> Unit,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    val t = Ng.tokens
    val accent = taskColor(task.color)

    NgPanel(
        modifier = modifier,
        onClick = onClick,
        border = if (task.important && !task.done) accent else t.line,
        padding = PaddingValues(start = 14.dp, end = 6.dp, top = 12.dp, bottom = 12.dp)
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                Text(
                    text = listOf(task.emoji, task.title).filter { it.isNotBlank() }.joinToString(" "),
                    style = MaterialTheme.typography.bodyLarge,
                    fontWeight = FontWeight.Medium,
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis,
                    textDecoration = if (task.done) TextDecoration.LineThrough else null,
                    color = if (task.done) t.muted else t.ink
                )
                Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    Box(Modifier.size(8.dp).clip(CircleShape).background(accent))
                    task.timeLabel()?.let {
                        Text(it, style = MaterialTheme.typography.bodySmall, color = t.muted)
                    }
                    if (task.reminder) MetaIcon(Icons.Outlined.NotificationsNone)
                    if (task.note.isNotBlank()) MetaIcon(Icons.Outlined.Notes)
                }
            }
            IconButton(onClick = onStar) {
                Icon(
                    if (task.important) Icons.Filled.Star else Icons.Outlined.StarBorder,
                    contentDescription = null,
                    tint = if (task.important) t.goldInk else t.lineStrong
                )
            }
            CheckCircle(checked = task.done, onCheckedChange = onToggle)
            Spacer(Modifier.width(8.dp))
        }
    }
}

@Composable
private fun MetaIcon(icon: androidx.compose.ui.graphics.vector.ImageVector) {
    Icon(icon, null, Modifier.size(16.dp), tint = Ng.tokens.muted)
}
