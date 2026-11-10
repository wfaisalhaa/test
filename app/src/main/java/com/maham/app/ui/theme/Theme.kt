package com.maham.app.ui.theme

import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Shapes
import androidx.compose.material3.Typography
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.maham.app.R

/* ---------- Tokens: نظام الكحلي والذهبي ---------- */
val Navy = Color(0xFF071A33)
val Navy2 = Color(0xFF0B294E)
val Navy3 = Color(0xFF123A6B)
val NavyDeep = Color(0xFF061428)
val OnNavy = Color(0xFFFFFFFF)
val OnNavy2 = Color(0xFFC9D5E4)
val OnNavyMuted = Color(0xFF9FB3C8)
val NavyRule = Color(0x14FFFFFF)

val Gold = Color(0xFFC6A15B)
val Gold2 = Color(0xFFE2C584)
val GoldHover = Color(0xFFD6B26C)
val GoldInkLight = Color(0xFF8D6828)
val GoldSoftLight = Color(0xFFF7EEDC)
val GoldLineLight = Color(0xFFEBDCBE)
val GoldWash = Color(0x24C6A15B)

val Live = Color(0xFF2F9E6B)
val LiveDot = Color(0xFF3CCF8E)
val Danger = Color(0xFFB42318)
val TintInk = Color(0xFF123A6B)

/** Per-theme tokens that Material's color scheme has no slot for. */
data class NgTokens(
    val dark: Boolean,
    val paper: Color,
    val panel: Color,
    val ink: Color,
    val ink2: Color,
    val muted: Color,
    val line: Color,
    val lineStrong: Color,
    val inputLine: Color,
    val neutralSoft: Color,
    val goldInk: Color,
    val goldSoft: Color,
    val goldLine: Color,
    val liveInk: Color,
    val liveSoft: Color,
    val liveLine: Color,
    val tint: Color,
    val tintInk: Color,
    val tintLine: Color,
    val dangerInk: Color,
    val dangerSoft: Color,
    val dangerLine: Color,
    val selected: Color,
    val onSelected: Color,
    val link: Color,
)

val LightTokens = NgTokens(
    dark = false,
    paper = Color(0xFFF5F7FB), panel = Color(0xFFFFFFFF),
    ink = Color(0xFF13243B), ink2 = Color(0xFF2C3D52), muted = Color(0xFF5F6D7C),
    line = Color(0xFFE2E8F0), lineStrong = Color(0xFFC5D1DF), inputLine = Color(0xFFCFD8E3),
    neutralSoft = Color(0xFFF1F4F8),
    goldInk = GoldInkLight, goldSoft = GoldSoftLight, goldLine = GoldLineLight,
    liveInk = Color(0xFF1E7A50), liveSoft = Color(0xFFE5F4EC), liveLine = Color(0xFFBFE3CF),
    tint = Color(0xFFEEF3F9), tintInk = Color(0xFF123A6B), tintLine = Color(0xFFC9D8EA),
    dangerInk = Color(0xFF8A1F1F), dangerSoft = Color(0xFFFDECEC), dangerLine = Color(0xFFF3C2C2),
    selected = Navy, onSelected = Color.White, link = Navy3,
)

val DarkTokens = NgTokens(
    dark = true,
    paper = Color(0xFF06121F), panel = Color(0xFF0B1D33),
    ink = Color(0xFFE6EDF6), ink2 = Color(0xFFC9D5E4), muted = Color(0xFF9FB0C3),
    line = Color(0xFF1E3654), lineStrong = Color(0xFF4F6C92), inputLine = Color(0xFF56739A),
    neutralSoft = Color(0xFF13253D),
    goldInk = Gold2, goldSoft = Color(0xFF2A2414), goldLine = Color(0xFF4A3D22),
    liveInk = Color(0xFF6FD3A3), liveSoft = Color(0xFF0F2E22), liveLine = Color(0xFF1D4D38),
    tint = Color(0xFF12294A), tintInk = Color(0xFFC9D8EA), tintLine = Color(0xFF24456E),
    dangerInk = Color(0xFFFF9B94), dangerSoft = Color(0xFF3A1414), dangerLine = Color(0xFF6B2626),
    selected = Gold, onSelected = Navy, link = Gold2,
)

val LocalNg = staticCompositionLocalOf { LightTokens }

object Ng {
    val tokens: NgTokens
        @Composable get() = LocalNg.current
}

