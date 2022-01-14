import 'package:mongo_dart/mongo_dart.dart' hide State;
import 'dart:io';
import 'package:yaml/yaml.dart';
import 'default.dart';

class MongodSetting {
  static YamlMap config = loadYaml(
      File(DefaultSetting.appDirectoryPath + '/mongod.yaml')
          .readAsStringSync());
  static Db mongodDB =
      Db("mongodb://${config['host']}:${config['port']}/${config['name']}");

  // mongod 数据库

  static Future<dynamic> open() async {
    await mongodDB.open();
    print('mongod server open');
  }
}


// /* 启动 */
// brew services start mongodb-community@4.4

// /* 关闭 */
// brew services stop mongodb-community@4.4