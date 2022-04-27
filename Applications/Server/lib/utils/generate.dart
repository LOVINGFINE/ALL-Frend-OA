import 'package:crypto/crypto.dart';
import 'dart:convert';
import 'package:convert/convert.dart';

// 生成 key
String generateKey({value}) {
  var data = value ?? 'LF-${DateTime.now()}';
  var content = Utf8Encoder().convert(data);
  var digest = md5.convert(content);
  return hex.encode(digest.bytes);
}
