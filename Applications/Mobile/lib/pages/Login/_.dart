import 'package:flutter/material.dart';
import 'phone.dart';
import 'dart:ui' as ui;

class LoginPage extends StatefulWidget {
  @override
  _LoginPage createState() => _LoginPage();
}

class _LoginPage extends State<LoginPage> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Container(
      padding: EdgeInsets.only(left: 30.0, right: 30.0),
      width: MediaQuery.of(context).size.width,
      height: MediaQuery.of(context).size.height,
      decoration: BoxDecoration(
          gradient: LinearGradient(
        colors: [Color(0xFFfbab66), Color(0xFFf7418c)],
        begin: Alignment.topCenter,
        end: Alignment.bottomCenter,
      )),
      child: Stack(
        alignment: Alignment.center,
        children: [
          Positioned(
            top: 160.0,
            child: Container(
              decoration: BoxDecoration(
                  color: Color(0x59000000),
                  border: Border.all(color: Color(0x00000000), width: 1),
                  borderRadius: BorderRadius.circular(16.0)),
              width: MediaQuery.of(context).size.width - 70,
              height: 300.0,
              child: Padding(
                padding: EdgeInsets.only(left: 30.0, right: 30.0),
                child: Column(
                  children: [
                    Padding(
                      padding: EdgeInsets.only(top: 20.0, bottom: 15.0),
                      child: Text('ALL-FREND-OA',
                          style: TextStyle(fontSize: 20.0, color: Colors.blue)),
                    ),
                    PhoneInput()
                  ],
                ),
              ),
            ),
          )
        ],
      ),
    ));
  }
}
