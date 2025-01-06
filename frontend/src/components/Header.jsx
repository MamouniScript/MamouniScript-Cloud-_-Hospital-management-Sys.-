import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand href="/">Mon Application</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/patient">Patient</Nav.Link>
          <Nav.Link as={Link} to="/medecin">Médecin</Nav.Link>
          <Nav.Link as={Link} to="/rendezvous">Rendez-Vous</Nav.Link>
        </Nav>
        <div>
          <Button variant="outline-primary" as={Link} to="/login" className="me-2">Login</Button>
          <Button variant="primary" as={Link} to="/register">Register</Button>
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
