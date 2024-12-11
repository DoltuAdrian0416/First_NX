export async function VerifyUserModifications(email: string) {
    try {
        const response = await fetch(`http://localhost:5158/api/users/user/${email}`);
        
        if (response.ok) {
            return await response.json();
        }
        return null;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}
