part of 'route.helper.dart';

Router _$RouteHelper(RouteHelper route) {
  final router = Router();
  router.all(r'/account/<type>', route.account);
  return router;
}
