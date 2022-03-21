import 'package:flutter/material.dart';
import 'package:frend_mobile/app.manager.dart';

class PhoneInput extends StatefulWidget {
  @override
  _PhoneInput createState() => _PhoneInput();
}

class _PhoneInput extends State<PhoneInput> {
  String phone = '';
  @override
  void initState() {
    super.initState();
  }

  void _ok() {
    //获取验证码
    dispath<Map>('USER_LOGIN', params: {'mobile': phone}).then((res) {
      print(res);
    });
  }

  void changeValue(e) {
    print(e);
  }

  void changePhone(e) {
    phone = e;
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        SizedBox(
          height: 45.0,
        ),
        Container(
          height: 40.0,
          padding: EdgeInsets.only(top: 15, left: 12.0),
          decoration: BoxDecoration(
              color: Color(0x21ffffff),
              border: Border.all(color: Color(0x00000000), width: 1),
              borderRadius: BorderRadius.circular(8.0)),
          child: TextField(
            decoration: InputDecoration(
                hintText: '请输入手机号',
                border: OutlineInputBorder(borderSide: BorderSide.none)),
            style: TextStyle(color: Colors.black, fontSize: 16.0),
            onChanged: changePhone,
            cursorHeight: 16.0,
            cursorColor: Colors.black38,
          ),
        ),
        SizedBox(
          height: 15.0,
        ),
        Container(
          height: 40.0,
          padding: EdgeInsets.only(top: 15, left: 12.0),
          decoration: BoxDecoration(
              color: Color(0x21ffffff),
              border: Border.all(color: Color(0x00000000), width: 1),
              borderRadius: BorderRadius.circular(8.0)),
          child: TextField(
            decoration: InputDecoration(
                hintText: '请输入密码',
                border: OutlineInputBorder(borderSide: BorderSide.none)),
            style: TextStyle(color: Colors.black, fontSize: 16.0),
            onChanged: changeValue,
            cursorHeight: 16.0,
            cursorColor: Colors.black38,
          ),
        ),
        SizedBox(
          height: 45.0,
        ),
        InkWell(
          child: ElevatedButton(
            child: Text('登录'),
            onPressed: _ok,
          ),
        )
      ],
    );
  }
}
