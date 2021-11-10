import React from 'react';
import Fade from 'react-reveal/Fade';
import { IoChevronBack } from 'react-icons/io5';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { displayToast } from '../util/Toast'
import { FetchAPI } from '../util/FetchAPI';
import BasicInfo from '../components/CreateEditListing/BasicInfo';
import Bedrooms from '../components/CreateEditListing/Bedrooms';
import Amenities from '../components/CreateEditListing/Amenities';
import ImageUpload from '../components/CreateEditListing/ImageUpload';
import { prepareForSubmit } from '../util/CreateEditListing';

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [amenities, setAmenities] = React.useState([])
  const [image, setImage] = React.useState('');
  const [bedrooms, setBedrooms] = React.useState([{ title: '', count: 0 }])

  // fetch existing fields on listing
  const [formData, setFormData] = React.useState({})
  React.useEffect(async () => {
    const response = await FetchAPI(`/listings/${id}`, 'GET', '', '');
    console.log(response);
    switch (response.status) {
      case 400:
        displayToast('Could not open listing to edit', 'error')
        break;
      case 200: {
        const listing = response.data.listing
        if (JSON.stringify(listing) === '{}') {
          displayToast('Could not find listing', 'error')
          navigate('/hosted-listings')
          return;
        }
        setFormData(listing)
        setImage(listing.thumbnail)
        setBedrooms(listing.metadata.bedrooms)
        setAmenities(listing.metadata.amenities)
        break;
      }
      default:
        displayToast('Something went wrong!', 'error');
    }
  }, [])

  // update listing in server
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target
    form.checkValidity()

    const body = prepareForSubmit(image, form, amenities, bedrooms, displayToast)
    if (body === false) return

    const response = await FetchAPI(`/listings/${id}`, 'PUT', body, JSON.parse(localStorage.getItem('token')));
    console.log(response);
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
        <BasicInfo formData={formData} setFormData={setFormData}/>
        <Bedrooms bedrooms={bedrooms} setBedrooms={setBedrooms}/>
        <Amenities amenities={amenities} setAmenities={setAmenities}/>
        <ImageUpload image={image} setImage={setImage}/>
        <button className="p-2 mt-3 bg-red-400 rounded-lg text-white font-medium shadow-lg hover:bg-red-500">Edit listing</button>
      </form>
      </div>
    </Fade>
    }
    </>
  );
}

export default EditListing;
