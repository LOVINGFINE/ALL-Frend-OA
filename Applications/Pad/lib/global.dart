import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:frend_pad/theme/index.dart';
import 'package:frend_pad/plugins/ServerManager.dart';

class GlobalContext {
  
  static Future serverManager<T>(String action, {Map<String, dynamic> params}) async {
    return await ServerManager().dispath<T>(action, params: params);
  }

  // Create storage
  FlutterSecureStorage get storage => new FlutterSecureStorage();

  String token = '';
  Map themeData = {};

  setTheme(key) {
    this.themeData = ThemeDataMap.readData(key);
  }

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
