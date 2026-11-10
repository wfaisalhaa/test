# مهام (Maham) — تطبيق المهام اليومية لأندرويد

تطبيق Android أصلي (Kotlin + Jetpack Compose + Room) بواجهة عربية RTL، مستوحى من الصور المرفقة.

## التصميم

يطبّق نظام «الكحلي والذهبي»: أرضيات كحلية (شريط التنقل، لوحة الإحصائيات) وذهبي للفعل الأهم (زر الإضافة والحفظ)، لوحات بيضاء بحدّ 1px بلا ظلال، زاوية 14dp، خط Noto Kufi Arabic للعناوين وIBM Plex Sans Arabic للنص (رخصة OFL في مجلد `licenses`)، ووضع داكن بنفس الرموز.

## المزايا
| الشاشة | الوظيفة |
|---|---|
| **مهام** | فلاتر (الكل / شخصي / عمل / قائمة)، أقسام: متأخرة / اليوم / آخر / مكتملة، شريط لون جانبي، رمز تعبيري، نجمة "مهم"، سحب للحذف |
| **إضافة/تعديل مهمة** | عنوان، ملاحظة، رمز، تاريخ، وقت، فئة، لون، تذكير، مهم |
| **قوائم** | قوائم مراجعة غير محدودة (دراسة، تسوق، أفلام…) بأيقونة ولون لكل قائمة، إضافة/شطب/حذف عناصر |
| **الرزنامة** | شبكة شهرية، دوائر ملوّنة بلون المهمة، رمز المهمة على اليوم، قائمة مهام اليوم المحدد |
| **خاصتي** | المهام المكتملة/العالقة، رسم بياني للإنجاز الأسبوعي، سلسلة الأيام، مهام الـ7 أيام القادمة، الإعدادات (أول يوم بالأسبوع، التنبيهات، الوضع الداكن) |
| **التنبيهات** | إشعار في وقت المهمة بزرّي "تم" و"حسنًا" (AlarmManager + إعادة الجدولة بعد إعادة التشغيل) |
| **ويدجت** | ويدجت "اليوم" على الشاشة الرئيسية يعرض مهام اليوم مع زر + |

## بناء ملف APK

### الطريقة 1: Android Studio (الأسهل)
1. ثبّت [Android Studio](https://developer.android.com/studio) (Ladybug أو أحدث).
2. **File → Open** واختر مجلد `MahamApp`.
3. انتظر انتهاء Gradle Sync (يحمّل الاعتماديات أول مرة).
4. **Build → Build Bundle(s) / APK(s) → Build APK(s)**.
5. ستجد الملف في: `app/build/outputs/apk/debug/app-debug.apk`

### الطريقة 2: سطر الأوامر
```bash
# يتطلب JDK 17+ ومتغير ANDROID_HOME يشير إلى Android SDK
./gradlew assembleDebug
# الناتج: app/build/outputs/apk/debug/app-debug.apk
```

### نسخة Release موقّعة (للنشر)
```bash
keytool -genkey -v -keystore maham.jks -keyalg RSA -keysize 2048 -validity 10000 -alias maham
./gradlew assembleRelease
# ثم وقّع الملف من Android Studio: Build → Generate Signed Bundle / APK
```

## بنية المشروع
```
app/src/main/java/com/maham/app/
├── MainActivity.kt          # التنقل السفلي + FAB + معالجة روابط الويدجت/الإشعارات
├── MainViewModel.kt
├── data/                    # Room: Task, CheckList, ListItem + Repository + Settings
├── reminders/               # ReminderScheduler, ReminderReceiver, BootReceiver
├── widget/                  # TodayWidgetProvider + TodayWidgetService
└── ui/
    ├── theme/Theme.kt
    ├── components/TaskCard.kt
    └── screens/             # Tasks, TaskEditorSheet, Lists, Calendar, Profile
```

## المتطلبات
- minSdk 26 (Android 8.0+) · targetSdk 35
- Kotlin 2.0.21 · AGP 8.7.3 · Compose BOM 2024.12 · Room 2.6.1

## ملاحظات
- اللغة الافتراضية عربية؛ تتحول للإنجليزية تلقائيًا إذا كانت لغة الجهاز إنجليزية.
- على Android 13+ سيطلب التطبيق إذن الإشعارات عند أول تشغيل.
- على Android 12+ إذا لم يُمنح إذن "المنبهات الدقيقة" تُستخدم منبهات تقريبية (قد تتأخر دقائق).
