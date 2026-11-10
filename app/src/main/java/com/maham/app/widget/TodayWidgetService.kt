package com.maham.app.widget

import android.content.Context
import android.content.Intent
import android.widget.RemoteViews
import android.widget.RemoteViewsService
import com.maham.app.R
import com.maham.app.data.Repository
import com.maham.app.data.Task
import com.maham.app.reminders.ReminderScheduler
import kotlinx.coroutines.runBlocking
import java.util.Locale

class TodayWidgetService : RemoteViewsService() {
    override fun onGetViewFactory(intent: Intent): RemoteViewsFactory = TodayFactory(applicationContext)
}

private class TodayFactory(private val context: Context) : RemoteViewsService.RemoteViewsFactory {
    private var items: List<Task> = emptyList()

    override fun onCreate() {}
    override fun onDestroy() {}
    override fun getCount() = items.size
    override fun getViewTypeCount() = 1
    override fun getItemId(position: Int) = items.getOrNull(position)?.id ?: position.toLong()
    override fun hasStableIds() = true
    override fun getLoadingView(): RemoteViews? = null

    override fun onDataSetChanged() {
        items = runBlocking { Repository.get(context).todayPending() }
    }

    override fun getViewAt(position: Int): RemoteViews {
        val task = items[position]
        val rv = RemoteViews(context.packageName, R.layout.widget_today_item)
        val title = listOf(task.emoji, task.title).filter { it.isNotBlank() }.joinToString(" ")
        rv.setTextViewText(R.id.item_title, "${position + 1}. $title")
        rv.setTextViewText(
            R.id.item_time,
            task.dueMinute?.let { String.format(Locale.US, "%02d:%02d", it / 60, it % 60) } ?: ""
        )
        rv.setOnClickFillInIntent(R.id.item_root, Intent().putExtra(ReminderScheduler.EXTRA_TASK_ID, task.id))
        return rv
    }
}
