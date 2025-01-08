export async function getMenuCategories(category : string) {
  const response = await fetch(
    `http://localhost:5158/api/menu/${category}/categories`
  );

  if (response.ok) {
    return await response.json();
  }
  return response.status;
}
