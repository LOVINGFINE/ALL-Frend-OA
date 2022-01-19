import 'package:server/plugins/_plugins.dart';
import 'package:server/setting/status.dart';

class Role {
  static MongodPlugin mongod = MongodPlugin('role');

  String key;
  String title = '';
  String desc = '';
  List<String> authentication = [];
  Role(this.key, {title, desc}) {
    title = title ?? '';
    desc = desc ?? '';
  }
  Map<String, dynamic> toMap() {
    return {
      'key': key,
      'title': title,
      'desc': desc,
      'authentication': authentication
    };
  }

  // get
  static Future<List<Map>> getAll() async {
    List<Map> list = await mongod.findAll();
    List<Map> res = [];
    list.forEach((ele) {
      res.add({'key': ele['id'], 'title': ele['title'], 'desc': ele['desc']});
    });
    return res;
  }

  static Future<Map<String, dynamic>> get(String key) async {
    var role = await mongod.find({'id': key});
    if (role != null) {
      return {
        'key': role['id'],
        'title': role['title'],
        'desc': role['desc'],
        'authentication': role['authentication']
      };
    } else {
      return {};
    }
  }

  // create
  Future<AppStatus> create() async {
    // 查找用户
    var hasUser = await mongod.find({'key': key});
    if (hasUser == null) {
      return await mongod.insert(toMap());
    }
    return AppStatus.Error;
  }

  Future<AppStatus> update(Map<String, dynamic> options) async {
    // 查找用户
    var hasUser = await mongod.find({'id': key});
    if (hasUser != null) {
      Map auth = toMap();
      options.forEach((key, value) {
        if (auth[key] != null) {
          auth[key] = value;
        }
      });
      return await mongod.update(key, auth);
    }
    return AppStatus.Error;
  }

  static Future<AppStatus> delete(String key) async {
    // 查找用户
    var hasUser = await mongod.find({'id': key});
    if (hasUser != null) {
      return await mongod.delate(key);
    }
    return AppStatus.Error;
  }
}
