import 'package:server/setting/_setting.dart';
import 'package:mongo_dart/mongo_dart.dart';

class MongodPlugin {
  DbCollection? document;

  MongodPlugin(String name) {
    document = MongodSetting.mongodDB
        .collection(MongodSetting.config['collections'][name]);
  }

  Future<AppStatus> insert(Map<String, dynamic> data) async {
    await MongodSetting.mongodDB.open();
    WriteResult? one = await document?.insertOne(data);
    await MongodSetting.mongodDB.close();
    if (one is WriteResult) {
      return AppStatus.OK;
    } else {
      return AppStatus.ParamsError;
    }
  }

  Future<Map<String, dynamic>?> find(Map data) async {
    await MongodSetting.mongodDB.open();
    Map<String, dynamic>? res =
        await document?.findOne(where.eq('id', data['id']));
    await MongodSetting.mongodDB.close();
    return res;
  }

  Future<dynamic> update(String id, Map data) async {
    await MongodSetting.mongodDB.open();
    Map<String, dynamic>? res =
        await document?.update(where.eq('id', id), data);
    await MongodSetting.mongodDB.close();
    if (res is Map<String, dynamic>) {
      return res;
    } else {
      return AppStatus.ParamsError;
    }
  }

  Future<AppStatus> delate(String id) async {
    await MongodSetting.mongodDB.open();
    await document?.deleteOne(where.eq('id', id));
    await MongodSetting.mongodDB.close();
    return AppStatus.OK;
  }

  Future<List<Map<String, dynamic>>> findBy(SelectorBuilder selector) async {
    await MongodSetting.mongodDB.open();
    List<Map<String, dynamic>>? res = await document?.find(selector).toList();
    await MongodSetting.mongodDB.close();
    return res ?? [];
  }

  Future<List<Map<String, dynamic>>> findAll() async {
    await MongodSetting.mongodDB.open();
    List<Map<String, dynamic>>? res = await document?.find().toList();
    await MongodSetting.mongodDB.close();
    return res ?? [];
  }
}