package com.maham.app.reminders

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import com.maham.app.data.Repository
import com.maham.app.widget.TodayWidgetProvider
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

/** Re-registers all alarms after reboot or time change (alarms don't survive reboot). */
class BootReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        val pending = goAsync()
        CoroutineScope(Dispatchers.IO).launch {
            try {
                Repository.get(context).rescheduleAllReminders()
                TodayWidgetProvider.refresh(context)
            } finally {
                pending.finish()
            }
        }
    }
}
