import 'package:server/helpers/_helper.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf_router/shelf_router.dart';

part 'route.helper.g.dart';

class RouteHelper {
  @Route.post('/account/register') // 用户注册
  Future<Response> account_register(Request request) async {
    return await AccountHelper(request).register();
  }

  Router get router => _$RouteHelper(this);
}
