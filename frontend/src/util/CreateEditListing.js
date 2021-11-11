export const prepareForSubmit = (
  images,
  form,
  amenities,
  bedrooms,
  displayToast
) => {
  if (images.length === 0) {
    displayToast('No photos were found', 'error');
    return false;
  }

  const body = {
    title: form.title.value,
    address: {
      street: form.street.value,
      city: form.city.value,
    },
    price: parseInt(form.price.value),
    thumbnail: images[0],
    metadata: {
      bathrooms: parseInt(form.bathrooms.value),
      amenities: amenities,
      bedrooms: bedrooms,
      type: form.propertyType.value,
      gallery: images.slice(1),
    },
  };
  return body;
};
