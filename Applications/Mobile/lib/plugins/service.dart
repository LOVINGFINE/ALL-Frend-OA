import 'package:dio/dio.dart';
import 'package:dart_server_helper/dart_server_helper.dart' show DioManager;
import 'package:frend_mobile/app.global.dart';

class ServerManager {
  DioManager get server => DioManager(config);

  BaseOptions config = BaseOptions(
      baseUrl: 'http://localhost:8080',
      responseType: ResponseType.json,
      connectTimeout: 30000,
      receiveTimeout: 30000);

  ServerManager() {
    interceptor();
  }
  interceptor() {
    config.headers['Access-Token'] = AccessToken;
  }
}
