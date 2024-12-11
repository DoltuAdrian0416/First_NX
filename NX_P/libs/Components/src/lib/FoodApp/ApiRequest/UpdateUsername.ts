export async function UpdateUsername(email: string, username:string) {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('username', username);

    const response = await fetch(`http://localhost:5158/updateUsername?email=${email}`, {
        method: 'PUT',
        body: formData,
    });

    if (response.ok) {
       return response.status;
    }
    return response.status;
}
