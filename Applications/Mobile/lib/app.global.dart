import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:frend_mobile/plugins/service.dart';

// Create storage
FlutterSecureStorage get storage => new FlutterSecureStorage();

final serverManager = ServerManager().server;

String AccessToken = '';

class GlobalContext {
  GlobalContext() {
    AccessToken = readStoreageByKey('access-token');
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
