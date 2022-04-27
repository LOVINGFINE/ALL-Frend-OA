import 'package:crypto/crypto.dart';
import 'dart:convert';
import 'package:convert/convert.dart';
import 'package:server/helpers/request.dart';
import 'package:server/helpers/mongod.dart';
import 'package:server/app.setting.dart';

class User {
  static final MongodPlugin mongod = MongodPlugin(APP_DB_USER);
  String id = '';
  String nickname = '';
  String password = '';
  String mobile = '';
  String email = '';
  String avator = '';
  String description = '';
  String role = '';
  QrCode qrCode = QrCode();
  UserSetting setting = UserSetting();
  User({user}) {
    Map options = user ?? {};
    mobile = options['mobile'] ?? '';
    String optionPassword = generatePassword(password: options['password']);
    id = options['id'] ?? generateId(mobile + optionPassword);
    nickname = options['nickname'] ?? generateId(mobile);
    password = optionPassword;
    email = options['email'] ?? '';
    description = options['description'] ?? '';
    avator = options['avator'] ?? '';
    qrCode = QrCode(qr: options['qrCode']);
    setting = UserSetting(set: options['setting']);
    role = options['role'] ?? 'person';
  }
  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'nickname': nickname,
      'mobile': mobile,
      'role': role,
      'email': email,
      'avator': avator,
      'description': description,
      'qrCode': {'type': qrCode.type, 'time': qrCode.time},
      'setting': {'background': setting.background}
    };
  }

  Map<String, dynamic> parse() {
    return {
      'id': id,
      'password': password,
      'nickname': nickname,
      'mobile': mobile,
      'role': role,
      'email': email,
      'avator': avator,
      'description': description,
      'qrCode': {'type': qrCode.type, 'time': qrCode.time},
      'setting': {'background': setting.background}
    };
  }

  Future<bool> hasUser() async {
    List<Map<String, dynamic>> users = await mongod.findBy({'mobile': mobile});
    if (users.length > 0) {
      return true;
    }
    return false;
  }

  // get
  static Future<User?> get(Map<String, dynamic> options) async {
    // 查找用户
    if (options['password'] != null) {
      options['password'] = generatePassword(password: options['password']);
      List<Map<String, dynamic>> users = await mongod.findBy(options);
      if (users.length > 0) {
        return User(user: users[0]);
      }
    }
    return null;
  }

  // create
  Future<AppStatus> add() async {
    // 查找用户
    await mongod.insert(parse());
    return AppStatus.OK;
  }

  Future<AppStatus> update(Map<String, dynamic> options) async {
    // 查找用户
    var hasUser = await mongod.findById(id);
    if (hasUser != null) {
      Map user = parse();
      options.forEach((key, value) {
        if (user[key] != null) {
          user[key] = value;
        }
      });
      return await mongod.update(id, user);
    }
    return AppStatus.Error;
  }

  static Future<AppStatus> delete(String userId) async {
    // 查找用户
    var hasUser = await mongod.findById(userId);
    if (hasUser != null) {
      return await mongod.delate(userId);
    }
    return AppStatus.Error;
  }

  static Future<dynamic> getUserInfoByMobile(String mobile) async {
    // 通过 mobile
    return await mongod.findBy({'mobile': mobile});
  }
}

// 生成id
String generateId(data) {
  var content = Utf8Encoder().convert(data);
  var digest = md5.convert(content);
  return 'LF-${hex.encode(digest.bytes)}';
}

// 生成密码
String generatePassword({password}) {
  String data = password ?? 'lf123456';
  var content = Utf8Encoder().convert(data);
  var digest = md5.convert(content);
  // 这里其实就是 digest.toString()
  return hex.encode(digest.bytes);
}

class QrCodeEnum {
  static String hasAvator = 'has_avator';
  static String fill = 'fill';
}

class UserSetting {
  String background = '#fff';
  UserSetting({set}) {
    Map options = set ?? {};
    background = options['background'] ?? '#fff';
  }
}

class QrCode {
  String time = DateTime.now().toString();
  String type = QrCodeEnum.fill;
  QrCode({qr}) {
    Map options = qr ?? {};
    time = options['time'] ?? DateTime.now().toString();
    type = options['type'] ?? QrCodeEnum.fill;
  }
}
