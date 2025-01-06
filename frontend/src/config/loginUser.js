import axios_client from "./host-app";


async function loginUser(email, password) {
  
  try {
    const response = await axios_client.post('/api/auth/authenticate', {
      email,
      password,
    });
    const { token } = response.data;

    // Sauvegarder le token dans localStorage
    localStorage.setItem('token', token);

    console.log('Login réussi, token sauvegardé :', token);
    return token;
  } catch (error) {
    console.error('Erreur lors de la tentative de connexion :', error.response?.data || error.message);
    throw error;
  }
}

export default loginUser;
