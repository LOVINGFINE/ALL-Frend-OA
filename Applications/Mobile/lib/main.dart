import 'package:flutter/material.dart';
import 'package:frend_mobile/views/Tabs/_.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'frend_mobile',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Tabs(),
    );
  }
}
