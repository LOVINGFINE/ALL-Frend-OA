import 'dart:developer';
import 'dart:io';
import 'package:dart_server/helpers/_helper.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf_router/shelf_router.dart';

part 'route.helper.g.dart';

class RouteHelper {
  @Route.get('/account/<type>')
  Future<Response> account(Request request, String type) async {
    return await AccountHelper(request, {'type': type}).response();
  }

  Router get router => _$RouteHelperRouter(this);
}
