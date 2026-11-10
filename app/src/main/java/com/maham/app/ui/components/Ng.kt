package com.maham.app.ui.components

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.outlined.AutoStories
import androidx.compose.material.icons.outlined.CardGiftcard
import androidx.compose.material.icons.outlined.FitnessCenter
import androidx.compose.material.icons.outlined.Flight
import androidx.compose.material.icons.outlined.FormatListBulleted
import androidx.compose.material.icons.outlined.Home
import androidx.compose.material.icons.outlined.Lightbulb
import androidx.compose.material.icons.outlined.Movie
import androidx.compose.material.icons.outlined.School
import androidx.compose.material.icons.outlined.ShoppingCart
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.dp
import com.maham.app.data.TaskColors
import com.maham.app.ui.theme.Gold
import com.maham.app.ui.theme.Gold2
import com.maham.app.ui.theme.Live
import com.maham.app.ui.theme.LiveDot
import com.maham.app.ui.theme.Navy3
import com.maham.app.ui.theme.Ng
import com.maham.app.ui.theme.PillShape

/** Resolve a task color index to the theme's state color. */
@Composable
fun taskColor(index: Int): Color {
    val t = Ng.tokens
    val dark = t.dark
    return when (index) {
        TaskColors.GOLD -> if (dark) Gold2 else Gold
        TaskColors.LIVE -> if (dark) LiveDot else Live
        TaskColors.TINT -> t.tintInk
        TaskColors.DANGER -> t.dangerInk
        else -> if (dark) t.ink2 else Navy3
    }
}

data class Tint(val bg: Color, val line: Color, val ink: Color)

/** Resolve a checklist tint index to (background, border, accent) for the current theme. */
@Composable
fun listTint(index: Int): Tint {
    val t = Ng.tokens
    return when (index) {
        1 -> Tint(t.goldSoft, t.goldLine, t.goldInk)
        2 -> Tint(t.liveSoft, t.liveLine, t.liveInk)
        3 -> Tint(t.tint, t.tintLine, t.tintInk)
        4 -> Tint(t.neutralSoft, t.lineStrong, t.ink2)
        5 -> Tint(t.dangerSoft, t.dangerLine, t.dangerInk)
        else -> Tint(t.panel, t.line, t.link)
    }
}

/** Line icons for checklists, keyed by a stable string stored in the DB. */
val ListIcons: List<Pair<String, ImageVector>> = listOf(
    "list" to Icons.Outlined.FormatListBulleted,
    "school" to Icons.Outlined.School,
    "cart" to Icons.Outlined.ShoppingCart,
    "movie" to Icons.Outlined.Movie,
    "book" to Icons.Outlined.AutoStories,
    "flight" to Icons.Outlined.Flight,
    "home" to Icons.Outlined.Home,
    "fitness" to Icons.Outlined.FitnessCenter,
    "gift" to Icons.Outlined.CardGiftcard,
    "idea" to Icons.Outlined.Lightbulb,
)

fun listIcon(key: String): ImageVector =
    ListIcons.firstOrNull { it.first == key }?.second ?: Icons.Outlined.FormatListBulleted

/** Panel: white surface, 1px line border, no shadow. */
@Composable
fun NgPanel(
    modifier: Modifier = Modifier,
    color: Color = Ng.tokens.panel,
    border: Color = Ng.tokens.line,
    shape: RoundedCornerShape = RoundedCornerShape(14.dp),
    onClick: (() -> Unit)? = null,
    padding: PaddingValues = PaddingValues(16.dp),
    content: @Composable ColumnScope.() -> Unit
) {
    val m = if (onClick != null) modifier.clip(shape).clickable(onClick = onClick) else modifier
    Surface(
        modifier = m.fillMaxWidth(),
        shape = shape,
        color = color,
        border = BorderStroke(1.dp, border),
        shadowElevation = 0.dp,
        tonalElevation = 0.dp
    ) { Column(Modifier.padding(padding), content = content) }
}

/** Pill chip: selected = navy on light / gold on dark; unselected = tint. */
@Composable
fun NgChip(text: String, selected: Boolean, onClick: () -> Unit) {
    val t = Ng.tokens
    Box(
        Modifier
            .clip(PillShape)
            .background(if (selected) t.selected else t.tint)
            .border(1.dp, if (selected) t.selected else t.tintLine, PillShape)
            .clickable(onClick = onClick)
            .padding(horizontal = 16.dp, vertical = 8.dp),
        contentAlignment = Alignment.Center
    ) {
        Text(
            text,
            style = MaterialTheme.typography.labelLarge,
            color = if (selected) t.onSelected else t.tintInk
        )
    }
}

/** Icon inside a 12dp-radius tile: gold-ink on gold-soft. */
@Composable
fun IconTile(icon: ImageVector, size: Int = 44, modifier: Modifier = Modifier) {
    val t = Ng.tokens
    Box(
        modifier
            .size(size.dp)
            .clip(RoundedCornerShape(12.dp))
            .background(t.goldSoft)
            .border(1.dp, t.goldLine, RoundedCornerShape(12.dp)),
        contentAlignment = Alignment.Center
    ) { Icon(icon, null, tint = t.goldInk, modifier = Modifier.size((size * 0.5).dp)) }
}

/** Round check control: outlined when open, navy/gold filled when done. */
@Composable
fun CheckCircle(checked: Boolean, onCheckedChange: (Boolean) -> Unit, size: Int = 32) {
    val t = Ng.tokens
    Box(
        Modifier
            .size(size.dp)
            .clip(CircleShape)
            .background(if (checked) t.selected else Color.Transparent)
            .border(1.5.dp, if (checked) t.selected else t.lineStrong, CircleShape)
            .clickable { onCheckedChange(!checked) },
        contentAlignment = Alignment.Center
    ) {
        if (checked) Icon(Icons.Default.Check, null, tint = t.onSelected, modifier = Modifier.size((size * 0.55).dp))
    }
}

/** The 3px gold top rule used on steps/feature panels. */
@Composable
fun GoldRule(modifier: Modifier = Modifier) {
    Box(modifier.fillMaxWidth().height(3.dp).background(Gold))
}
