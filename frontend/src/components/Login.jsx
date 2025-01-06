import { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import loginUser from '../config/loginUser';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    
      await loginUser(email, password);
      console.log('Connexion réussie');
      navigate('/patient');
    
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Connexion</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}

        <Button variant="primary" type="submit" className="w-100">
          Se connecter
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
