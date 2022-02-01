import 'package:flutter/material.dart';
import 'package:yaml/yaml.dart';
import 'dart:io';

Map<String, Color> ThemeColors = {};

class AppTheme {
  static set(key) {
    print(key);
    File yamlFile = File('./$key.yaml');
    var maps = loadYaml(yamlFile.readAsStringSync());
    for (var key in maps) {
      ThemeColors[key] = Color(maps[key]);
    }
    print(ThemeColors);
  }
}
