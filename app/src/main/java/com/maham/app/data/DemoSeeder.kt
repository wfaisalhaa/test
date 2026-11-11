package com.maham.app.data

import android.content.Context
import java.time.LocalDate

/** Debug-only: fills the database with sample data for screenshots and demos. */
object DemoSeeder {
    suspend fun seed(context: Context) {
        val db = AppDatabase.get(context)
        val tasks = db.taskDao()
        val lists = db.listDao()
        val today = LocalDate.now().toEpochDay()
        val now = System.currentTimeMillis()
        val day = 86_400_000L

        listOf(
            Task(title = "انضم إلى حفلة عيد ميلاد صديقك", emoji = "🎂", dueDay = today, dueMinute = 12 * 60 + 30, reminder = true, note = "أحضر الهدية", color = TaskColors.GOLD, important = true),
            Task(title = "أداء الواجب المنزلي", emoji = "🏫", dueDay = today, dueMinute = 11 * 60 + 30, note = "الرياضيات والفيزياء", color = TaskColors.DANGER),
            Task(title = "ضع خطة دراسية", emoji = "✍️", dueDay = today, dueMinute = 8 * 60, reminder = true, color = TaskColors.NAVY, category = Category.WORK),
            Task(title = "الركض الصباحي", dueDay = today + 1, dueMinute = 7 * 60, color = TaskColors.LIVE),
            Task(title = "احتفال موسيقي", emoji = "🎵", dueDay = today + 3, color = TaskColors.TINT),
            Task(title = "شاهد فيلم", emoji = "🎬", dueDay = today + 5, dueMinute = 21 * 60, color = TaskColors.NAVY),
            Task(title = "عيد ميلاد الجدة", emoji = "🎂", dueDay = today + 6, important = true, color = TaskColors.GOLD, note = "اطلب الكعكة"),
            Task(title = "إرسال بريد إلكتروني إلى تيم", dueDay = today + 2, dueMinute = 13 * 60 + 30, category = Category.WORK, color = TaskColors.NAVY),
            Task(title = "اشرب كأسًا من الماء", dueDay = today, dueMinute = 15 * 60, done = true, completedAt = now - 2 * 3_600_000, color = TaskColors.LIVE),
            Task(title = "قائمة التسوق", dueDay = today - 1, dueMinute = 7 * 60, done = true, completedAt = now - day, category = Category.LIST, color = TaskColors.TINT),
            Task(title = "تناول الغداء مع جيني", dueDay = today - 2, done = true, completedAt = now - 2 * day, color = TaskColors.GOLD),
            Task(title = "مراجعة التقرير الأسبوعي", dueDay = today - 3, done = true, completedAt = now - 3 * day, category = Category.WORK),
            Task(title = "اتصل بالعيادة", dueDay = today - 3, done = true, completedAt = now - 3 * day),
            Task(title = "تنظيف المكتب", dueDay = today - 4, done = true, completedAt = now - 4 * day),
            Task(title = "قراءة 20 صفحة", dueDay = today - 5, done = true, completedAt = now - 5 * day),
            Task(title = "تمرين المساء", dueDay = today - 5, done = true, completedAt = now - 5 * day, color = TaskColors.LIVE),
        ).forEach { tasks.upsert(it) }

        val study = lists.insertList(CheckList(name = "قائمة الدراسة", icon = "school", color = 3))
        listOf("درس الفرنسية", "درس الرياضيات", "واجب بيولوجي").forEachIndexed { i, s ->
            lists.insertItem(ListItem(listId = study, text = s, position = i, done = i == 0))
        }
        val shop = lists.insertList(CheckList(name = "قائمة التسوق", icon = "cart", color = 2))
        listOf("طماطم", "بروكلي", "شوكولاتة").forEachIndexed { i, s ->
            lists.insertItem(ListItem(listId = shop, text = s, position = i))
        }
        val movies = lists.insertList(CheckList(name = "قائمة الأفلام", icon = "movie", color = 1))
        listOf("سمكة كبيرة", "بدوي", "رايا والتنين الأخير").forEachIndexed { i, s ->
            lists.insertItem(ListItem(listId = movies, text = s, position = i, done = i == 2))
        }
    }
}
