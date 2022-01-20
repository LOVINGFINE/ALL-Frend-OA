import 'package:flutter/material.dart';
import 'package:frend_mobile/views/Tabs/FindPage.dart';
import 'package:frend_mobile/views/Tabs/SongPage.dart';
import 'package:frend_mobile/views/Tabs/AlbumPage.dart';
import 'package:frend_mobile/views/Tabs/UserPage.dart';
import 'package:frend_mobile/global.dart';
import 'package:frend_mobile/views/Login/LoginPage.dart';

class Tabs extends StatefulWidget {
  @override
  _TabsState createState() => _TabsState();
}

class _TabsState extends State<Tabs> {
  dynamic token;
  List<Widget> tabs = [
    Tab(icon: Icon(Icons.explore_rounded), text: '发现'),
    Tab(
      icon: Icon(Icons.list_alt_rounded),
      text: '歌单',
    ),
    Tab(
      icon: Icon(Icons.radio_rounded),
      text: '专辑',
    ),
    Tab(
      icon: Icon(Icons.person_outline),
      text: '我的',
    )
  ];
  void initState() {
    super.initState();
    GlobalContext().readStoreageByKey('token').then((value) {
      if (value == null) {
        Navigator.push(context, MaterialPageRoute(builder: (_) {
          return LoginPage();
        }));
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 4,
      initialIndex: 0,
      child: Container(
          decoration: BoxDecoration(color: Colors.black),
          child: Opacity(
              opacity: 0.8,
              child: Scaffold(
                  appBar: AppBar(),
                  drawer: Drawer(),
                  bottomNavigationBar: Container(
                      decoration: BoxDecoration(
                        // Container 裝飾組件
                        color: Colors.blue[800],
                      ),
                      height: 75, // 高度 一般都是50
                      child: Padding(
                          padding: EdgeInsets.only(bottom: 12),
                          child: TabBar(
                              // TabBar 組件  需要在MaterialApp的body屬性中指定，對應容器,
                              labelStyle: TextStyle(height: 0, fontSize: 10),
                              tabs: tabs))),
                  body: TabBarView(
                    children: <Widget>[
                      FindPage(),
                      SongPage(),
                      AlbumPage(),
                      UserPage()
                    ],
                  )))),
    );
  }
}
