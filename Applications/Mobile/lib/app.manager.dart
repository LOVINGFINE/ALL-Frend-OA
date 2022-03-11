import 'app.global.dart';

dispath<T>(String action, {Map<String, dynamic> params}) {
  switch (action) {
    case 'USER_LOGIN':
      return serverManager.post<T>('account/login', data: params);
    case 'USER_REGISTER':
      return serverManager.post<T>('/account/register', data: params);
    case 'USER_LOGOUT':
      return serverManager.delete<T>('logout');
    default:
      return Future.error(() => 'no actions');
  }
}
