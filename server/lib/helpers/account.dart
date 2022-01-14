import 'package:dart_server/setting/_setting.dart';
import './dart_server_helper.dart';
import 'package:dart_server/models/user.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf_router/shelf_router.dart';

class AccountHelper extends DartServerHelper {
 Map<String, dynamic> params;
  AccountHelper(Request request,this.params) : super(request);

  @override
  void delete() {
    helper({'message': 'error delete key'});
  }

  @override
  void put() async {
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
    var res = await User.get(userId);
    if (res != null) {
      helper(User(res['mobile'], user: res).toMap());
    } else {
      error(AppStatus.notFound, message: 'not has user[$userId]');
    }
  }

  @override
  get() async {
    print(params);
  }
}
