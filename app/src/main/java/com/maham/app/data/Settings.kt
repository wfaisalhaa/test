package com.maham.app.data

import android.content.Context
import androidx.datastore.preferences.core.booleanPreferencesKey
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.intPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import java.time.DayOfWeek

private val Context.dataStore by preferencesDataStore(name = "settings")

data class AppSettings(
    val firstDayOfWeek: DayOfWeek = DayOfWeek.SATURDAY,
    val notificationsEnabled: Boolean = true,
    val darkTheme: Boolean = false
)

class SettingsStore(private val context: Context) {
    private val KEY_FIRST_DAY = intPreferencesKey("first_day")
    private val KEY_NOTIF = booleanPreferencesKey("notifications")
    private val KEY_DARK = booleanPreferencesKey("dark")

    val settings: Flow<AppSettings> = context.dataStore.data.map { p ->
        AppSettings(
            firstDayOfWeek = DayOfWeek.of(p[KEY_FIRST_DAY] ?: DayOfWeek.SATURDAY.value),
            notificationsEnabled = p[KEY_NOTIF] ?: true,
            darkTheme = p[KEY_DARK] ?: false
        )
    }

    suspend fun setFirstDay(day: DayOfWeek) = context.dataStore.edit { it[KEY_FIRST_DAY] = day.value }
    suspend fun setNotifications(enabled: Boolean) = context.dataStore.edit { it[KEY_NOTIF] = enabled }
    suspend fun setDark(dark: Boolean) = context.dataStore.edit { it[KEY_DARK] = dark }
}
