export const prepareForSubmit = (
  image,
  form,
  amenities,
  bedrooms,
  displayToast
) => {
  if (image === '') {
    displayToast('No photo was found', 'error');
    return false;
  }

  const body = {
    title: form.title.value,
    address: {
      street: form.street.value,
      city: form.city.value,
    },
    price: parseInt(form.price.value),
    thumbnail: image,
    metadata: {
      bathrooms: parseInt(form.bathrooms.value),
      amenities: amenities,
      bedrooms: bedrooms,
      type: form.propertyType.value,
    },
  };
  return body;
};
