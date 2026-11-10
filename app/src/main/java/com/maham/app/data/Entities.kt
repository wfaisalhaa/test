package com.maham.app.data

import androidx.room.Entity
import androidx.room.ForeignKey
import androidx.room.Index
import androidx.room.PrimaryKey

enum class Category { PERSONAL, WORK, LIST }

/** Task colors shown as the side stripe on each card. */
object TaskColors {
    val palette = listOf(
        0xFF4F7CF2.toInt(), // blue
        0xFFF26B8A.toInt(), // pink/red
        0xFFF2B33D.toInt(), // amber
        0xFF8B6CF2.toInt(), // purple
        0xFF3DBF8A.toInt(), // green
        0xFF7FC4E8.toInt(), // light blue
    )
}

@Entity(tableName = "tasks")
data class Task(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val title: String,
    val note: String = "",
    val emoji: String = "",
    val category: Category = Category.PERSONAL,
    /** Epoch day (LocalDate.toEpochDay()), null = no date */
    val dueDay: Long? = null,
    /** Minutes since midnight, null = no time */
    val dueMinute: Int? = null,
    val reminder: Boolean = false,
    val important: Boolean = false,
    val color: Int = TaskColors.palette[0],
    val done: Boolean = false,
    /** Epoch millis when completed */
    val completedAt: Long? = null,
    val createdAt: Long = System.currentTimeMillis()
)

@Entity(tableName = "lists")
data class CheckList(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val name: String,
    val icon: String = "📝",
    val color: Int = 0xFFE3ECFF.toInt(),
    val createdAt: Long = System.currentTimeMillis()
)

@Entity(
    tableName = "list_items",
    foreignKeys = [ForeignKey(
        entity = CheckList::class,
        parentColumns = ["id"],
        childColumns = ["listId"],
        onDelete = ForeignKey.CASCADE
    )],
    indices = [Index("listId")]
)
data class ListItem(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val listId: Long,
    val text: String,
    val done: Boolean = false,
    val position: Int = 0
)
