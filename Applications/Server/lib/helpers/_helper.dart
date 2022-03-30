import 'dart:convert';
import 'dart:io';
import 'package:shelf/shelf.dart';

export 'account.dart';

class DartServerHelper {
  Request request;
  File get getFile => File(request.url.pathSegments.last);
  Map<String, String> get querys => request.url.queryParameters;
  Map<String, String> get headers => request.headers;
  DartServerHelper(this.request);

  Future<Map<String, dynamic>> getBody() async {
    // 获取body
    var body = await request.readAsString();
    try {
      return jsonDecode(body);
    } catch (e) {
      return {};
    }
  }

  dynamic getQueryByKey(String key) {
    // 获取 params
    return request.url.queryParameters[key];
  }

  String getHeadersBykey(String name) {
    String target = '';
    request.headers.forEach((key, value) {
      if (name == key) {
        target = value.toString();
      }
    });
    return target;
  }

  Response response(int code, {body}) {
    var data = body ?? '{}';
    return Response(code, body: jsonEncode(data));
  }
}
