import 'dark/main.dart';
import 'white/main.dart';

class ThemeDataMap {
  static Map readData(key) {
    switch (key) {
      case 'dark':
        return DarkTheme().read();
      case 'white':
        return WhiteTheme().read();
      default:
        return WhiteTheme().read();
    }
  }
}
