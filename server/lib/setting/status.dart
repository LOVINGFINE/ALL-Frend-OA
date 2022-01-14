class AppStatus {
  static int ok = 200;
  static int paramsError = 400;
  static int notFound = 404;
  static int forbidden = 403;
  static int notAllow = 405;
  static int error = 500;
  static int invalid = 502;
  static int unkn = 502;
  static Map convert({code, message, data}) {
    return {'code': code ?? AppStatus.ok, 'message': message, 'data': data};
  }
}