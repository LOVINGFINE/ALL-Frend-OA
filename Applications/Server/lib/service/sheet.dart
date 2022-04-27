import 'package:shelf/shelf.dart';
import 'package:shelf_router/shelf_router.dart';
import 'package:server/helpers/request.dart';
import 'package:server/models/sheet.dart';
import 'package:server/helpers/mongod.dart';
import 'package:server/app.setting.dart';
part 'sheet.g.dart';

class SheetService {
  MongodPlugin sheetDb = MongodPlugin(APP_DB_SHEET);
  MongodPlugin entryDb = MongodPlugin(APP_DB_SHEET_ENTRIES);
  @Route.post('/sheets') // 添加表格
  Future<Response> insertSheet(Request request) async {
    RequestHelper helper = RequestHelper(request);
    var body = await helper.getBody();
    if (body['name'] != null) {
      Sheet sheet = Sheet('AA', params: body);
      var status = await sheetDb.insert(sheet.toMap);
      if (status == AppStatus.OK) {
        return helper.response(200, body: sheet.toMap);
      }
    }
    return helper.response(400, body: {'message': 'name is required'});
  }

  @Route.get('/sheets/<id>') // 获取表格
  Future<Response> getSheetById(Request request, String id) async {
    RequestHelper helper = RequestHelper(request);
    var sheet = await sheetDb.findById(id);
    if (sheet != null) {
      return helper.response(200, body: sheet);
    }
    return helper.response(404, body: {'message': 'sheet $id not found'});
  }

  @Route.put('/sheets/<id>') // 修改表格属性
  Future<Response> updateSheetById(Request request, String id) async {
    RequestHelper helper = RequestHelper(request);
    var map = await sheetDb.findById(id);
    if (map != null) {
      Sheet sheet = Sheet(map['code'], params: map);
      var body = await helper.getBody();
      if (body['name'] != null) {
        sheet.name = body['name'];
      }
      sheet.updateTime = DateTime.now().toString();
      AppStatus status = await sheetDb.update(id, sheet.toMap);
      if (status == AppStatus.OK) {
        return helper.response(200, body: sheet.toMap);
      } else {
        return helper.response(500, body: {'message': 'sheet update error'});
      }
    }
    return helper.response(404, body: {'message': 'sheet $id not found'});
  }

  @Route.post('/sheets/<id>/column') // 新增 表格列
  Future<Response> insertSheetColumn(Request request, String id) async {
    RequestHelper helper = RequestHelper(request);
    var map = await sheetDb.findById(id);
    if (map != null) {
      Sheet sheet = Sheet(map['code'], params: map);
      var body = await helper.getBody();
      Column column =
          Column("${sheet.code}${sheet.columns.length}", params: body);
      sheet.columns.add(column);
      sheet.updateTime = DateTime.now().toString();
      AppStatus status = await sheetDb.update(id, sheet.toMap);
      if (status == AppStatus.OK) {
        return helper.response(200, body: column.toMap);
      } else {
        return helper.response(500, body: {'message': 'column insert error'});
      }
    }
    return helper.response(404, body: {'message': 'sheet $id not found'});
  }

  @Route.put('/sheets/<id>/column') // 修改 表格列
  Future<Response> updateSheetColumn(Request request, String id) async {
    RequestHelper helper = RequestHelper(request);
    var map = await sheetDb.findById(id);
    if (map != null) {
      var sheet = Sheet(map['code'], params: map);
      var body = await helper.getBody();
      if (body['id'] != null) {
        Column res = Column('none');
        for (int i = 0; i < sheet.columns.length; i++) {
          if (sheet.columns[i].id == body['id']) {
            if (body['title'] != null) {
              sheet.columns[i].title = body['title'];
            }
            if (body['formula'] != null) {
              sheet.columns[i].formula['value'] = body['formula'];
              sheet.columns[i].formula['html'] = body['formula'];
            }
            if (body['meta'] != null) {
              sheet.columns[i].meta = Meta(params: body['meta']).toMap;
            }
            if (body['type'] != null && MetaType.isMetaType(body['meta'])) {
              sheet.columns[i].type = body['meta'];
            }
            sheet.columns[i].updateTime = DateTime.now().toString();
            res = sheet.columns[i];
            break;
          }
        }
        if (res.code != 'none') {
          AppStatus status = await sheetDb.update(id, sheet.toMap);
          if (status == AppStatus.OK) {
            return helper.response(200, body: res.toMap);
          } else {
            return helper
                .response(500, body: {'message': 'column update error'});
          }
        }
      }
      return helper.response(400,
          body: {'message': 'column params ${body['id']} insert error'});
    }
    return helper.response(400, body: {'message': 'sheet $id not found'});
  }

  @Route.post('/sheets/<id>/entries') // 新增行数据
  Future<Response> insertSheetEntries(Request request, String id) async {
    RequestHelper helper = RequestHelper(request);
    var sheetMap = await sheetDb.findById(id);
    var entryProp = await helper.getBody();
    if (entryProp['records'] != null && sheetMap != null) {
      Sheet sheet = Sheet(sheetMap['code'], params: sheetMap);
      var entryData = await entryDb.findById(id);
      if (entryData != null) {
        var sheetEntryDate =
            EntryDb(id, columns: sheet.columns, list: entryData['records']);
        for (Map item in entryProp['records']) {
          sheetEntryDate.records.insert(
            0,
            Entry(columns: sheet.columns, data: item),
          );
        }
        sheetEntryDate.updateTime = DateTime.now().toString();
        await entryDb.update(id, sheetEntryDate.toMap);
        return helper.response(200, body: {'message': 'ok'});
      } else {
        await entryDb.insert(
            EntryDb(id, columns: sheet.columns, list: entryProp['records'])
                .toMap);
        return helper.response(200, body: {'message': 'ok'});
      }
    } else {
      return helper.response(400, body: {'message': 'sheet $id is notFound'});
    }
  }

  @Route.get('/sheets/<id>/entries') // 获取表格 数据
  Future<Response> getSheetEntries(Request request, String id) async {
    RequestHelper helper = RequestHelper(request);
    var body = await helper.getBody();
    var data = await entryDb.findById(id);
    if (data != null) {
      return helper.response(200,
          body: {'total': data['records'].length, 'list': data['records']});
    }
    return helper.response(400, body: {'message': 'sheet $id is notFound'});
  }

  Router get router => _$SheetServiceRouter(this);
}
