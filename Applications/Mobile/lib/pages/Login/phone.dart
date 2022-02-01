import 'package:flutter/material.dart';
import 'package:frend_mobile/theme/_.dart';

class PhoneInput extends StatefulWidget {
  @override
  _PhoneInput createState() => _PhoneInput();
}

class _PhoneInput extends State<PhoneInput> {
  @override
  void initState() {
    super.initState();
  }

  void _getCode() {
    //获取验证码
  }
  void changeValue(e) {
    print(e);
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
          padding: EdgeInsets.only(top: 20.0, left: 12.0),
          decoration: BoxDecoration(
              color: Color(0x21ffffff),
              border: Border.all(color: Color(0x00000000), width: 1),
              borderRadius: BorderRadius.circular(8.0)),
          child: TextField(
            decoration: InputDecoration(
                hintText: '请输入手机号',
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
            child: Text('获取验证码'),
            onPressed: _getCode,
          ),
        )
      ],
    );
  }
}
