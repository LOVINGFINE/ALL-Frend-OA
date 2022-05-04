// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'app.router.dart';

// **************************************************************************
// ShelfRouterGenerator
// **************************************************************************

Router _$AppServiceRouter(AppService service) {
  final router = Router();
  router.add('POST', r'/sheets', service.insertSheet);
  router.add('GET', r'/sheets/<id>', service.getSheetById);
  router.add('PUT', r'/sheets/<id>', service.updateSheetById);
  router.add('POST', r'/sheets/<id>/column', service.insertSheetColumn);
  router.add('PUT', r'/sheets/<id>/column', service.updateSheetColumn);
  router.add('POST', r'/sheets/<id>/entries', service.insertSheetEntries);
  router.add('PUT', r'/sheets/<id>/entries', service.updateSheetEntries);
  router.add('GET', r'/sheets/<id>/entries', service.getSheetEntries);
  return router;
}
