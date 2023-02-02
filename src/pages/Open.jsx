import React from "react";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const Open = (params) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const url =
    "https://firebasestorage.googleapis.com/v0/b/apniclass-mern.appspot.com/o/" +
    window.location.pathname.split("/")[2] +
    window.location.search;
  return (
    <div className="h-screen overflow-scroll mx-auto max-w-6xl">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js">
        <Viewer plugins={[defaultLayoutPluginInstance]} fileUrl={url} />
      </Worker>
    </div>
  );
};

export default Open;
