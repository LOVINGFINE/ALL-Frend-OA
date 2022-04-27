import 'package:server/helpers/_helper.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf_router/shelf_router.dart';
import './service/account.dart';
class RouteHelper {
  @Route.post('/account/register') // 用户注册
  Future<Response> account_register(Request request) async {
    return await AccountHelper(request).register();
  }

  @Route.post('/account/login') // 登录
  Future<Response> account_login(Request request) async {
    return await AccountHelper(request).login();
  }

  Router get router => _$RouteHelper(this);
}

Router _$RouteHelper(RouteHelper route) {
  final router = Router();
  router.all(r'/account/register', route.account_register);
  router.all(r'/account/login', route.account_login);
  return router;
}
