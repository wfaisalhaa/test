package com.maham.app

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.maham.app.data.AppSettings
import com.maham.app.data.CheckList
import com.maham.app.data.ListItem
import com.maham.app.data.Repository
import com.maham.app.data.SettingsStore
import com.maham.app.data.Task
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import java.time.DayOfWeek

class MainViewModel(app: Application) : AndroidViewModel(app) {
    private val repo = Repository.get(app)
    private val settingsStore = SettingsStore(app)

    val tasks: StateFlow<List<Task>> = repo.allTasks
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())

    val lists: StateFlow<List<CheckList>> = repo.allLists
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())

    val listItems: StateFlow<List<ListItem>> = repo.allListItems
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())

    val settings: StateFlow<AppSettings> = settingsStore.settings
        .stateIn(viewModelScope, SharingStarted.Eagerly, AppSettings())

    fun saveTask(task: Task) = viewModelScope.launch { repo.saveTask(task) }
    fun setDone(task: Task, done: Boolean) = viewModelScope.launch { repo.setDone(task, done) }
    fun toggleImportant(task: Task) = viewModelScope.launch { repo.saveTask(task.copy(important = !task.important)) }
    fun deleteTask(task: Task) = viewModelScope.launch { repo.deleteTask(task) }

    fun addList(name: String, icon: String, color: Int) = viewModelScope.launch { repo.addList(name, icon, color) }
    fun deleteList(list: CheckList) = viewModelScope.launch { repo.deleteList(list) }
    fun renameList(list: CheckList, name: String) = viewModelScope.launch { repo.updateList(list.copy(name = name)) }
    fun addItem(listId: Long, text: String) = viewModelScope.launch { repo.addItem(listId, text) }
    fun toggleItem(item: ListItem) = viewModelScope.launch { repo.toggleItem(item) }
    fun deleteItem(item: ListItem) = viewModelScope.launch { repo.deleteItem(item) }

    fun setFirstDay(day: DayOfWeek) = viewModelScope.launch { settingsStore.setFirstDay(day) }
    fun setNotifications(enabled: Boolean) = viewModelScope.launch {
        settingsStore.setNotifications(enabled)
        if (enabled) repo.rescheduleAllReminders()
    }
    fun setDark(dark: Boolean) = viewModelScope.launch { settingsStore.setDark(dark) }

    /** Debug/demo only: fill the database with sample content. */
    fun seedDemo() = viewModelScope.launch { com.maham.app.data.DemoSeeder.seed(getApplication()) }
}
