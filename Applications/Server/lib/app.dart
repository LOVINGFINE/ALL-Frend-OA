import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart' as shelf_io;
import 'package:shelf_cors_headers/shelf_cors_headers.dart';
import 'app.setting.dart';
import 'package:server/app.router.dart';
// import 'package:server/service/sheet.dart';
// import 'package:server/service/font.dart';
// import 'package:shelf_web_socket/shelf_web_socket.dart';

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
      .addHandler(AppService().router);
  var server = await shelf_io.serve(handler, APP_HOST_IP, APP_HOST_PORT);
  print('==> Listening on http://${server.address.host}:${server.port}');

  await APP_MONGODB.open(); // mongod
  print('==> OPEN APP_MONGODB SERVER');
  // var socketHandler = webSocketHandler((webSocket) {
  //   webSocket.stream.listen((message) {
  //     webSocket.sink.add("echo $message");
  //   });
  // });

  // shelf_io.serve(socketHandler, APP_HOST_IP, APP_WS_PORT).then((socketServer) {
  //   print(
  //       '==> Serving at ws://${socketServer.address.host}:${socketServer.port}');
  // });
}

main() {
  app();
}
