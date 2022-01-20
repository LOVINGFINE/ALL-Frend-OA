import 'package:dio/dio.dart';
import 'package:dart_server_helper/dart_server_helper.dart' show DioManager;
import 'package:frend_pad/global.dart';

class ServerManager {
  BaseOptions config = BaseOptions(
      baseUrl: 'https://localhost:8888/',
      responseType: ResponseType.json,
      connectTimeout: 30000,
      receiveTimeout: 30000);

  DioManager get server => DioManager(config);

  void interceptor() {
    config.headers['Access-Token'] = GlobalContext().readStoreageByKey('token');
  }

  Future dispath<T>(String action, {Map<String, dynamic> params}) async {
    interceptor();
    switch (action) {
      case 'USER_LOGIN':
        return server.post<T>('login', data: params);
      case 'USER_LOGOUT':
        return server.delete<T>('logout');
      default:
        return Future(() => 'no actions');
    }
  }
}
