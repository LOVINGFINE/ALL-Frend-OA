import 'package:shelf/shelf.dart';
import 'package:server/helpers/request.dart';
import 'package:server/models/sheet.dart';
import 'package:server/helpers/mongod.dart';
import 'package:server/app.setting.dart';

class SheetService {
  MongodPlugin sheetDb = MongodPlugin(APP_DB_SHEET);
  RequestHelper requestHelper = RequestHelper();

  SheetService(Request request) {
    requestHelper = RequestHelper(request: request);
  }

  Future<Response> insert() async {
    // 添加表格
    Sheet sheet = Sheet();
    var body = await requestHelper.getBody();
    if (body['name'] != null) {
      sheet.fromJson({'name': body['name'], 'code': 'AA'});
      var status = await sheetDb.insert(sheet.toMap);
      if (status == AppStatus.OK) {
        return requestHelper.response(200, body: sheet.info);
      }
    }
    return requestHelper.response(400, body: {'message': 'name is required'});
  }

  Future<Response> searchById(String id) async {
    // 获取表格
    var data = await sheetDb.findById(id);
    if (data != null) {
      Sheet sheet = Sheet();
      sheet.fromJson(data);
      return requestHelper.response(200, body: sheet.info);
    }
    return requestHelper
        .response(404, body: {'message': 'sheet $id not found'});
  }

  Future<Response> update(String id) async {
    // 修改表格属性
    Sheet sheet = Sheet();
    var data = await sheetDb.findById(id);
    if (data != null) {
      sheet.fromJson(data);
      var body = await requestHelper.getBody();
      if (body['name'] != null) {
        sheet.name = body['name'];
      }
      sheet.updateTime = DateTime.now().toString();
      AppStatus status = await sheetDb.update(id, sheet.toMap);
      if (status == AppStatus.OK) {
        return requestHelper.response(200, body: sheet.info);
      } else {
        return requestHelper
            .response(500, body: {'message': 'sheet update error'});
      }
    }
    return requestHelper
        .response(404, body: {'message': 'sheet $id not found'});
  }

  Future<Response> insertColumn(String sheetId) async {
    // 新增 表格列
    Sheet sheet = Sheet();
    var data = await sheetDb.findById(sheetId);
    if (data != null) {
      sheet.fromJson(data);
      var body = await requestHelper.getBody();
      var column = sheet.insertColumn(body['title'] ?? '', meta: body['meta']);
      sheet.updateTime = DateTime.now().toString();
      AppStatus status = await sheetDb.update(sheetId, sheet.toMap);
      if (status == AppStatus.OK) {
        return requestHelper.response(200, body: column.toMap);
      } else {
        return requestHelper
            .response(500, body: {'message': 'column insert error'});
      }
    }
    return requestHelper
        .response(404, body: {'message': 'sheet $sheetId not found'});
  }

  Future<Response> updateColumn(String sheetId) async {
    // 修改 表格列
    var sheet = Sheet();
    var data = await sheetDb.findById(sheetId);
    if (data != null) {
      sheet.fromJson(data);
      var body = await requestHelper.getBody();
      if (body['id'] != null) {
        var column = sheet.updateColumn(body['id'], options: body);
        AppStatus status = await sheetDb.update(sheetId, sheet.toMap);
        if (column != null && status == AppStatus.OK) {
          return requestHelper.response(200, body: column);
        }
      }
      return requestHelper.response(400,
          body: {'message': 'column id[${body['id']}] update error'});
    }
    return requestHelper
        .response(400, body: {'message': 'sheet[$sheetId] not found'});
  }

  Future<Response> insertEntries(String sheetId) async {
    // 新增行数据
    Sheet sheet = Sheet();
    var data = await sheetDb.findById(sheetId);
    var body = await requestHelper.getBody();
    if (data != null) {
      try {
        sheet.fromJson(data);
        sheet.insertRecords(body);
        AppStatus status = await sheetDb.update(sheetId, sheet.toMap);
        if (status == AppStatus.OK) {
          return requestHelper.response(200, body: {'message': 'insert ok'});
        } else {
          return requestHelper.response(500, body: {'message': 'insert error'});
        }
      } catch (_) {
        return requestHelper.response(400, body: {'message': 'params error'});
      }
    }
    return requestHelper
        .response(400, body: {'message': 'sheet $sheetId is notFound'});
  }

  Future<Response> updateEntries(String sheetId) async {
    // 修改行数据
    Sheet sheet = Sheet();
    var data = await sheetDb.findById(sheetId);
    if (data != null) {
      var body = await requestHelper.getBody();
      sheet.fromJson(data);
      sheet.updateRecords(body);
      AppStatus status = await sheetDb.update(sheetId, sheet.toMap);
      if (status == AppStatus.OK) {
        return requestHelper.response(200, body: {'message': 'ok'});
      } else {
        return requestHelper.response(500, body: {'message': 'update error'});
      }
    }
    return requestHelper
        .response(400, body: {'message': 'sheet $sheetId is notFound'});
  }

  Future<Response> getEntriesById(String sheetId) async {
    // 获取表格 数据
    var page = int.parse(requestHelper.querys['page'] ?? '1');
    var pageSize = int.parse(requestHelper.querys['pageSize'] ?? '30');
    Sheet sheet = Sheet();
    var data = await sheetDb.findById(sheetId);
    if (data != null) {
      sheet.fromJson(data);
      return requestHelper.response(200,
          body: sheet.getRecordsByPage(page: page, pageSize: pageSize));
    }
    return requestHelper
        .response(400, body: {'message': 'sheet $sheetId is notFound'});
  }
}
