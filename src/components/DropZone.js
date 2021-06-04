import React from "react";
import { useDropzone } from "react-dropzone";
import "./DropZone.css";

const maxSize = 104857600;

function MaxFileSize() {
  if (file.size > maxSize) {
    return {
      code: "size-too-large",
      message: `Size is larger than ${maxSize}`
    };
  }
  return null
}

function ImgDropZone() {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    fileRejections,
    open
  } = useDropzone({ 
    validator: MaxFileSize,
    accept: "image/*",
    noClick: true,
    noKeyboard: true });

  const acceptedFileItems = acceptedFiles.map((file) => ( 
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const rejectedFileItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));
  console.log({acceptedFileItems});
  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <div>
            {isDragAccept && (
              <p className="acceptDrop">All files will be accepted</p>
            )}
            {isDragReject && (
              <p className="rejectDrop">Some files will be rejected</p>
            )}
          </div>
        ) : (
          <div className="inactiveDrop">
            Drag 'n' drop some files here, or click to select files
            <button className="openButton" type="button" onClick={open}>
          Open File Dialog
        </button>
          </div>
        )}
      </div>
      <aside>
        <h4>Accepted files</h4>
        <ul>{acceptedFileItems}</ul>
        <h4>Rejected files</h4>
        <ul>{rejectedFileItems}</ul>
      </aside>
    </div>
  );
}
export default ImgDropZone;
