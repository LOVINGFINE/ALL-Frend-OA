// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'sheet.dart';

// **************************************************************************
// ShelfRouterGenerator
// **************************************************************************

Router _$SheetServiceRouter(SheetService service) {
  final router = Router();
  router.add('POST', r'/sheets', service.insertSheet);
  router.add('GET', r'/sheets/<id>', service.getSheetById);
  router.add('PUT', r'/sheets/<id>', service.updateSheetById);
  router.add('POST', r'/sheets/<id>/column', service.insertSheetColumn);
  router.add('PUT', r'/sheets/<id>/column', service.updateSheetColumn);
  router.add('POST', r'/sheets/<id>/entries', service.insertSheetEntries);
  router.add('GET', r'/sheets/<id>/entries', service.getSheetEntries);
  return router;
}
