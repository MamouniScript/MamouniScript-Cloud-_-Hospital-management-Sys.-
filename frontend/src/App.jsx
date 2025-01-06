
import Header from './components/Header';
import Medecin from './components/Medecin';
import Patient from './components/Patient';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RendezVous from './components/RendezVous';
import Login from './components/Login';
import Register from './components/Register';


function App() {
  return (
    <Router>
      {/* Envelopper l'app avec le Header */}
      <Header />

        {/* Définir les routes */}
        <Routes>
          <Route path="/patient" element={<Patient />} />
          <Route path="/medecin" element={<Medecin />} />
          <Route path="/rendezvous" element={<RendezVous />} />
          <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
        </Routes>

    </Router>
  );
}

export default App;
