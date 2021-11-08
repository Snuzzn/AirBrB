import React, { useCallback } from 'react';
import Fade from 'react-reveal/Fade';
import { IoChevronBack } from 'react-icons/io5';
import { BsCurrencyDollar, BsPlusCircle } from 'react-icons/bs';
import { MdOutlineShower, MdOutlineHome } from 'react-icons/md';
import { AiFillFolderOpen, AiFillFolder } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { useDropzone } from 'react-dropzone';
import { convertToBase64 } from '../util/Image';
import { displayToast } from '../util/Toast'
import { FetchAPI } from '../util/FetchAPI';

const EditListing = () => {
  const navigate = useNavigate();

  const [amenities, setAmenities] = React.useState([])
  const [image, setImage] = React.useState('');
  // drag and drop image
  const onDrop = useCallback(async acceptedFiles => {
    const base64File = await convertToBase64(acceptedFiles[0])
    if (base64File !== false) {
      setImage(base64File); setImgWarning(false);
    } else setImgWarning(true)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  const [imgWarning, setImgWarning] = React.useState(false)

  // bedrooms
  const [bedrooms, setBedrooms] = React.useState([{ title: '', count: 0 }])
  const handleBedroomChange = (e, index, isTitle) => {
    const input = e.target.value
    const old = [...bedrooms]
    if (isTitle) old[index].title = input
    else old[index].count = input
    setBedrooms(old)
  }

  const changeAmenities = (index) => {
    const copy = [...amenities]
    copy[index].isChecked = !copy[index].isChecked;
    setAmenities(copy)
  }

  // fetch existing listing data
  const [formData, setFormData] = React.useState({})
  React.useEffect(async () => {
    const response = await FetchAPI('/listings/593309487', 'GET', '', '');
    const listing = response.data.listing
    setFormData(listing)
    setImage(listing.thumbnail)
    setBedrooms(listing.metadata.bedrooms)
    setAmenities(listing.metadata.amenities)
  }, [])

  // update listing in server
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target
    form.checkValidity()

    if (image === '') {
      displayToast('No photo was found', 'error')
      return;
    }

    const body = {
      title: form.title.value,
      address: form.address.value,
      price: parseInt(form.price.value),
      thumbnail: image,
      metadata: {
        type: form.propertyType.value,
        bathrooms: parseInt(form.bathrooms.value),
        amenities: amenities,
        bedrooms: bedrooms
      }
    }
    const response = await FetchAPI('/listings/593309487', 'PUT', body, JSON.parse(localStorage.getItem('token')));
    switch (response.status) {
      case 400:
        displayToast('Could not edit listing', 'error')
        break;
      case 200:
        displayToast('Successfully edited listing', 'success')
        navigate('/hosted-listings')
        break;
      default:
        displayToast('Something went wrong!', 'error');
    }
  }

  return (
    <>
    { JSON.stringify(formData) !== '{}' &&
    <Fade>
      <div className="flex flex-col w-full 2xl:w-1/2 max-w-2xl ">
      <div className="flex items-center gap-2">
        <Link to="/hosted-listings">
          <IoChevronBack/>
        </Link>
        <div className="text-3xl font-medium  text-gray-700">
          Edit Listing
        </div>
      </div>
      <form onSubmit={handleSubmit} action="" className="flex flex-col pt-7 gap-5">
        {/* Title */}
        <div className="flex flex-col gap-1 justify-center">
          <label>Title</label>
          <input type="text" value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })} name="title"
            required className="p-2 border border-gray-300 rounded-lg" />
        </div>
        {/* Address */}
        <div className="flex flex-col gap-1 justify-center">
          <label>Address</label>
          <input type="text" name="address" value={ formData.address }
            onChange={(e) => setFormData({ ...formData, address: e.target.value })} required
            className="p-2 border border-gray-300 rounded-lg" />
        </div>
        {/* Property type, price, bathrooms */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          <div className="relative flex flex-col gap-1 justify-center">
            <label>Property Type</label>
            <span className="absolute mt-7 ml-2"><MdOutlineHome className="text-gray-400"/></span>
            <select name="propertyType" required value={ formData.metadata.type }
              onChange={(e) => setFormData({ ...formData, metadata: { ...formData.metadata, type: e.target.value } })}
              className="p-2 pl-7 border bg-white border-gray-300 rounded-lg" >
              <option value="Entire Place">Entire Place</option>
              <option value="Private Room">Private Room</option>
              <option value="Shared Room">Shared Room</option>
            </select>
          </div>
          <div className="relative flex flex-col gap-1 justify-center">
            <label>Price (per night)</label>
            <span className="absolute mt-7 ml-2"><BsCurrencyDollar className="text-gray-400"/></span>
            <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required name="price" className="p-2 pl-7 border border-gray-300 rounded-lg" />
          </div>
          <div className="relative flex flex-col gap-1 justify-center">
            <label>Bathrooms</label>
            <span className="absolute mt-7 ml-2"><MdOutlineShower className="text-gray-400"/></span>
            <input type="number" required name="bathrooms" value={ formData.metadata.bathrooms }
              onChange={(e) => setFormData({ ...formData, metadata: { ...formData.metadata, bathrooms: e.target.value } })}
              className="p-2 pl-7 border border-gray-300 rounded-lg" />
          </div>
        </div>
        {/* Bedrooms */}
        <div className="flex flex-col gap-2 justify-center">
          <div className="flex items-center gap-3 mb-2">
            <label>Bedrooms</label>
            <BsPlusCircle onClick={() => setBedrooms([...bedrooms, { title: '', count: 0 }])} className=" text-red-400 cursor-pointer hover:text-red-500" />
          </div>
          {bedrooms.map((item, index) => (
            <div key={index} className="flex gap-5 items-center ">
              <div className="flex flex-col gap-1 justify-center">
                <label className="text-sm text-gray-600">Name</label>
                <input type="text" value={bedrooms[index].title} onChange={(e) => handleBedroomChange(e, index, true)} required className="p-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="flex flex-col gap-1 justify-center">
                <label className="text-sm text-gray-600">No. of beds</label>
                <input type="number" value={bedrooms[index].count} onChange={(e) => handleBedroomChange(e, index, false)} required className="p-2 border border-gray-300 rounded-lg w-24" />
              </div>
            </div>
          ))}
        </div>
        {/* Amenities */}
        <div className="flex flex-col gap-1 justify-center">
          <label>Amenities</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <IconContext.Provider value={{ color: '#8f8f9c' }}>
              {amenities.map((item, index) => (
              <div key={item.text} className="flex gap-4 items-center">
                <input type="checkbox" checked={amenities[index].isChecked}
                  onChange={(e) => changeAmenities(index)} name="amenities" value={item.text} className="cursor-pointer" id={item.text} />
                <div className="flex gap-2 items-center">
                  <label htmlFor={item.text} className="text-gray-500 cursor-pointer">{item.text}</label>
                  {item.icon}
                </div>
              </div>))}
            </IconContext.Provider>
          </div>
        </div>
        {/* Drag n Drop */}
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

        <button className="p-2 mt-3 bg-red-400 rounded-lg text-white font-medium shadow-lg hover:bg-red-500">Add listing</button>
      </form>
      </div>
    </Fade>
    }
    </>
  );
}

export default EditListing;
