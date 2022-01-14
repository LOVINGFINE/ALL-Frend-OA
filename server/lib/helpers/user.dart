import 'dart:io';
import 'package:dart_server/setting/_setting.dart';
import 'package:dart_server_helper/dart_server_helper.dart';
import 'package:dart_server/models/user.dart';
import '../Authentication/authentication_key.dart';

class UserHelper extends DartServerHelper {
  static const String path = '/user/<id>';
  UserHelper(HttpRequest request, params) : super(request, params: params);

  @override
  void get() async {
    var userId = AuthenticationKey.getUserId(request);
    var res = await User.get(userId);
    if (res != null) {
      helper(User(res['mobile'], user: res).toMap());
    } else {
      error(AppStatus.notFound, message: 'not has user[$userId]');
    }
  }

  @override
  void delete() async {
    var userId = getParamByKey('id');
    if (userId == null) {
      paramNotFound('id');
    } else {
      int status = await User.delete(userId);
      if (status == AppStatus.ok) {
        helper({});
      } else {
        error(400, message: 'user not found [$userId]');
      }
    }
  }

  @override
  void patch() async {
    // 手机号 密码登录
    Map<String, dynamic> body = await getBody();
    if (body['mobile'] == null) {
      paramNotFound('mobile');
      return;
    }
    if (body['password'] == null) {
      paramNotFound('password');
      return;
    }
    String userId =
        User(body['mobile'], user: {'password': body['password']}).id;
    print(userId);
    var res = await User.get(userId);
    if (res != null) {
      helper(User(res['mobile'], user: res).toMap());
    } else {
      error(AppStatus.notFound, message: 'not has user[$userId]');
    }
  }

  @override
  void post() async {
    var body = await getBody();
    if (body['mobile'] == null) {
      paramNotFound('mobile');
      return;
    }
    User user = User(body['mobile']);
    int status = await user.add();
    if (status == AppStatus.ok) {
      helper(user.toMap());
    } else {
      error(400, message: 'mobile[${body['mobile']}] has aready');
    }
  }
}
