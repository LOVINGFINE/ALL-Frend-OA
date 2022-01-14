import 'package:dart_server/setting/status.dart';
import 'dart:convert';
import 'dart:io';

List<String> whitelist = ['/account/login'];

class AuthenticationKey {
  static final String accessKey = 'Access-Token';
  static Map<String, DateTime> authenticationkeys =
      jsonDecode(File('./keys.json').readAsStringSync());
  static String create(String id) {
    String encoded = base64.encode(utf8.encode(id));
    authenticationkeys.addAll({encoded: DateTime.now()});
    File('./keys.json').writeAsStringSync(jsonEncode(authenticationkeys));
    return encoded;
  }

  static String getUserId(HttpRequest request) {
    String target = '';
    request.headers.forEach((key, value) {
      if (accessKey == key) {
        target = value.toString();
      }
    });
    String mapString = utf8.decode(base64.decode(target));
    String id = jsonDecode(mapString);
    return id;
  }

  static int deleteKey(HttpRequest request) {
    try {
      String target = '';
      request.headers.forEach((key, value) {
        if (accessKey == key) {
          target = value.toString();
        }
      });
      authenticationkeys.remove(target);
      return AppStatus.ok;
    } catch (error) {
      return AppStatus.error;
    }
  }

  static int authentication(HttpRequest request) {
    if (whitelist.contains(request.uri.path)) {
      return AppStatus.ok;
    }
    String target = '';
    request.headers.forEach((key, value) {
      if (accessKey == key) {
        target = value.toString();
      }
    });
    if (target != '' && authenticationkeys[target] != null) {
      String timeString = utf8.decode(base64.decode(target));
      DateTime time = DateTime(jsonDecode(timeString));
      if (time.isAfter(DateTime.now().subtract(const Duration(days: 1)))) {
        // 通过时间允许
        authenticationkeys[target] = DateTime.now();
        File('./keys.json').writeAsStringSync(jsonEncode(authenticationkeys));
        return AppStatus.ok;
      } else {
        // 过期
        authenticationkeys.remove(target);
        return AppStatus.error;
      }
    }
    return AppStatus.error;
  }
}
