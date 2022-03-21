import 'app.global.dart';

dispath<T>(String action, {Map<String, dynamic> params}) async {
  switch (action) {
    case 'USER_LOGIN':
      print(serverManager.post);
      var res = await serverManager.post<T>('/account/login', data: params);
      return res;
    case 'USER_REGISTER':
      return serverManager.post<T>('/account/register', data: params);
    case 'USER_LOGOUT':
      return serverManager.delete<T>('logout');
    default:
      return Future.error(() => 'no actions');
  }
}
