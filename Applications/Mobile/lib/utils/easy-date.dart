class EasyDate {
  // 构造函数
  EasyDate({dynamic date}) {
    if (date is String) {
      this.newDate = DateTime.parse(date);
    }
    if (date is DateTime) {
      this.newDate = date;
    }
    if (date == null) {
      this.newDate = DateTime.now();
    }
  }

  DateTime newDate;

  String format({String format}) {
    String newFormat = format == null ? 'YYYY-MM-dd HH:mm:ss' : format;
    DateTime date = this.newDate;
    int year = date.year;
    int month = date.month;
    int day = date.day;
    int hour = date.hour;
    int minute = date.minute;
    int second = date.second;

    return newFormat
        .replaceAll('YYYY', year.toString())
        .replaceAll('MM', month > 9 ? month.toString() : '0${month.toString()}')
        .replaceAll('DD', day > 9 ? day.toString() : '0${day.toString()}')
        .replaceAll('dd', day.toString())
        .replaceAll('HH', hour > 9 ? hour.toString() : '0${hour.toString()}')
        .replaceAll('hh', hour.toString())
        .replaceAll(
            'mm', minute > 9 ? minute.toString() : '0${minute.toString()}')
        .replaceAll('ss', second.toString());
  }
}
