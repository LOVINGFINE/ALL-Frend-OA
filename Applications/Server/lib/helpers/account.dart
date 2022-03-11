import '_helper.dart';
import 'package:shelf/shelf.dart';

class AccountHelper extends DartServerHelper {
  AccountHelper(Request request) : super(request);

  register() async {
    var body = getBody();
    print(body);
    return response(405, {});
  }
}
