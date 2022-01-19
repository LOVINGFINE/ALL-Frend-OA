import 'package:flutter/material.dart';
import 'package:netease/global.dart';

class FindPage extends StatefulWidget {
  @override
  _FindPageState createState() => _FindPageState();
}

class _FindPageState extends State<FindPage> {
  List<dynamic> topIcons = [];
  dynamic token;
  @override
  void initState() {
    super.initState();
    this.getIocns();
  }

  void getIocns() {
    GlobalContext.serverManager('FIND_TOP_TYPES_LIST').then((res) {
      this.setState(() {
        this.topIcons = res;
      });
    });
  }

  Widget getIconItem(Map item) {
    return Padding(
        padding: EdgeInsets.only(right: 30),
        child: Center(
            child: Column(
          children: [
            Opacity(
                opacity: 0.2,
                child: Container(
                  decoration: BoxDecoration(
                      color: Colors.black54,
                      borderRadius: BorderRadius.circular(30.0)),
                  child: Image.network(
                    item['iconUrl'],
                    height: 30.0,
                  ),
                )),
            Text(
              item['name'],
              style: TextStyle(color: Colors.black54, fontSize: 11.0),
            )
          ],
        )));
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Padding(
            padding: EdgeInsets.only(top: 30, left: 12, right: 12),
            child: ListView(
                scrollDirection: Axis.horizontal,
                children: topIcons.map((item) => getIconItem(item)).toList())),
      ],
    );
  }
}
