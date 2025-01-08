export async function getMenuItemByCategory(category : string , menuName: string) {
  const response = await fetch(
    `http://localhost:5158/api/menu/${menuName}/${category}/items`
  );

  if (response.ok) {
    return await response.json();
  }
  return response.status;
}
