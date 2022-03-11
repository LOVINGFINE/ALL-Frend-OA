import 'package:flutter/material.dart';
import 'package:frend_mobile/pages/Login/_.dart';
import 'package:frend_mobile/theme/_.dart';

void main() async {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ALL-FREND-OA',
      theme: ThemeData(
        primarySwatch: themeColors['main'],
      ),
      home: LoginPage(),
    );
  }
}
