class Sheet {
  String id;
  String name = '';
  List<Column> columns = [];
  Sheet(this.id, {options: Map}) {
    name = options['name'] ?? '';
    for (var item in (options['columns'] ?? [])) {
      columns.add(Column(item));
    }
  }
}

enum DataType {
  string,
  number,
  boolean,
}

class Column {
  String id;
  String title = '';
  DataType type = DataType.string;
  Column(this.id, {options: Map}) {
    title = options['title'] ?? '';
    type = options['type'] ?? DataType.string;
  }
}

class Entry {}
