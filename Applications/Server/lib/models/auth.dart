import 'package:server/plugins/_plugins.dart';
import 'package:server/setting/status.dart';

class Auth {
  static MongodPlugin mongod = MongodPlugin('auth');
  String key;
  String title = '';
  String desc = '';
  Auth(this.key, {title, desc}) {
    title = title ?? '';
    desc = desc ?? '';
  }

  Future<AppStatus> create() async {
    var hasKey = await mongod.find({'id': key});
    if (hasKey != null) {
      await mongod.insert({'id': key, 'title': title, 'desc': desc});
      return AppStatus.OK;
    } else {
      return AppStatus.ParamsError;
    }
  }

  Future<List<Map>> get() async {
    List<Map> list = await mongod.findAll();
    List<Map> res = [];
    list.forEach((ele) {
      res.add({key: ele['id'], title: ele['title'], desc: ele['desc']});
    });
    return res;
  }

  Future<AppStatus> delete() async {
    var hasKey = await mongod.find({'id': key});
    if (hasKey != null) {
      await mongod.delate(key);
      return AppStatus.OK;
    } else {
      return AppStatus.Unknown;
    }
  }

  Future<AppStatus> update(options) async {
    var hasKey = await mongod.find({'id': key});
    if (hasKey != null) {
      await mongod.update(key, options);
      return AppStatus.OK;
    } else {
      return AppStatus.Unknown;
    }
  }
}