/* ---------- Fonts ---------- */
val KufiFamily = FontFamily(
    Font(R.font.noto_kufi_arabic, FontWeight.Medium),
    Font(R.font.noto_kufi_arabic, FontWeight.Bold),
    Font(R.font.noto_kufi_arabic, FontWeight.ExtraBold),
)
val PlexFamily = FontFamily(
    Font(R.font.plex_arabic_regular, FontWeight.Normal),
    Font(R.font.plex_arabic_medium, FontWeight.Medium),
    Font(R.font.plex_arabic_semibold, FontWeight.SemiBold),
    Font(R.font.plex_arabic_bold, FontWeight.Bold),
)

private fun kufi(size: Int, weight: FontWeight) =
    TextStyle(fontFamily = KufiFamily, fontSize = size.sp, fontWeight = weight, lineHeight = (size * 1.35).sp)

private fun plex(size: Float, weight: FontWeight, lh: Float = 1.6f) =
    TextStyle(fontFamily = PlexFamily, fontSize = size.sp, fontWeight = weight, lineHeight = (size * lh).sp)

val AppTypography = Typography(
    displaySmall = kufi(32, FontWeight.ExtraBold),      // title-2
    headlineMedium = kufi(26, FontWeight.Bold),         // title-3
    headlineSmall = kufi(20, FontWeight.Bold),          // heading
    titleLarge = kufi(18, FontWeight.Bold),             // card-title
    titleMedium = kufi(16, FontWeight.Bold),            // subhead
    titleSmall = plex(15.5f, FontWeight.SemiBold, 1.3f),// button
    bodyLarge = plex(16f, FontWeight.Normal, 1.6f),     // body
    bodyMedium = plex(14.5f, FontWeight.Normal, 1.6f),  // body-sm
    bodySmall = plex(13.5f, FontWeight.Normal, 1.5f),   // small
    labelLarge = plex(14f, FontWeight.SemiBold, 1.4f),
    labelMedium = plex(12.5f, FontWeight.SemiBold, 1.4f), // label
    labelSmall = plex(11.5f, FontWeight.Medium, 1.4f),
)

/* ---------- Shapes: r=14, control=10, tile=12, pill ---------- */
val AppShapes = Shapes(
    extraSmall = RoundedCornerShape(6.dp),   // tag
    small = RoundedCornerShape(10.dp),       // control
    medium = RoundedCornerShape(14.dp),      // r
    large = RoundedCornerShape(16.dp),       // panel
    extraLarge = RoundedCornerShape(18.dp)   // feature
)
val PillShape = RoundedCornerShape(30.dp)

private fun lightScheme(t: NgTokens) = lightColorScheme(
    primary = Navy3, onPrimary = Color.White,
    primaryContainer = t.tint, onPrimaryContainer = t.tintInk,
    secondary = Gold, onSecondary = Navy,
    secondaryContainer = t.goldSoft, onSecondaryContainer = t.goldInk,
    tertiary = Live, onTertiary = Color.White,
    background = t.paper, onBackground = t.ink,
    surface = t.panel, onSurface = t.ink,
    surfaceVariant = t.neutralSoft, onSurfaceVariant = t.muted,
    outline = t.lineStrong, outlineVariant = t.line,
    error = Danger, onError = Color.White,
    errorContainer = t.dangerSoft, onErrorContainer = t.dangerInk,
)

private fun darkScheme(t: NgTokens) = darkColorScheme(
    primary = Gold2, onPrimary = Navy,
    primaryContainer = t.tint, onPrimaryContainer = t.tintInk,
    secondary = Gold, onSecondary = Navy,
    secondaryContainer = t.goldSoft, onSecondaryContainer = t.goldInk,
    tertiary = LiveDot, onTertiary = Navy,
    background = t.paper, onBackground = t.ink,
    surface = t.panel, onSurface = t.ink,
    surfaceVariant = t.neutralSoft, onSurfaceVariant = t.muted,
    outline = t.lineStrong, outlineVariant = t.line,
    error = Color(0xFFFF8A80), onError = Navy,
    errorContainer = t.dangerSoft, onErrorContainer = t.dangerInk,
)

@Composable
fun MahamTheme(dark: Boolean = false, content: @Composable () -> Unit) {
    val tokens = if (dark) DarkTokens else LightTokens
    androidx.compose.runtime.CompositionLocalProvider(LocalNg provides tokens) {
        MaterialTheme(
            colorScheme = if (dark) darkScheme(tokens) else lightScheme(tokens),
            shapes = AppShapes,
            typography = AppTypography,
            content = content
        )
    }
}
