import 'package:flutter/material.dart';
import 'dart:io';
import 'package:yaml/yaml.dart';

class IconFont extends StatefulWidget {
  const IconFont(
      {Key key, this.fontFamily, this.type, this.fontSize, this.color})
      : super(key: key);
  final String type;
  final double fontSize;
  final Color color;
  final String fontFamily;
  @override
  _IconFont createState() => _IconFont();
}

class _IconFont extends State<IconFont> {
  Map<String, String> maps = {};
  @override
  void initState() {
    super.initState();
    findFileData();
  }

  void findFileData() {
    File yamlFile = File('./fonts.yaml');
    if (yamlFile.existsSync()) {
      var oldMaps = loadYaml(yamlFile.readAsStringSync());
      maps = oldMaps[widget.fontFamily];
    }
  }

  @override
  Widget build(BuildContext context) {
    return Text(
      maps[widget.type],
      style: TextStyle(
          fontFamily: widget.fontFamily,
          fontSize: widget.fontSize,
          color: widget.color),
    );
  }
}
