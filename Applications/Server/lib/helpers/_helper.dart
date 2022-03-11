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

  Map<String, dynamic> getBody() {
    // 获取body
    return  request.context ;
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

  Response response(int code, body) {
    return Response(code, body: JsonEncoder(body));
  }
}
