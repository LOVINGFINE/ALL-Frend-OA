import '_helper.dart';
import 'package:shelf/shelf.dart';
import 'package:server/utils/regExp.dart';
import 'package:server/models/user.dart';

class AccountHelper extends DartServerHelper {
  AccountHelper(Request request) : super(request);

  register() async {
    var body = await getBody();
    String mobile = body['mobile'] ?? '';
    if (RegxTest.testMobile(mobile)) {
      User user = User(user: {'mobile': mobile});
      bool hasUser = await user.hasUser();
      if (!hasUser) {
        await user.add();
        return response(200, body: user.toMap());
      }
      return response(400, body: {'code': 400, 'message': '手机号已经注册'});
    } else {
      return response(400, body: {'code': 400, 'message': '手机号不存在'});
    }
  }

  login() async {
    var body = await getBody();
    String mobile = body['mobile'] ?? '';
    String password = body['password'] ?? '';
    User? user = await User.get({'mobile': mobile, "password": password});
    if (user != null) {
      return response(200, body: user.toMap());
    }
    return response(400, body: {'code': 400, 'message': '用户信息错误'});
  }
}
