import React from 'react';
import Fade from 'react-reveal/Fade';
import { IoChevronBack } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { displayToast } from '../util/Toast'
import { FetchAPI } from '../util/FetchAPI';
import ImageUpload from '../components/CreateEditListing/ImageUpload';
import Amenities from '../components/CreateEditListing/Amenities';
import Bedrooms from '../components/CreateEditListing/Bedrooms';
import BasicInfo from '../components/CreateEditListing/BasicInfo';
import { prepareForSubmit } from '../util/CreateEditListing';

const CreateListing = () => {
  const navigate = useNavigate();
  const [amenities, setAmenities] = React.useState(amenityList)
  const [bedrooms, setBedrooms] = React.useState([{ title: '', count: 0 }])
  const [image, setImage] = React.useState('');
  const [formData, setFormData] = React.useState({ address: {}, metadata: {} })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target
    form.checkValidity()

    const body = prepareForSubmit(image, form, amenities, bedrooms, displayToast)
    if (body === false) return;

    const response = await FetchAPI('/listings/new', 'POST', body, JSON.parse(localStorage.getItem('token')));
    switch (response.status) {
      case 400:
        displayToast('Could not create listing', 'error')
        break;
      case 200:
        displayToast('Successfully created listing', 'success')
        navigate('/hosted-listings')
        break;
      default:
        displayToast('Something went wrong!', 'error');
    }
  }

  return (
    <Fade>
      <div className="flex flex-col w-full 2xl:w-1/2 max-w-2xl ">
      <div className="flex items-center gap-2">
        <Link to="/hosted-listings">
          <IoChevronBack/>
        </Link>
        <div className="text-3xl font-medium  text-gray-700">
          New Listing
        </div>
      </div>
      <form onSubmit={handleSubmit} action="" className="flex flex-col pt-7 gap-5">
        <BasicInfo formData={formData} setFormData={setFormData}/>
        <Bedrooms bedrooms={bedrooms} setBedrooms={setBedrooms}/>
        <Amenities amenities={amenities} setAmenities={setAmenities} />
        <ImageUpload image={image} setImage={setImage}/>
        <button className="p-2 mt-3 bg-red-400 rounded-lg text-white font-medium shadow-lg hover:bg-red-500">Add listing</button>
      </form>
      </div>

    </Fade>
  );
}

export default CreateListing;

const amenityList = [{ text: 'Kitchen', isChecked: false },
  { text: 'Washer', isChecked: false },
  { text: 'Air Conditioning', isChecked: false },
  { text: 'Heating', isChecked: false },
  { text: 'TV', isChecked: false },
  { text: 'Free Parking', isChecked: false },
  { text: 'Free Wifi', isChecked: false },
  { text: 'Waterfront', isChecked: false },
  { text: 'Bat Cave', isChecked: false }]
