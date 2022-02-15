import React from "react";
import { ReportHandler } from "web-vitals";
import ReactDOM from "react-dom";
import App from "./app";
// import "@testing-library/jest-dom";
const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};
ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback={<div>loading</div>}>
      <App />
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
