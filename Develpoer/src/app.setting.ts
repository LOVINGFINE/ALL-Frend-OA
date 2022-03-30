export enum AppStatus {
  OK,
  ERROR,
}

export class AppSetting {
  static APIPATH = "/api/";
  static port = 9999;
  static host = "127.0.0.1";
  static get LOCAL_IP() {
    var interfaces = require("os").networkInterfaces();
    for (var devName in interfaces) {
      var iface = interfaces[devName];
      for (var i = 0; i < iface.length; i++) {
        var alias = iface[i];
        if (
          alias.family === "IPv4" &&
          alias.address !== "127.0.0.1" &&
          !alias.internal
        ) {
          return alias.address;
        }
      }
    }
  }
}
