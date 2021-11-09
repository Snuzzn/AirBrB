import React, { useCallback } from 'react';
import { AiFillFolderOpen, AiFillFolder } from 'react-icons/ai'
import { useDropzone } from 'react-dropzone';
import { convertToBase64 } from '../../util/Image';
import PropTypes from 'prop-types';

function ImageUpload ({ image, setImage }) {
  // drag and drop image
  const onDrop = useCallback(async acceptedFiles => {
    const base64File = await convertToBase64(acceptedFiles[0])
    if (base64File !== false) {
      setImage(base64File); setImgWarning(false);
    } else setImgWarning(true)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  const [imgWarning, setImgWarning] = React.useState(false)

  return (
    <>
      <div className="flex flex-col gap-1 justify-center">
        <label>Photo Thumbnail</label>
        <div {...getRootProps()} className="flex flex-col items-center justify-center p-3 h-50 rounded-lg border-2 border-dashed border-blue-200  bg-blue-50">
          { isDragActive ? <AiFillFolderOpen size="3em" className="text-blue-400"/> : <AiFillFolder size="3em" className="text-blue-200"/> }
          <p className="text-sm text-gray-500">Drag and drop file here</p>
          <p className="text-sm my-2 text-gray-400">OR</p>
          <button type="button" className="p-2 px-4 text-sm bg-blue-400 shadow-md hover:bg-blue-500 rounded-lg text-white">
            Browse Files<input {...getInputProps()} /></button>
        </div>
      </div>
      {imgWarning && <p className="text-red-600">Image type must be <b>png</b> or <b>jpeg</b> or <b>gif</b>.</p>}
      {image !== '' && <div><p className="text-gray-500 text-sm mb-2">Preview</p><img src={image} className="w-1/2 "/></div>}
    </>
  )
}

export default ImageUpload

ImageUpload.propTypes = {
  image: PropTypes.string,
  setImage: PropTypes.string
}
