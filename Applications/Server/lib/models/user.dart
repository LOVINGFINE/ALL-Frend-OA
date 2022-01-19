import 'package:crypto/crypto.dart';
import 'dart:convert';
import 'package:convert/convert.dart';
import 'package:server/plugins/_plugins.dart';
import 'package:server/setting/status.dart';

class User {
  static final MongodPlugin mongod = MongodPlugin('user');
  String id = '';
  String username = '';
  String password = '';
  String mobile;
  String email = '';
  String avator = '';
  String description = '';
  String role = '';
  QrCode qrCode = QrCode();
  UserSetting setting = UserSetting();
  User(this.mobile, {user}) {
    Map options = user ?? {};
    String optionPassword = generatePassword(password: options['password']);
    id = options['id'] ?? generateId(mobile + optionPassword);
    username = options['username'] ?? generateId(mobile);
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
      'username': username,
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
      'username': username,
      'mobile': mobile,
      'role': role,
      'email': email,
      'avator': avator,
      'description': description,
      'qrCode': {'type': qrCode.type, 'time': qrCode.time},
      'setting': {'background': setting.background}
    };
  }

  // get
  static Future<Map<String, dynamic>?> get(String userId) async {
    // 查找用户
    Map<String, dynamic>? user = await mongod.find({'id': userId});
    if (user != null) {
      return User(user['mobile'], user: user).toMap();
    }
    return user;
  }

  // create
  Future<AppStatus> add() async {
    // 查找用户
    var hasUser = await mongod.find({'id': id});
    if (hasUser == null) {
      return await mongod.insert(parse());
    }
    return AppStatus.Error;
  }

  Future<AppStatus> update(Map<String, dynamic> options) async {
    // 查找用户
    var hasUser = await mongod.find({'id': id});
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
    var hasUser = await mongod.find({'id': userId});
    if (hasUser != null) {
      return await mongod.delate(userId);
    }
    return AppStatus.Error;
  }

  static Future<dynamic> getUserInfoByMobile(String mobile) async {
    // 通过 mobile
    return await mongod.find({'mobile': mobile});
  }
}

// 生成id
String generateId(data) {
  var content = Utf8Encoder().convert(data);
  var digest = md5.convert(content);
  // 这里其实就是 digest.toString()
  return 'LF-' + hex.encode(digest.bytes);
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
