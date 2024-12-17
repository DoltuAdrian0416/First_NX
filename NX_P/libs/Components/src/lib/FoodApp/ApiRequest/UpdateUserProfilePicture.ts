export async function updateUserProfilePicture(email: string, img: File) {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('profilePicture', img);

  const response = await fetch(
    `http://localhost:5158/updatePFP?email=${email}`,
    {
      method: 'PUT',
      body: formData,
    }
  );

  if (response.ok) {
    return response.status;
  }
  return response.status;
}
