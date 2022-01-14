part of 'route.helper.dart';

Router _$RouteHelperRouter(RouteHelper route) {
  final router = Router();
  router.all(r'/account/<type>', route.account);
  return router;
}
