package com.maham.app.reminders

import android.Manifest
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import androidx.core.content.ContextCompat
import com.maham.app.MainActivity
import com.maham.app.R
import com.maham.app.data.Repository
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class ReminderReceiver : BroadcastReceiver() {
    companion object {
        const val CHANNEL_ID = "task_reminders"
        const val ACTION_MARK_DONE = "com.maham.app.ACTION_MARK_DONE"

        fun ensureChannel(context: Context) {
            val nm = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            if (nm.getNotificationChannel(CHANNEL_ID) == null) {
                nm.createNotificationChannel(
                    NotificationChannel(
                        CHANNEL_ID,
                        context.getString(R.string.notification_channel),
                        NotificationManager.IMPORTANCE_HIGH
                    ).apply { enableVibration(true) }
                )
            }
        }
    }

    override fun onReceive(context: Context, intent: Intent) {
        val taskId = intent.getLongExtra(ReminderScheduler.EXTRA_TASK_ID, -1L)
        if (taskId < 0) return
        val pending = goAsync()
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val repo = Repository.get(context)
                val task = repo.getTask(taskId) ?: return@launch
                if (intent.action == ACTION_MARK_DONE) {
                    repo.setDone(task, true)
                    NotificationManagerCompat.from(context).cancel(taskId.toInt())
                } else if (!task.done) {
                    showNotification(context, taskId, listOf(task.emoji, task.title).filter { it.isNotBlank() }.joinToString(" "))
                }
            } finally {
                pending.finish()
            }
        }
    }

    private fun showNotification(context: Context, taskId: Long, text: String) {
        if (Build.VERSION.SDK_INT >= 33 &&
            ContextCompat.checkSelfPermission(context, Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED
        ) return
        ensureChannel(context)

        val openApp = PendingIntent.getActivity(
            context, taskId.toInt(),
            Intent(context, MainActivity::class.java).apply {
                flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
                putExtra(ReminderScheduler.EXTRA_TASK_ID, taskId)
            },
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
        val markDone = PendingIntent.getBroadcast(
            context, (taskId * 31).toInt(),
            Intent(context, ReminderReceiver::class.java).apply {
                action = ACTION_MARK_DONE
                putExtra(ReminderScheduler.EXTRA_TASK_ID, taskId)
            },
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )

        val notification = NotificationCompat.Builder(context, CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_notification)
            .setContentTitle(context.getString(R.string.notification_title))
            .setContentText(text)
            .setStyle(NotificationCompat.BigTextStyle().bigText(text))
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setCategory(NotificationCompat.CATEGORY_REMINDER)
            .setContentIntent(openApp)
            .setAutoCancel(true)
            .addAction(0, context.getString(R.string.notification_done), markDone)
            .addAction(0, context.getString(R.string.notification_ok), openApp)
            .build()

        NotificationManagerCompat.from(context).notify(taskId.toInt(), notification)
    }
}
