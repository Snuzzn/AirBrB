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
    address: form.address.value,
    price: parseInt(form.price.value),
    thumbnail: image,
    type: form.propertyType.value,
    metadata: {
      bathrooms: parseInt(form.bathrooms.value),
      amenities: amenities,
      bedrooms: bedrooms,
    },
  };
  return body;
};
