import '_helper.dart';
import 'package:shelf/shelf.dart';
import 'package:server/utils/regExp.dart';
import 'package:server/models/user.dart';

class AccountHelper extends DartServerHelper {
  AccountHelper(Request request) : super(request);

  register() async {
    var body = await getBody();
    String username = body['username'] ?? '';
    if (RegxTest.testMobile(username)) {
      User user = User(user: {'mobile': username});
      bool hasUser = await user.hasUser();
      if (!hasUser) {
        await user.add();
        return response(200, body: user.toMap());
      }
      return response(400, body: {'code': 400, 'message': '手机号已经注册'});
    } else if (RegxTest.testEmail(username)) {
      return response(400, body: {'code': 400, 'message': '手机号不存在'});
    } else {
      return response(400, body: {'code': 400, 'message': '手机号不存在'});
    }
  }

  login() async {
    var body = await getBody();
    String username = body['username'] ?? '';
    String password = body['password'] ?? '';
    if (RegxTest.testMobile(username)) {
      User? user = await User.get({'mobile': username, "password": password});
      if (user != null) {
        return response(200, body: user.toMap());
      }
    } else if (RegxTest.testEmail(username)) {
      User? user = await User.get({'email': username, "password": password});
      if (user != null) {
        return response(200, body: user.toMap());
      }
    }
    return response(400, body: {'code': 400, 'message': '用户信息错误'});
  }
}
