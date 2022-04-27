import 'package:server/utils/generate.dart';

class Sheet {
  String id = generateKey(value: 'LF-sheet-${DateTime.now()}').toUpperCase();
  String code;
  String createTime = DateTime.now().toString();
  String updateTime = DateTime.now().toString();
  String name = '';
  List<Column> columns = [];
  Sheet(this.code, {params}) {
    if (params != null) {
      if (params['id'] != null) {
        id = params['id'];
      }
      if (params['name'] != null) {
        name = params['name'];
      }
      if (params['columns'] != null) {
        params['columns'].forEach((ele) {
          columns.add(Column(ele['code'], params: ele));
        });
      }
      if (params['createTime'] != null) {
        createTime = params['createTime'];
      }
      if (params['updateTime'] != null) {
        updateTime = params['updateTime'];
      }
    }
  }
  get toMap {
    List<Map> list = [];
    for (var item in columns) {
      list.add(item.toMap);
    }
    return {
      'id': id,
      'code': code,
      'name': name,
      'createTime': createTime,
      'updateTime': updateTime,
      'columns': list,
    };
  }
}

class MetaType {
  static String string = 'String';
  static String number = 'Number';
  static String boolean = 'Boolean';
  static String date = 'Date';
  static String qrCode = 'QrCode';
  static String options = 'Options';
  static String file = 'File';
  static isMetaType(String type) {
    List<String> arr = [
      'String',
      'Number',
      'Boolean',
      'Date',
      'QrCode',
      'Options',
      'File'
    ];
    return arr.contains(type);
  }
}

class Column {
  String id = '';
  String code;
  String createTime = DateTime.now().toString();
  String updateTime = DateTime.now().toString();
  String title = '';
  int width = 180;
  Map formula = {'value': '', 'html': ''};
  String type = MetaType.string;
  Map meta = Meta().toMap;

  Column(this.code, {params}) {
    if (params != null) {
      id = params['id'] ?? generateKey(value: 'LF-sheet-$code');
      if (params['type'] != null && MetaType.isMetaType(params['type'])) {
        type = params['type'];
      }
      if (params['width'] != null) {
        width = params['width'];
      }

      if (params['title'] != null) {
        title = params['title'];
      }

      if (params['updateTime'] != null) {
        updateTime = params['updateTime'];
      }

      if (params['formula'] != null) {
        formula = params['formula'];
      }
      if (params['meta'] != null) {
        meta = Meta(params: params['meta']).toMap;
      }
    }
  }
  get toMap {
    return {
      'id': id,
      'code': code,
      'title': title,
      'createTime': createTime,
      'updateTime': updateTime,
      'type': type,
      'meta': meta,
      'width': width,
      'formula': formula
    };
  }
}

class Meta {
  Map Text = {};
  Map Number = {
    'decimal': "auto",
    'unit': "none",
  };
  Map Percent = {'decimal': "auto"};
  Map Boolean = {};
  Map Date = {
    'format': "YYYY-MM-DD HH:mm:ss",
  };
  Map QrCode = {
    'type': "PIC",
    'size': 100,
  };
  List Options = [];
  Map File = {};
  Meta({params}) {
    if (params != null) {
      if (params['Text'] != null) {
        Text = params['Text'];
      }
      if (params['Number'] != null) {
        Number = params['Text'];
      }
      if (params['Percent'] != null) {
        Percent = params['Percent'];
      }
      if (params['Boolean'] != null) {
        Boolean = params['Boolean'];
      }
      if (params['Date'] != null) {
        Date = params['Date'];
      }
      if (params['QrCode'] != null) {
        QrCode = params['QrCode'];
      }

      if (params['Options'] != null) {
        Options = params['Options'];
      }

      if (params['File'] != null) {
        File = params['File'];
      }
    }
  }
  get toMap {
    return {
      'Text': Text,
      'Number': Number,
      'Percent': Percent,
      'Boolean': Boolean,
      'Date': Date,
      'QrCode': QrCode,
      'Options': Options,
      'File': File
    };
  }
}

class Entry {
  String id = generateKey(value: 'LF-sheet-entry-${DateTime.now()}');
  Map<String, dynamic> record = {};
  Entry({columns, entryId, data}) {
    if (entryId != null) {
      id = entryId;
    }
    List<Column> keys = columns ?? [];
    keys.forEach((ele) {
      record[ele.id] = data[ele.id] ?? '';
    });
  }
  get toMap {
    return {'id': id, 'record': record};
  }
}

class EntryDb {
  String id;
  String createTime = DateTime.now().toString();
  String updateTime = DateTime.now().toString();
  List<Entry> records = [];
  EntryDb(
    this.id, {
    list,
    columns,
  }) {
    if (list != null) {
      for (var item in list) {
        records.add(Entry(entryId: item['id'], columns: columns, data: item));
      }
    }
  }
  get toMap {
    List<Map> list = [];
    for (var item in records) {
      list.add(item.toMap);
    }
    return {
      'id': id,
      'records': list,
      'createTime': createTime,
      'updateTime': updateTime,
    };
  }
}

class InsrtEntryProp {
  List<Map> records;
  InsrtEntryProp(this.records);
}
