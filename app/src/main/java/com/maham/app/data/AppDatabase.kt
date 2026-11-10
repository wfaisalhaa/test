package com.maham.app.data

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.room.TypeConverter
import androidx.room.TypeConverters

class Converters {
    @TypeConverter fun categoryToString(c: Category): String = c.name
    @TypeConverter fun stringToCategory(s: String): Category =
        runCatching { Category.valueOf(s) }.getOrDefault(Category.PERSONAL)
}

@Database(
    entities = [Task::class, CheckList::class, ListItem::class],
    version = 1,
    exportSchema = false
)
@TypeConverters(Converters::class)
abstract class AppDatabase : RoomDatabase() {
    abstract fun taskDao(): TaskDao
    abstract fun listDao(): ListDao

    companion object {
        @Volatile private var INSTANCE: AppDatabase? = null

        fun get(context: Context): AppDatabase =
            INSTANCE ?: synchronized(this) {
                INSTANCE ?: Room.databaseBuilder(
                    context.applicationContext,
                    AppDatabase::class.java,
                    "maham.db"
                ).build().also { INSTANCE = it }
            }
    }
}
