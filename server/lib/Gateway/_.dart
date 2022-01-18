import 'package:crypto/crypto.dart';
import 'dart:convert';
import 'package:convert/convert.dart';
import 'package:server/plugins/_plugins.dart';
import 'package:server/models/user.dart';
import 'package:server/setting/status.dart';

class Authentication {
  static MongodPlugin mongod = MongodPlugin('auth');
  static Future<String> create(userId) async {
    String key = generateKey(userId);
    var hasKey = await mongod.find({'id': key});
    if (hasKey == null) {
      await mongod.insert(
          {'key': key, 'user': User.get(userId), 'modifyTime': DateTime.now()});
      return key;
    } else {
      return key;
    }
  }

  static Future<AppStatus> delete(key) async {
    var hasKey = await mongod.find({'id': key});
    if (hasKey == null) {
      return AppStatus.NotFound;
    } else {
      await mongod.delate(key);
      return AppStatus.OK;
    }
  }

  static getAuthActions() {}

  static String generateKey(String userId) {
    var content = Utf8Encoder().convert(DateTime.now().toString() + userId);
    var digest = md5.convert(content);
    // 这里其实就是 digest.toString()
    return hex.encode(digest.bytes);
  }
}