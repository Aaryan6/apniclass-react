import React from "react";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useLocation } from "react-router-dom";

const Open = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const location = useLocation();
  const url = location.state.url;
  return (
    <div className="h-screen overflow-scroll mx-auto max-w-6xl">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js">
        <Viewer plugins={[defaultLayoutPluginInstance]} fileUrl={url} />
      </Worker>
    </div>
  );
};

export default Open;
