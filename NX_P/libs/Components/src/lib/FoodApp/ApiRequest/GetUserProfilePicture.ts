export async function getUserProfilePicture(email: string) {
    
    const response = await fetch(`http://localhost:5158/api/users/user/profilePicture/${encodeURIComponent(email)}`);

    if (response.ok) {
       return await response.json();
    }
    return response.status;
}
