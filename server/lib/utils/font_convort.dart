import 'dart:io';
import 'package:yaml/yaml.dart';

class FontConvort {
  File convortFile = File('');
  File yamlFile = File('../../assets/fonts/font.yaml');
  dynamic yamlMaps;
  File pubFile = File('../../pubspec.yaml');
  late String family;
  File outPutJsonFile = File('');
  RegExp cssRegExp = RegExp(".icon-.*?:before{content:\".*?\";}");

  Map<String, Map<String, String>> targetMaps = {};
  List<String> infoList = [];

  // 初始化
  FontConvort(convortPath, {outPutJsonPath, required this.family}) {
    outPutJsonFile = File(outPutJsonPath);

    try {
      convortFile = File(convortPath);
      List fontsList = loadYaml(pubFile.readAsStringSync())['fonts'];
      for (var ele in fontsList) {
        targetMaps[ele['family']] = {};
      }
      if (yamlFile.existsSync()) {
        yamlMaps = loadYaml(yamlFile.readAsStringSync());
      }
    } catch (error) {
      print(error);
    }
  }

  convertCssString() {
    // 解析css文件
    String content = convortFile.readAsStringSync();
    String repaceString = content.replaceAll('\n', '').replaceAll(' ', '');
    Iterable<Match> items = cssRegExp.allMatches(repaceString);
    for (Match item in items) {
      var match = item.group(0).toString();
      String newItem = match.replaceFirst('.icon-', '').replaceAll('";}', '');
      String key = newItem.split(':before{content:"')[0];
      String val = '\\' + newItem.split(':before{content:"')[1];
      targetMaps[family]?[key] = val;
    }
  }

  // 解析css 文件 key
  void run() {
    try {
      convertCssString();
      yamlMaps[family].forEach((key, val) {
        if (targetMaps[family]?[key] == null) {
          targetMaps[family]?[key] = val;
        } else {
          infoList.add('$key: $val');
        }
      });
      yamlMaps.forEach((key, value) {
        if (targetMaps[key] == null) {
          targetMaps[key] = value;
        }
      });
      writeContent();
    } catch (error) {
      print(error);
    }
  }

  void writeContent() {
    File infoFile = File('.log');
    try {
      String yamlData = '# 字体图标集合配置清单\n';
      String jsonData = '{\n';
      targetMaps.forEach((key, value) {
        yamlData = yamlData + '$key:\n';
        jsonData = jsonData + '  "$key": {\n';
        value.forEach((valKey, val) {
          if (value.keys.last == valKey) {
            jsonData = jsonData + '    "$valKey": "$val"\n';
          } else {
            jsonData = jsonData + '    "$valKey": "$val",\n';
          }
          yamlData = yamlData + '  $valKey: $val\n';
        });
        if (targetMaps.keys.last == key) {
          jsonData = jsonData + '  }\n';
        } else {
          jsonData = jsonData + '  },\n';
        }
      });
      jsonData = jsonData + '}\n';
      yamlFile.writeAsString(yamlData);
      if (!outPutJsonFile.existsSync()) {
        outPutJsonFile.writeAsString(jsonData);
      }
      if (infoList.isNotEmpty) {
        FontConvort.info(infoList);
        if (infoFile.existsSync()) {
          infoFile.writeAsString(FontConvort.text(infoList),
              mode: FileMode.append);
        } else {
          infoFile.writeAsString(FontConvort.text(infoList));
        }
      }
    } catch (e) {
      print(e);
    }
  }

// 输出错误日志
  static String text(List<String> list) {
    String content = '';
    int i = 1;
    for (var ele in list) {
      content = '$content$i. $ele\n';
      i = i + 1;
    }
    return content +
        '\n**************  The above content is repeated ${DateTime.now().toString()} **************\n\n';
  }

  // 控制台打印
  static void info(List<String> list) {
    String content = FontConvort.text(list);
    print(content);
  }
}
