import 'package:dio/dio.dart';
import 'package:dart_server_helper/dart_server_helper.dart' show DioManager;
import 'package:frend_mobile/global.dart';

class ServerManager {
  BaseOptions config = BaseOptions(
      baseUrl: 'http://localhost:8080',
      responseType: ResponseType.json,
      connectTimeout: 30000,
      receiveTimeout: 30000);

  DioManager get server => DioManager(config);

  interceptor() async {
    await GlobalContext().readStoreageByKey('token').then((value) {
      config.headers['Access-Token'] = '';
    });
  }

  dispath<T>(String action, {Map<String, dynamic> params}) async {
    await interceptor();
    switch (action) {
      case 'USER_LOGIN':
        return server.post<T>('account/login', data: params);
      case 'USER_REGISTER':
        return server.post<T>('/account/register', data: params);
      case 'USER_LOGOUT':
        return server.delete<T>('logout');
      default:
        return Future(() => 'no actions');
    }
  }
}
