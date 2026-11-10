package com.maham.app.ui.theme

import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Shapes
import androidx.compose.material3.Typography
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

val Blue = Color(0xFF4F7CF2)
val BlueSoft = Color(0xFFE3ECFF)
val Pink = Color(0xFFF26B8A)
val Amber = Color(0xFFF2B33D)
val Purple = Color(0xFF8B6CF2)
val Green = Color(0xFF3DBF8A)
val Background = Color(0xFFF3F6FC)
val Surface = Color(0xFFFFFFFF)
val TextPrimary = Color(0xFF1F2937)
val TextSecondary = Color(0xFF6B7280)

private val LightColors = lightColorScheme(
    primary = Blue,
    onPrimary = Color.White,
    primaryContainer = BlueSoft,
    onPrimaryContainer = Blue,
    secondary = Purple,
    background = Background,
    onBackground = TextPrimary,
    surface = Surface,
    onSurface = TextPrimary,
    surfaceVariant = Color(0xFFEDF1FA),
    onSurfaceVariant = TextSecondary,
    outline = Color(0xFFD1D5DB),
    error = Pink
)

private val DarkColors = darkColorScheme(
    primary = Color(0xFF8FB0FF),
    onPrimary = Color(0xFF0B1E4D),
    primaryContainer = Color(0xFF26407A),
    onPrimaryContainer = Color(0xFFDCE6FF),
    secondary = Color(0xFFB7A6FF),
    background = Color(0xFF0F1420),
    onBackground = Color(0xFFE5E7EB),
    surface = Color(0xFF181E2E),
    onSurface = Color(0xFFE5E7EB),
    surfaceVariant = Color(0xFF232B40),
    onSurfaceVariant = Color(0xFF9CA3AF),
    outline = Color(0xFF3B4357),
    error = Pink
)

val AppShapes = Shapes(
    small = RoundedCornerShape(10.dp),
    medium = RoundedCornerShape(16.dp),
    large = RoundedCornerShape(24.dp),
    extraLarge = RoundedCornerShape(28.dp)
)

val AppTypography = Typography(
    headlineMedium = Typography().headlineMedium.copy(fontWeight = FontWeight.Bold, fontSize = 26.sp),
    titleLarge = Typography().titleLarge.copy(fontWeight = FontWeight.Bold),
    titleMedium = Typography().titleMedium.copy(fontWeight = FontWeight.SemiBold),
    bodyLarge = Typography().bodyLarge.copy(fontSize = 16.sp),
)

@Composable
fun MahamTheme(dark: Boolean = false, content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = if (dark) DarkColors else LightColors,
        shapes = AppShapes,
        typography = AppTypography,
        content = content
    )
}
