import 'package:dart_server/plugins/_plugins.dart';
import 'package:dart_server/setting/status.dart';

class Authentication {
  static MongodPlugin mongod = MongodPlugin('authentication');

  String key;
  String title = '';
  String desc = '';
  Authentication(this.key, {title, desc}) {
    title = title ?? '';
    desc = desc ?? '';
  }
  Map<String, dynamic> toMap() {
    return {
      'key': key,
      'title': title,
      'desc': desc,
    };
  }

  // get
  static Future<List<Map<String, dynamic>>> getAll() async {
    // 查找用户
    List<Map<String, dynamic>> all = await mongod.findAll();
    return all;
  }

  // create
  Future<int> add() async {
    // 查找用户
    var hasUser = await mongod.find({'key': key});
    if (hasUser == null) {
      return await mongod.insert(toMap());
    }
    return AppStatus.error;
  }

  Future<int> update(Map<String, dynamic> options) async {
    // 查找用户
    var hasUser = await mongod.find({'key': key});
    if (hasUser != null) {
      Map auth = toMap();
      options.forEach((key, value) {
        if (auth[key] != null) {
          auth[key] = value;
        }
      });
      return await mongod.update(key, auth);
    }
    return AppStatus.error;
  }

  static Future<int> delete(String key) async {
    // 查找用户
    var hasUser = await mongod.find({'key': key});
    if (hasUser != null) {
      return await mongod.delate(key);
    }
    return AppStatus.error;
  }
}
