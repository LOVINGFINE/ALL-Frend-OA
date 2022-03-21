import 'dart:io';
import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart' as shelf_io;
import 'app.router.dart';
import 'app.setting.dart';

void app() async {
  var handler = Cascade().add(RouteHelper().router).handler;
  HttpServer server = await shelf_io.serve(handler, APP_HOST_IP, APP_HOST_PORT);
  app_origin_open(server);
  print('Listening on localhost:${server.port}');
}

main() {
  app();
}
