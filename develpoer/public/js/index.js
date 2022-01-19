const sendHttp = ({ method = "GET", path = "", data }) => {
  const xhr = new XMLHttpRequest();
  xhr.open(method, path);
  xhr.setRequestHeader("content-type", "application/json; charset=utf-8");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log(xhr);
      var resultObj = JSON.parse(xhr.responseText || "{}");
      //处理返回的数据......
      console.log(resultObj);
    }
  };
  xhr.send(data ? JSON.stringify(data) : undefined);
};
function easyUpload() {
  var input = document.createElement("input");
  input.type = "file";
  input.click();
  input.onchange = function () {
    var file = input.files[0];
    var form = new FormData();
    form.append("file", file); //第一个参数是后台读取的请求key值
    form.append("fileName", file.name);
    var xhr = new XMLHttpRequest();

    var action = "/upload/aaa"; //上传服务的接口地址
    xhr.open("POST", action);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(
      JSON.stringify({
        aaa: 222,
        bbb: 4444,
      })
    ); //发送表单数据
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var resultObj = JSON.parse(xhr.responseText);
        //处理返回的数据......
        console.log(resultObj);
      }
    };
  };
}

const createUser = () => {
  sendHttp({
    method: "POST",
    path: "http://localhost:8080/account/register",
    data: {
      mobile: "13154245367",
    },
  });
};

upload.onclick = createUser;
