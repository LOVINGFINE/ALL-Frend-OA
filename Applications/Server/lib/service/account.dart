import 'package:shelf/shelf.dart';
import 'package:shelf_router/shelf_router.dart';
import '../utils/regExp.dart';
import '../helpers/request.dart';
import 'package:server/models/user.dart';
import 'dart:convert';

part 'account.g.dart';

class AccountService {
  @Route.post('/login')
  Future<Response> user_login(Request request) async {
    RequestHelper helper = RequestHelper(request);
    var body = await helper.getBody();
    String username = body!['username'] ?? '';
    String password = body['password'] ?? '';
    if (RegxTest.testMobile(username)) {
      User? user = await User.get({'mobile': username, "password": password});
      if (user != null) {
        return helper.response(200, body: user.toMap());
      }
    } else if (RegxTest.testEmail(username)) {
      User? user = await User.get({'email': username, "password": password});
      if (user != null) {
        return helper.response(200, body: user.toMap());
      }
    }
    return helper.response(400, body: {'code': 400, 'message': '用户信息错误'});
  }

  Router get router => _$AccountServiceRouter(this);
}
