import 'package:mongo_dart/mongo_dart.dart';
import 'package:server/app.setting.dart';

class ModelInfo<T> {
  T data;
  ModelInfo(this.data);

  static dynamic generateOBJ<T>(json) {
    if (json == null) {
      return null;
    } else {
      return json as T;
    }
  }

  factory ModelInfo.fromJson(json) {
    return ModelInfo(
      generateOBJ<T>(json),
    );
  }
}

class MongodPlugin {
  DbCollection? document;

  MongodPlugin(String name) {
    document = APP_MONGODB.collection(name);
  }

  Future<AppStatus> insert(Map<String, dynamic> data) async {
    await APP_MONGODB.open();
    WriteResult? one = await document?.insertOne(data);
    await APP_MONGODB.close();
    if (one is WriteResult) {
      return AppStatus.OK;
    } else {
      return AppStatus.ParamsError;
    }
  }

  Future<Map<String, dynamic>?> findById(String id) async {
    await APP_MONGODB.open();
    Map<String, dynamic>? res =
        await document?.findOne(where.eq('id', id).excludeFields(['_id']));
    await APP_MONGODB.close();
    return res;
  }

  Future<AppStatus> update(String id, Map data) async {
    await APP_MONGODB.open();
    Map<String, dynamic>? res =
        await document?.update(where.eq('id', id), data);
    await APP_MONGODB.close();
    if (res is Map<String, dynamic>) {
      return AppStatus.OK;
    } else {
      return AppStatus.ParamsError;
    }
  }

  Future<AppStatus> delate(String id) async {
    await APP_MONGODB.open();
    await document?.deleteOne(where.eq('id', id));
    await APP_MONGODB.close();
    return AppStatus.OK;
  }

  Future<List<Map<String, dynamic>>> findBy(Map<String, dynamic> map) async {
    await APP_MONGODB.open();
    List<Map<String, dynamic>>? res = await document?.find(map).toList();
    await APP_MONGODB.close();
    return res ?? [];
  }

  Future<List<Map<String, dynamic>>> findAll() async {
    await APP_MONGODB.open();
    List<Map<String, dynamic>>? res = await document?.find().toList();
    await APP_MONGODB.close();
    return res ?? [];
  }
}
