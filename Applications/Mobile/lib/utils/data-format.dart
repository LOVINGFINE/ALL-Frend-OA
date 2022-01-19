import 'dart:core';

class EasyData {
  static String newCurrentDate(String format) {
    return DateTime.now().toString();
  }

  static String formatDate(DateTime time) {
    return time.toString();
  }
}
