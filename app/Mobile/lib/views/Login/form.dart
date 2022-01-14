import 'package:flutter/material.dart';

class LoginForm extends StatefulWidget {
  @override
  _LoginForm createState() => _LoginForm();
}

class _LoginForm extends State<LoginForm> {
  GlobalKey _formKey = new GlobalKey<FormState>();
  @override
  void initState() {
    super.initState();
  }

  void _login() {
    //获取验证码
  }
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Form(
        key: _formKey,
        child: Column(
          children: <Widget>[
            TextFormField(
                decoration: InputDecoration(
                  labelText: '',
                  hintText: '',
                  prefixIcon: Icon(Icons.person),
                ),
                // 校验用手机号（不能为空）
                validator: (v) {
                  return v.trim().isNotEmpty ? '' : '';
                }),
            Padding(
                padding: const EdgeInsets.only(top: 25),
                child: TextButton(
                  onPressed: _login,
                  child: Text('获取验证码'),
                )),
          ],
        ),
      ),
    );
  }
}
