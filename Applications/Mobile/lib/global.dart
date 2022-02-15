import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:frend_mobile/plugins/ServerManager.dart';

class GlobalContext {
  String token = '';
  static Future serverManager<T>(String action,
      {Map<String, dynamic> params}) async {
    print(params);
    return ServerManager().dispath<T>(action, params: params).then((value) {
      print(value);
    });
  }

  // Create storage
  FlutterSecureStorage get storage => new FlutterSecureStorage();

// Read value
  readStoreageByKey(key) {
    return storage.read(key: key);
  }

// Read all values
  readStoreageAll() async {
    Map<String, String> allValues = await storage.readAll();
    return allValues;
  }

// Read all values
  removeStoreageAll() async {
    await storage.deleteAll();
  }

// Delete value
  removeStoreageByKey(key) async {
    await storage.delete(key: key);
  }

// Write valueu
  writeStoreageByKey(key, value) async {
    await storage.write(key: key, value: value);
  }
}
