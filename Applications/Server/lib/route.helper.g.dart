part of 'route.helper.dart';

Router _$RouteHelper(RouteHelper route) {
  final router = Router();
  router.all(r'/account/register', route.account_register);
  return router;
}
