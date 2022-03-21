class RegxTest {
  static final RegExp mobile = RegExp(
      r'^((13[0-9])|(14[0-9])|(15[0-9])|(16[0-9])|(17[0-9])|(18[0-9])|(19[0-9]))\d{8}$');

  static bool testMobile(String value) {
    return RegxTest.mobile.hasMatch(value);
  }
}
