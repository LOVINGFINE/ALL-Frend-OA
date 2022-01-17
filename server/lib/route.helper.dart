import 'package:server/helpers/_helper.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf_router/shelf_router.dart';

part 'route.helper.g.dart';

class RouteHelper {

  @Route.get('/account/<type>')
  Future<Response> account(Request request, String type) async {
    return await AccountHelper(request, type).response();
  }

  Router get router => _$RouteHelper(this);
}
