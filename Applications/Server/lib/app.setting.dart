import 'dart:io';
import 'package:mongo_dart/mongo_dart.dart' hide State;

/** app status */
enum AppStatus { OK, ParamsError, NotFound, Forbidden, Error, Invalid, Unknown }

/** app 配置 */
InternetAddress APP_HOST_IP = InternetAddress.loopbackIPv4; // 配置
int APP_HOST_PORT = 8080; // 端口
int APP_WS_PORT = 8080; // ws端口
String APP_Directory_Path = Directory.current.path; // 根目录

/** mongod 相关 */

Db APP_MONGODB = Db("mongodb://localhost:27017/DARTSERVER");

// 用户
String APP_DB_USER = 'DB_USERS';

// 表格
String APP_DB_SHEET = 'DB_SHEETS';
// 表格数据
String APP_DB_SHEET_ENTRIES = 'DB_SHEETS_ENTRIES';
