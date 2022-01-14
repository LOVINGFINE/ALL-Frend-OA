import 'dart:io';
import 'package:shelf/shelf_io.dart' as shelf_io;
import 'route.helper.dart';
import 'setting/_setting.dart';
// import 'package:http_server/http_server.dart' show VirtualDirectory;

void app() async {
  InternetAddress host = InternetAddress.loopbackIPv4;

// 服务端口
  int port = 8080;
  await MongodSetting.open();
  HttpServer server = await shelf_io.serve(RouteHelper().router, host, port);
  server.defaultResponseHeaders.add('Access-Control-Allow-Origin', '*'); //允许跨域
  server.defaultResponseHeaders
      .add("Access-Control-Allow-Methods", '*'); //跨域预检请求时候允许的请求方式
  server.defaultResponseHeaders
      .add("Access-Control-Allow-Headers", '*'); //允许跨域自定义的请求头
  server.defaultResponseHeaders.add("Access-Control-Allow-Credentials",
      false); //如果服务器端的响应中未携带 Access-Control-Allow-Credentials: true ，浏览器将不会把响应内容返回给请求的发送者。
  server.defaultResponseHeaders
      .add("Access-Control-Max-Age", "3600"); //跨域时候预检周期，防止重复性预检
  print('Listening on localhost:${server.port}');
}
