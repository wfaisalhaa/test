#!/usr/bin/env bash
# Installs the debug APK on a running emulator and captures one PNG per screen.
set -euo pipefail
A="com.maham.app/.MainActivity"
OUT="${1:-shots}"
mkdir -p "$OUT"

shot() { sleep "$2"; adb exec-out screencap -p > "$OUT/$1.png"; echo "captured $1"; }
open() { adb shell am start -W --activity-single-top -n "$A" "$@" >/dev/null; }

# Switch the emulator itself to Arabic (needs a rooted image, e.g. google_apis).
adb root >/dev/null 2>&1 || true; sleep 3
adb shell setprop persist.sys.locale ar-SA
adb shell settings put system system_locales ar-SA || true
adb shell setprop ctl.restart zygote
sleep 20; adb wait-for-device
until [ "$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')" = "1" ]; do sleep 3; done
sleep 8
echo "locale now: $(adb shell getprop persist.sys.locale)"
adb install -r app/build/outputs/apk/debug/app-debug.apk

adb shell am start -W -n "$A" --es locale ar --ez seed_demo true --ei tab 0 >/dev/null
shot 01-tasks 8
open --ei tab 1;                     shot 02-lists 3
open --ei tab 2;                     shot 03-calendar 3
open --ei tab 3;                     shot 04-stats 3
open --ei tab 0 --ez open_add true;  shot 05-add-task 3
adb shell input keyevent BACK; sleep 1
open --ei tab 0 --ez dark true;      shot 06-tasks-dark 3
open --ei tab 3;                     shot 07-stats-dark 3
open --ei tab 0 --ez dark false
ls -la "$OUT"
