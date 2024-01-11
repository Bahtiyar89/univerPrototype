import React, { useState } from "react";
import axios from "axios";
import { CButton, CFormInput } from "@coreui/react-pro";

const UploadFilePage = () => {
  const [items, setItems] = useState(undefined);

  const handleChange = (event) => {
    console.log("ddd: ", event.target.files[0]);
    setItems(event.target.files[0]);
  };

  const handleClick = () => {
    const formData = new FormData();
    formData.append("RecFile", items);

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/upload-file/",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        console.log("response", response);
      })
      .catch(function (response) {
        //handle error
        console.log("err,", response);
      });
  };
  return (
    <>
      <div className="mb-3">
        <CFormInput
          onChange={handleChange}
          type="file"
          id="formFile"
          label="Загрузка файла LAS либо CSV "
        />

        <CButton
          style={{ marginTop: 20 }}
          onClick={handleClick}
          color="success"
        >
          Success
        </CButton>
      </div>
    </>
  );
};

export default UploadFilePage;
