import 'dart:io';
import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart' as shelf_io;
import 'package:shelf_cors_headers/shelf_cors_headers.dart';
import 'app.router.dart';
import 'app.setting.dart';

void app() async {
  final Map<String, String> overrideHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Max-Age': '3600',
  };
  var handler = const Pipeline()
      .addMiddleware(corsHeaders(headers: overrideHeaders))
      .addHandler(RouteHelper().router);
  HttpServer server = await shelf_io.serve(handler, APP_HOST_IP, APP_HOST_PORT);
  print('Listening on localhost:${server.port}');
}

main() {
  app();
}
