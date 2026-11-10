package com.maham.app.data

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import androidx.room.Update
import kotlinx.coroutines.flow.Flow

@Dao
interface TaskDao {
    @Query("SELECT * FROM tasks ORDER BY done ASC, dueDay IS NULL, dueDay ASC, dueMinute IS NULL, dueMinute ASC, createdAt DESC")
    fun observeAll(): Flow<List<Task>>

    @Query("SELECT * FROM tasks WHERE id = :id")
    suspend fun get(id: Long): Task?

    @Query("SELECT * FROM tasks WHERE dueDay = :day AND done = 0 ORDER BY dueMinute IS NULL, dueMinute ASC")
    suspend fun todayPending(day: Long): List<Task>

    @Query("SELECT * FROM tasks WHERE reminder = 1 AND done = 0 AND dueDay IS NOT NULL AND dueMinute IS NOT NULL")
    suspend fun withReminders(): List<Task>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun upsert(task: Task): Long

    @Update
    suspend fun update(task: Task)

    @Delete
    suspend fun delete(task: Task)

    @Query("UPDATE tasks SET done = :done, completedAt = :completedAt WHERE id = :id")
    suspend fun setDone(id: Long, done: Boolean, completedAt: Long?)
}

data class ListWithItems(
    val list: CheckList,
    val items: List<ListItem>
)

@Dao
interface ListDao {
    @Query("SELECT * FROM lists ORDER BY createdAt ASC")
    fun observeLists(): Flow<List<CheckList>>

    @Query("SELECT * FROM list_items ORDER BY position ASC, id ASC")
    fun observeItems(): Flow<List<ListItem>>

    @Insert
    suspend fun insertList(list: CheckList): Long

    @Update
    suspend fun updateList(list: CheckList)

    @Delete
    suspend fun deleteList(list: CheckList)

    @Insert
    suspend fun insertItem(item: ListItem): Long

    @Update
    suspend fun updateItem(item: ListItem)

    @Delete
    suspend fun deleteItem(item: ListItem)

    @Query("SELECT COALESCE(MAX(position), 0) + 1 FROM list_items WHERE listId = :listId")
    suspend fun nextPosition(listId: Long): Int
}
