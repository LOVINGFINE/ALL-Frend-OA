import 'package:mongo_dart/mongo_dart.dart';
import 'package:server/app.setting.dart';

class MongodPlugin {
  DbCollection? document;

  MongodPlugin(String name) {
    document = APP_MONGODB.collection(name);
  }

  Future awaitOpen() async {
    if (!(APP_MONGODB.state == State.OPENING ||
        APP_MONGODB.state == State.OPEN)) {
      await APP_MONGODB.open();
    }
  }

  Future<AppStatus> insert(Map<String, dynamic> data) async {
    await awaitOpen();
    WriteResult? one = await document?.insertOne(data);
    if (one is WriteResult) {
      return AppStatus.OK;
    } else {
      return AppStatus.ParamsError;
    }
  }

  Future<Map<String, dynamic>?> findById(String id, {fieldName}) async {
    String idKey = fieldName ?? 'id';
    await awaitOpen();
    Map<String, dynamic>? res =
        await document?.findOne(where.eq(idKey, id).excludeFields(['_id']));
    return res;
  }

  Future<AppStatus> update(String id, Map data) async {
    await awaitOpen();
    Map<String, dynamic>? res =
        await document?.update(where.eq('id', id), data);
    if (res is Map<String, dynamic>) {
      return AppStatus.OK;
    } else {
      return AppStatus.ParamsError;
    }
  }

  Future<AppStatus> delate(String id) async {
    await awaitOpen();
    await document?.deleteOne(where.eq('id', id));
    return AppStatus.OK;
  }

  Future<List<Map<String, dynamic>>> findBy(Map<String, dynamic> map) async {
    await awaitOpen();
    List<Map<String, dynamic>>? res = await document?.find(map).toList();
    await APP_MONGODB.close();
    return res ?? [];
  }

  Future<List<Map<String, dynamic>>> findAll() async {
    await awaitOpen();
    List<Map<String, dynamic>>? res = await document?.find().toList();
    return res ?? [];
  }
}
