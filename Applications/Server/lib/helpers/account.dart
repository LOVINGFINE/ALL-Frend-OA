import 'dart:developer';

import 'package:server/setting/_setting.dart';
import 'package:dart_server_helper/dart_server_helper.dart';
import 'package:server/models/user.dart';
import 'package:shelf/shelf.dart';

class AccountHelper extends DartServerHelper {
  String code;
  AccountHelper(Request request, this.code) : super(request);

  @override
  void delete() {
    error(405, message: 'not notAllow remove user');
  }

  @override
  void put() async {
    // 修改密码
    Map<String, dynamic> body = getBody();
    if (body['oldPassword'] == null) {
      paramNotFound('oldPassword');
      return;
    }
    if (body['newPassword'] == null) {
      paramNotFound('newPassword');
      return;
    }
    var user = await User.get(code);

    if (user != null) {
      if (user['password'] == body['oldPassword']) {
        // 密码正确
        User(user['mobile'], user: user)
            .update({'password': body['newPassword']});
        helper(user);
      } else {
        error(405, message: '原始密码不正确');
      }
    } else {
      error(404, message: 'user Id [$code] not found');
    }
  }

  @override
  void post() async {
    // 手机号 注册
    if (code == 'register') {
      register();
    }

    if (code == 'login') {
      login();
    }
  }

  @override
  get() async {
    var user = await User.get(code);
    if (user != null) {
      helper(user);
    } else {
      error(404, message: 'user Id [$code] not found');
    }
  }

  login() async {
    Map<String, dynamic> body = getBody();

    if (body['mobile'] == null) {
      paramNotFound('mobile');
      return;
    }

    if (body['password'] == null) {
      paramNotFound('password');
      return;
    }

    var user = await User.getUserInfoByMobile(body['mobile']);
    if (user != null && user['password'] == body['password']) {
      helper({"info": User(user['mobile']).toMap(), "token": '', "auth": []});
    } else {
      error(404, message: 'password [${body['password']}] error');
    }
  }

  register() async {
    Map<String, dynamic> body = getBody();
    print(body);
    if (body['mobile'] == null) {
      paramNotFound('mobile');
      return;
    }
    var user = User(body['mobile']);
    var userMap = user.toMap();
    AppStatus status = await User(body['mobile']).add();
    if (status == AppStatus.OK) {
      helper(userMap);
    } else {
      error(401, message: '注册失败');
    }
  }
}
