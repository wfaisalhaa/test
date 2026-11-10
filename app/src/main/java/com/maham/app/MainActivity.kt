package com.maham.app

import android.Manifest
import android.content.Intent
import android.os.Build
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.contract.ActivityResultContracts
import androidx.activity.viewModels
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.outlined.CalendarMonth
import androidx.compose.material.icons.outlined.Checklist
import androidx.compose.material.icons.outlined.FactCheck
import androidx.compose.material.icons.outlined.Person
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.FloatingActionButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationBarItemDefaults
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.res.stringResource
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.maham.app.data.Task
import com.maham.app.reminders.ReminderReceiver
import com.maham.app.reminders.ReminderScheduler
import com.maham.app.ui.screens.CalendarScreen
import com.maham.app.ui.screens.ListsScreen
import com.maham.app.ui.screens.ProfileScreen
import com.maham.app.ui.screens.TaskEditorSheet
import com.maham.app.ui.screens.TasksScreen
import com.maham.app.ui.theme.Gold
import com.maham.app.ui.theme.GoldWash
import com.maham.app.ui.theme.MahamTheme
import com.maham.app.ui.theme.Navy
import com.maham.app.ui.theme.OnNavy2
import com.maham.app.ui.theme.OnNavyMuted
import androidx.compose.ui.unit.dp
import com.maham.app.widget.TodayWidgetProvider

enum class Tab(val labelRes: Int, val icon: ImageVector) {
    TASKS(R.string.nav_tasks, Icons.Outlined.FactCheck),
    LISTS(R.string.nav_lists, Icons.Outlined.Checklist),
    CALENDAR(R.string.nav_calendar, Icons.Outlined.CalendarMonth),
    PROFILE(R.string.nav_profile, Icons.Outlined.Person)
}

class MainActivity : ComponentActivity() {
    private val vm: MainViewModel by viewModels()
    private var launchIntent = mutableStateOf<Intent?>(null)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        ReminderReceiver.ensureChannel(this)
        launchIntent.value = intent

        setContent {
            val settings by vm.settings.collectAsStateWithLifecycle()
            MahamTheme(dark = settings.darkTheme) {
                NotificationPermission()
                MahamApp(vm = vm, launchIntent = launchIntent.value) { launchIntent.value = null }
            }
        }
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        launchIntent.value = intent
    }
}

@Composable
private fun NotificationPermission() {
    if (Build.VERSION.SDK_INT >= 33) {
        val launcher = rememberLauncherForActivityResult(ActivityResultContracts.RequestPermission()) {}
        LaunchedEffect(Unit) { launcher.launch(Manifest.permission.POST_NOTIFICATIONS) }
    }
}

@Composable
fun MahamApp(vm: MainViewModel, launchIntent: Intent?, onIntentHandled: () -> Unit) {
    var tab by rememberSaveable { mutableStateOf(Tab.TASKS) }
    var editorOpen by rememberSaveable { mutableStateOf(false) }
    var editingTask by remember { mutableStateOf<Task?>(null) }

    val tasks by vm.tasks.collectAsStateWithLifecycle()
    val lists by vm.lists.collectAsStateWithLifecycle()
    val items by vm.listItems.collectAsStateWithLifecycle()
    val settings by vm.settings.collectAsStateWithLifecycle()

    // Deep links from widget / notification
    LaunchedEffect(launchIntent, tasks) {
        val intent = launchIntent ?: return@LaunchedEffect
        if (intent.getBooleanExtra(TodayWidgetProvider.EXTRA_OPEN_ADD, false)) {
            editingTask = null; editorOpen = true; onIntentHandled()
        } else {
            val id = intent.getLongExtra(ReminderScheduler.EXTRA_TASK_ID, -1L)
            if (id >= 0 && tasks.isNotEmpty()) {
                tasks.firstOrNull { it.id == id }?.let { editingTask = it; editorOpen = true }
                onIntentHandled()
            } else if (id < 0) onIntentHandled()
        }
    }

    val openEditor: (Task?) -> Unit = { editingTask = it; editorOpen = true }

    Scaffold(
        containerColor = MaterialTheme.colorScheme.background,
        bottomBar = {
            // Navy ground with a gold current item, as the design's header/footer.
            NavigationBar(containerColor = Navy, contentColor = OnNavy2) {
                Tab.entries.forEach { t ->
                    NavigationBarItem(
                        selected = tab == t,
                        onClick = { tab = t },
                        icon = { Icon(t.icon, contentDescription = null) },
                        label = { Text(stringResource(t.labelRes), style = MaterialTheme.typography.labelMedium) },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = Gold,
                            selectedTextColor = Gold,
                            indicatorColor = GoldWash,
                            unselectedIconColor = OnNavyMuted,
                            unselectedTextColor = OnNavyMuted
                        )
                    )
                }
            }
        },
        floatingActionButton = {
            if (tab == Tab.TASKS || tab == Tab.CALENDAR) {
                FloatingActionButton(
                    onClick = { openEditor(null) },
                    containerColor = Gold,
                    contentColor = Navy,
                    shape = MaterialTheme.shapes.small,
                    elevation = FloatingActionButtonDefaults.elevation(0.dp, 0.dp, 0.dp, 0.dp)
                ) { Icon(Icons.Default.Add, contentDescription = stringResource(R.string.add_task)) }
            }
        }
    ) { padding ->
        val mod = Modifier.padding(padding)
        when (tab) {
            Tab.TASKS -> TasksScreen(
                modifier = mod, tasks = tasks,
                onToggle = { t, d -> vm.setDone(t, d) },
                onStar = vm::toggleImportant,
                onOpen = openEditor,
                onDelete = vm::deleteTask
            )
            Tab.LISTS -> ListsScreen(
                modifier = mod, lists = lists, items = items,
                onAddList = vm::addList, onDeleteList = vm::deleteList, onRenameList = vm::renameList,
                onAddItem = vm::addItem, onToggleItem = vm::toggleItem, onDeleteItem = vm::deleteItem
            )
            Tab.CALENDAR -> CalendarScreen(
                modifier = mod, tasks = tasks, firstDayOfWeek = settings.firstDayOfWeek,
                onToggle = { t, d -> vm.setDone(t, d) }, onStar = vm::toggleImportant, onOpen = openEditor
            )
            Tab.PROFILE -> ProfileScreen(
                modifier = mod, tasks = tasks, settings = settings,
                onFirstDay = vm::setFirstDay, onNotifications = vm::setNotifications, onDark = vm::setDark
            )
        }
    }

    if (editorOpen) {
        TaskEditorSheet(
            task = editingTask,
            onDismiss = { editorOpen = false },
            onSave = { vm.saveTask(it); editorOpen = false },
            onDelete = { vm.deleteTask(it); editorOpen = false }
        )
    }
}
