import 'package:shelf/shelf.dart';
import 'package:shelf_router/shelf_router.dart';
import 'package:server/helpers/request.dart';
import 'package:server/models/sheet.dart';
import 'package:server/helpers/mongod.dart';
import 'package:server/app.setting.dart';
part 'sheet.g.dart';

class SheetService {
  MongodPlugin sheetDb = MongodPlugin(APP_DB_SHEET);

  @Route.post('/sheets') // 添加表格
  Future<Response> insertSheet(Request request) async {
    RequestHelper helper = RequestHelper(request);
    Sheet sheet = Sheet();
    var body = await helper.getBody();
    if (body['name'] != null) {
      sheet.fromJson({'name': body['name'], 'code': 'AA'});
      var status = await sheetDb.insert(sheet.toMap);
      if (status == AppStatus.OK) {
        return helper.response(200, body: sheet.info);
      }
    }
    return helper.response(400, body: {'message': 'name is required'});
  }

  @Route.get('/sheets/<id>') // 获取表格
  Future<Response> getSheetById(Request request, String id) async {
    RequestHelper helper = RequestHelper(request);
    var data = await sheetDb.findById(id);
    if (data != null) {
      Sheet sheet = Sheet();
      sheet.fromJson(data);
      return helper.response(200, body: sheet.info);
    }
    return helper.response(404, body: {'message': 'sheet $id not found'});
  }

  @Route.put('/sheets/<id>') // 修改表格属性
  Future<Response> updateSheetById(Request request, String id) async {
    RequestHelper helper = RequestHelper(request);
    Sheet sheet = Sheet();
    var data = await sheetDb.findById(id);
    if (data != null) {
      sheet.fromJson(data);
      var body = await helper.getBody();
      if (body['name'] != null) {
        sheet.name = body['name'];
      }
      sheet.updateTime = DateTime.now().toString();
      AppStatus status = await sheetDb.update(id, sheet.toMap);
      if (status == AppStatus.OK) {
        return helper.response(200, body: sheet.info);
      } else {
        return helper.response(500, body: {'message': 'sheet update error'});
      }
    }
    return helper.response(404, body: {'message': 'sheet $id not found'});
  }

  @Route.post('/sheets/<id>/column') // 新增 表格列
  Future<Response> insertSheetColumn(Request request, String id) async {
    RequestHelper helper = RequestHelper(request);
    Sheet sheet = Sheet();
    var data = await sheetDb.findById(id);
    if (data != null) {
      sheet.fromJson(data);
      var body = await helper.getBody();
      var column = sheet.insertColumn(body['title'] ?? '', meta: body['meta']);
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
    var sheet = Sheet();
    var data = await sheetDb.findById(id);
    if (data != null) {
      sheet.fromJson(data);
      var body = await helper.getBody();
      if (body['id'] != null) {
        var column = sheet.updateColumn(body['id'], options: body);
        if (column != null) {
          return helper.response(200, body: column.toMap);
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
    Sheet sheet = Sheet();
    var data = await sheetDb.findById(id);
    var body = await helper.getBody();
    if (data != null) {
      try {
        sheet.fromJson(data);
        sheet.insertRecords(body);
        AppStatus status = await sheetDb.update(id, sheet.toMap);
        if (status == AppStatus.OK) {
          return helper.response(200, body: {'message': 'insert ok'});
        } else {
          return helper.response(500, body: {'message': 'insert error'});
        }
      } catch (_) {
        return helper.response(400, body: {'message': 'params error'});
      }
    }
    return helper.response(400, body: {'message': 'sheet $id is notFound'});
  }

  @Route.put('/sheets/<id>/entries') // 修改行数据
  Future<Response> updateSheetEntries(Request request, String id) async {
    RequestHelper helper = RequestHelper(request);
    Sheet sheet = Sheet();
    var data = await sheetDb.findById(id);
    if (data != null) {
      var body = await helper.getBody();
      sheet.fromJson(data);
      sheet.updateRecords(body);
      AppStatus status = await sheetDb.update(id, sheet.toMap);
      if (status == AppStatus.OK) {
        return helper.response(200, body: {'message': 'ok'});
      } else {
        return helper.response(500, body: {'message': 'update error'});
      }
    }
    return helper.response(400, body: {'message': 'sheet $id is notFound'});
  }

  @Route.get('/sheets/<id>/entries') // 获取表格 数据
  Future<Response> getSheetEntries(Request request, String id) async {
    RequestHelper helper = RequestHelper(request);
    Sheet sheet = Sheet();
    var data = await sheetDb.findById(id);
    if (data != null) {
      sheet.fromJson(data);
      return helper.response(200, body: sheet.getRecordsByPage());
    }
    return helper.response(400, body: {'message': 'sheet $id is notFound'});
  }

  Router get router => _$SheetServiceRouter(this);
}
