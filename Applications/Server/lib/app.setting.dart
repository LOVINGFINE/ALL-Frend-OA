import 'dart:io';
import 'package:mongo_dart/mongo_dart.dart' hide State;

/** app status */
enum AppStatus { OK, ParamsError, NotFound, Forbidden, Error, Invalid, Unknown }

/** app 配置 */
InternetAddress APP_HOST_IP = InternetAddress.loopbackIPv4; // 配置
int APP_HOST_PORT = 8080; // 端口
String APP_Directory_Path = Directory.current.path; // 根目录

/** app 其他 */
app_origin_open(HttpServer server) {
  server.defaultResponseHeaders.add('Access-Control-Allow-Origin', '*'); //允许跨域
  server.defaultResponseHeaders
      .add("Access-Control-Allow-Methods", '*'); //跨域预检请求时候允许的请求方式
  server.defaultResponseHeaders
      .add("Access-Control-Allow-Headers", '*'); //允许跨域自定义的请求头
  server.defaultResponseHeaders.add("Access-Control-Allow-Credentials",
      false); //如果服务器端的响应中未携带 Access-Control-Allow-Credentials: true ，浏览器将不会把响应内容返回给请求的发送者。
  server.defaultResponseHeaders
      .add("Access-Control-Max-Age", "3600"); //跨域时候预检周期，防止重复性预检
}

/** mongod 相关 */

Db APP_MONGODB = Db("mongodb://localhost:27017/DARTSERVER");

String APP_DB_USER = 'DB_USERS';
