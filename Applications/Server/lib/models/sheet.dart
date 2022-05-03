import 'package:server/utils/generate.dart';

class Sheet {
  String id = generateKey(value: 'LF-sheet-${DateTime.now()}').toUpperCase();
  String code = "";
  String createTime = DateTime.now().toString();
  String updateTime = DateTime.now().toString();
  String name = '';
  var columns = [];
  var records = [];

  get info {
    return {
      'id': id,
      'code': code,
      'name': name,
      'createTime': createTime,
      'updateTime': updateTime,
      'columns': columns,
    };
  }

  get toMap {
    return {
      'id': id,
      'code': code,
      'name': name,
      'createTime': createTime,
      'updateTime': updateTime,
      'columns': columns,
      'records': records
    };
  }

  fromJson(params) {
    if (params['id'] != null) {
      id = params['id'];
    }
    if (params['name'] != null) {
      name = params['name'];
    }
    if (params['code'] != null) {
      code = params['code'];
    }

    if (params['createTime'] != null) {
      createTime = params['createTime'];
    }
    if (params['updateTime'] != null) {
      updateTime = params['updateTime'];
    }
    columns = params['columns'] ?? [];
    records = params['records'] ?? [];
  }

  Column insertColumn(title, {meta}) {
    Meta metaConfig = Meta();
    if (meta != null) {
      metaConfig.fromJson(meta);
    }
    Column column = Column().fromJson({
      'code': '$code${columns.length}',
      'title': title,
      'meta': metaConfig.toMap
    });
    columns.add(column.toMap);
    return column;
  }

  deleteColumn(String id) {
    int index = -1;
    for (var i = 0; i < columns.length; i++) {
      if (columns[i]['id'] == id) {
        index = i;
        break;
      }
    }
    if (index != -1) {
      columns.removeAt(index);
    }
  }

  Map? updateColumn(String id, {options}) {
    var col;
    for (int i = 0; i < columns.length; i++) {
      if (id == columns[i]['id']) {
        if (options['title'] != null) {
          columns[i]['title'] = options['title'];
        }
        if (options['type'] != null && MetaType.isMetaType(options['type'])) {
          columns[i]['type'] = options['type'];
        }
        col = columns[i];
        break;
      }
    }
    return col;
  }

  Map getRecordsByPage({int page = 1, pageSize}) {
    int total = records.length;
    int size = pageSize ?? total;
    List<Map<String, dynamic>> list = [];
    int start = (page - 1) * size;
    int end = page * size + 1;
    if (start <= total) {
      for (int i = start; i < end; i++) {
        if (i < total) {
          var entry = SheetEntry(records[i]['id']);
          entry.fromJson(records[i]['record'], columns);
          list.add(entry.toMap);
        } else {
          break;
        }
      }
    }
    return {'total': total, 'page': page, 'pageSize': size, 'records': list};
  }

  void insertRecords(List data) {
    print(data);
    List<SheetEntry> list = [];
    data.forEach((ele) {
      var entry = SheetEntry(
          generateKey(value: 'LF-sheet-entry-$id-${DateTime.now()}')
              .substring(0, 11));
      entry.fromJson(ele, columns);
      list.add(entry);

      records.add(entry.toMap);
    });
  }

  updateRecords(Map<String, dynamic> data) {
    int length = data.length;
    for (var i = 0; i < records.length; i++) {
      if (length != 0) {
        if (data[records[i]['id']] != null) {
          data[records[i]['id']].forEach((key, value) {
            if (records[i]['record'][key] != null) {
              records[i]['record'][key] = value;
            }
          });
          length -= 1;
          break;
        }
      } else {
        break;
      }
    }
  }
}

class Column {
  String id = '';
  String code = '';
  String createTime = DateTime.now().toString();
  String updateTime = DateTime.now().toString();
  String title = '';
  int width = 180;
  Map formula = {'value': '', 'html': ''};
  String type = MetaType.string;
  Meta meta = Meta();

  fromJson(Map params) {
    id = params['id'] ?? generateKey(value: 'LF-sheet-$code').substring(0, 11);
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
      meta.fromJson(params['meta']);
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
      'meta': meta.toMap,
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
  fromJson(params) {
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

class SheetEntry {
  String id = '';
  Map<String, dynamic> record = {};
  SheetEntry(this.id);
  fromJson(Map<String, dynamic> data, columns) {
    columns.forEach((ele) {
      record[ele['id']] = data[ele['id']] ?? '';
    });
  }

  get toMap {
    return {'id': id, 'record': record};
  }
}
