export async function updateMenuItem(
  relatedRestaurant: string,
  menuItemId: string,
  productName: string,
  category: string,
  productDescription: string,
  productPrice: string,
  productImage: File
) {
  const formData = new FormData();
  formData.append('Name', productName);
  formData.append('Description', productDescription);
  formData.append('Category' , category);
  formData.append('Price', productPrice);
  formData.append('ProductImage', productImage);


  const response = await fetch(
    `http://localhost:5158/api/menu/updateMenu/${relatedRestaurant}/${menuItemId}`,
    {
      method: 'PUT',
      body: formData,
    }
  );

  return response;
}