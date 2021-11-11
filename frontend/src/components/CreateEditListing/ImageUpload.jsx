import React, { useCallback } from 'react';
import { AiFillFolderOpen, AiFillFolder, AiFillMinusCircle } from 'react-icons/ai'
import { useDropzone } from 'react-dropzone';
import { convertToBase64 } from '../../util/Image';
import PropTypes from 'prop-types';

function ImageUpload ({ images, setImages }) {
  const [imgWarning, setImgWarning] = React.useState(false)

  // drag and drop image
  const onDrop = useCallback(async acceptedFiles => {
    // TODO: allow mulitple file upload
    const base64File = await convertToBase64(acceptedFiles[0])
    if (base64File !== false) {
      // setImage(base64File);
      setImgWarning(false);
      setImages((images) => [...images, base64File])
    } else setImgWarning(true)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const removeImage = (index) => {
    const imagesClone = [...images]
    imagesClone.splice(index, 1)
    setImages(imagesClone)
  }

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
      {images.length !== 0 &&
        <div>
          <p className="text-gray-500 text-sm mb-2">Preview</p>
          <div className="grid grid-cols-3 gap-3">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img src={image} className="object-cover w-full h-full rounded-lg shadow"/>
                <AiFillMinusCircle className="text-white text-lg absolute top-1 right-1 hover:text-red-300 cursor-pointer"
                  onClick={() => removeImage(index)}/>
              </div>))
            }
          </div>
        </div>}
    </>
  )
}

export default ImageUpload

ImageUpload.propTypes = {
  images: PropTypes.array,
  setImages: PropTypes.array
}
