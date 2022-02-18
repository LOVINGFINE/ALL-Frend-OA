import excelWorker from "./excel.worker";

export const readExcelFile = (file: File, callBack: (data: any) => void) => {
  const workerStr = excelWorker.toString();
  const code = workerStr.substring(
    workerStr.indexOf("{") + 1,
    workerStr.lastIndexOf("}")
  );

  const blob = new Blob([code], { type: "application/javascript" });
  const worker_script = URL.createObjectURL(blob);
  const worker = new Worker(worker_script);
  worker.onmessage = (message) => {
    callBack(message.data);
  };
  worker.postMessage(file);
};
