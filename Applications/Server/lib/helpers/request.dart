import 'dart:convert';
import 'dart:io';
import 'package:shelf/shelf.dart';

class RequestHelper {
  var originRequest;
  Map<String, String> get querys => originRequest?.url.queryParameters ?? {};
  Map<String, String> get headers => originRequest?.headers ?? {};
  RequestHelper({request: Request}) {
    originRequest = request;
  }

  File? get getFile {
    // if (originRequest != null&&originRequest?.url!=null) {
    //   File(originRequest.url.pathSegments.last);
    // }
    print(originRequest);
    return null;
  }

  Future getBody() async {
    // 获取body
    var body = await originRequest?.readAsString();
    if (body != null) {
      try {
        return json.decode(body);
      } catch (e) {
        return null;
      }
    }
  }

  getQueryByKey(String key) {
    // 获取 params
    return querys[key];
  }

  String getHeadersBykey(String name) {
    String target = '';
    headers.forEach((key, value) {
      if (name == key) {
        target = value.toString();
      }
    });
    return target;
  }

  Response response(int code, {body: Map}) {
    var data = body ?? {};
    return Response(code, body: json.encode(data));
  }
}
