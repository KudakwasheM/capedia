import React, { useState } from "react";
import axiosClient from "../axiosClient";

const Test = () => {
  const [file, setFile] = useState();

  const handleFile = (e) => {
    const pickedFile = e.target.files[0];
    setFile(pickedFile);
  };

  const addFile = async (e) => {
    e.preventDefault();
    const name = "Kudakwashe";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    await axiosClient.post("/test/send-file", formData, config).then((res) => {
      console.log(res);
    });
  };
  return (
    <div>
      <h1>Test Upload</h1>
      <div className="my-2 p-3">
        <label htmlFor="">File:</label>
        <input type="file" onChange={handleFile} />
        <input type="text" onChange={handleFile} />
        <button onClick={addFile}>Upload</button>
      </div>
    </div>
  );
};

export default Test;
