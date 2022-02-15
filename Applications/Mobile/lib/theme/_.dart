import 'package:flutter/material.dart';
import 'package:yaml/yaml.dart';
import 'dart:io';

Map<String, Color> themeColors = {};

class AppTheme {
  static set(key) {
    File yamlFile = File('./$key.yaml');
    var maps = loadYaml(yamlFile.readAsStringSync());
    for (var key in maps) {
      themeColors[key] = Color(maps[key]);
    }
  }
}
