package com.maham.app.data

import android.content.Context
import com.maham.app.reminders.ReminderScheduler
import com.maham.app.widget.TodayWidgetProvider
import kotlinx.coroutines.flow.Flow
import java.time.LocalDate

/**
 * Single entry point for data access. Also keeps reminders and the
 * home-screen widget in sync whenever tasks change.
 */
class Repository(private val context: Context) {
    private val db = AppDatabase.get(context)
    private val tasks = db.taskDao()
    private val lists = db.listDao()

    val allTasks: Flow<List<Task>> = tasks.observeAll()
    val allLists: Flow<List<CheckList>> = lists.observeLists()
    val allListItems: Flow<List<ListItem>> = lists.observeItems()

    suspend fun getTask(id: Long): Task? = tasks.get(id)

    suspend fun todayPending(): List<Task> = tasks.todayPending(LocalDate.now().toEpochDay())

    suspend fun saveTask(task: Task): Long {
        val id = tasks.upsert(task)
        val saved = task.copy(id = if (task.id == 0L) id else task.id)
        ReminderScheduler.sync(context, saved)
        TodayWidgetProvider.refresh(context)
        return saved.id
    }

    suspend fun setDone(task: Task, done: Boolean) {
        tasks.setDone(task.id, done, if (done) System.currentTimeMillis() else null)
        ReminderScheduler.sync(context, task.copy(done = done))
        TodayWidgetProvider.refresh(context)
    }

    suspend fun deleteTask(task: Task) {
        tasks.delete(task)
        ReminderScheduler.cancel(context, task.id)
        TodayWidgetProvider.refresh(context)
    }

    suspend fun rescheduleAllReminders() {
        tasks.withReminders().forEach { ReminderScheduler.sync(context, it) }
    }

    // ---- Checklists ----
    suspend fun addList(name: String, icon: String, color: Int): Long =
        lists.insertList(CheckList(name = name, icon = icon, color = color))

    suspend fun updateList(list: CheckList) = lists.updateList(list)
    suspend fun deleteList(list: CheckList) = lists.deleteList(list)

    suspend fun addItem(listId: Long, text: String) {
        val pos = lists.nextPosition(listId)
        lists.insertItem(ListItem(listId = listId, text = text, position = pos))
    }

    suspend fun toggleItem(item: ListItem) = lists.updateItem(item.copy(done = !item.done))
    suspend fun deleteItem(item: ListItem) = lists.deleteItem(item)

    companion object {
        @Volatile private var INSTANCE: Repository? = null
        fun get(context: Context): Repository =
            INSTANCE ?: synchronized(this) {
                INSTANCE ?: Repository(context.applicationContext).also { INSTANCE = it }
            }
    }
}
