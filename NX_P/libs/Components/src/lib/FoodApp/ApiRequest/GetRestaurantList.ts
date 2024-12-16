export async function GetRestaurantList() {
  const response = await fetch(
    'http://localhost:5158/api/menu/with-item-count'
  );

  if (response.ok) {
    return await response.json();
  }
  return response.status;
}
