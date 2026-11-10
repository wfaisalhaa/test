package com.maham.app.data

import androidx.room.Entity
import androidx.room.ForeignKey
import androidx.room.Index
import androidx.room.PrimaryKey

enum class Category { PERSONAL, WORK, LIST }

/**
 * Task "state colors" from the design system, stored as an index so the
 * actual color resolves per theme (light/dark) at render time.
 * 0 navy (default) · 1 gold (ready) · 2 live green · 3 tint blue · 4 danger
 */
object TaskColors {
    const val NAVY = 0
    const val GOLD = 1
    const val LIVE = 2
    const val TINT = 3
    const val DANGER = 4
    val palette = listOf(NAVY, GOLD, LIVE, TINT, DANGER)
}

/** Checklist panel tints, also stored as an index: 0 panel · 1 gold-soft · 2 live-soft · 3 tint · 4 neutral-soft · 5 danger-soft */
object ListColors {
    val palette = listOf(0, 1, 2, 3, 4, 5)
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
    val color: Int = TaskColors.NAVY,
    val done: Boolean = false,
    /** Epoch millis when completed */
    val completedAt: Long? = null,
    val createdAt: Long = System.currentTimeMillis()
)

@Entity(tableName = "lists")
data class CheckList(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val name: String,
    val icon: String = "list",
    val color: Int = 0,
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
