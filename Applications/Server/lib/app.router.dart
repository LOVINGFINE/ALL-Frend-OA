import 'package:shelf/shelf.dart';
import 'package:shelf_router/shelf_router.dart';
import 'package:server/service/sheet.dart';

part 'app.router.g.dart';

class AppService {
  @Route.post('/sheets') // 添加表格
  Future<Response> insertSheet(Request request) async {
    return SheetService(request).insert();
  }

  @Route.get('/sheets/<id>') // 获取表格
  Future<Response> getSheetById(Request request, String id) async {
    return SheetService(request).searchById(id);
  }

  @Route.put('/sheets/<id>') // 修改表格属性
  Future<Response> updateSheetById(Request request, String id) async {
    return SheetService(request).update(id);
  }

  @Route.post('/sheets/<id>/column') // 新增 表格列
  Future<Response> insertSheetColumn(Request request, String id) async {
    return SheetService(request).insertColumn(id);
  }

  @Route.put('/sheets/<id>/column') // 修改 表格列
  Future<Response> updateSheetColumn(Request request, String id) async {
    return SheetService(request).insertColumn(id);
  }

  @Route.post('/sheets/<id>/entries') // 新增行数据
  Future<Response> insertSheetEntries(Request request, String id) async {
    return SheetService(request).insertEntries(id);
  }

  @Route.put('/sheets/<id>/entries') // 修改行数据
  Future<Response> updateSheetEntries(Request request, String id) async {
    return SheetService(request).updateEntries(id);
  }

  @Route.get('/sheets/<id>/entries') // 获取表格 数据
  Future<Response> getSheetEntries(Request request, String id) async {
    return SheetService(request).getEntriesById(id);
  }

  Router get router => _$AppServiceRouter(this);
}
