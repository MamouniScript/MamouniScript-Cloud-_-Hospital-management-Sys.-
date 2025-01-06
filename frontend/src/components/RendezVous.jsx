import { useEffect, useState } from 'react';
import axios_client from '../config/host-app';
import { Table, Button, Modal, Form } from 'react-bootstrap';

function RendezVous() {
    const [listRendezVous, setListRendezVous] = useState([]);
    const [showModal, setShowModal] = useState(false); // Modal pour l'ajout
    const [showModalEdit, setShowModalEdit] = useState(false); // Modal pour l'édition
    const [patients, setPatients] = useState([]); // Liste des patients
    const [medecins, setMedecins] = useState([]); // Liste des médecins
    const [formData, setFormData] = useState({
        id_patient: null,
        id_medecin: null,
        date: '',
        heure: ''
    });
    const [editData, setEditData] = useState(null); // Données pour l'édition

    // Récupérer les rendez-vous existants
    const getAllRendezVouss = async () => {
        try {
            const response = await axios_client.get('rendez-vous/api/rendezVous/rendezVouss');
            setListRendezVous(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    // Récupérer les patients et les médecins
    const getPatientsAndMedecins = async () => {
        try {
            const patientsResponse = await axios_client.get('patient/api/patient/patients');
            const medecinsResponse = await axios_client.get('medecin/api/medecin/medecins');
            setPatients(patientsResponse.data);
            setMedecins(medecinsResponse.data);
        } catch (err) {
            console.error(err);
        }
    };

    // Gérer l'ajout d'un nouveau rendez-vous
    const handleAddRendezVous = async () => {
        try {
            const rendezVousData = {
                id_patient: formData.id_patient, // PatientDTO
                id_medecin: formData.id_medecin, // MedecinDTO
                date: formData.date,
                heure: `${formData.heure}:00`
            };
            console.log(rendezVousData)
            await axios_client.post('rendez-vous/api/rendezVous/add', rendezVousData);
            setShowModal(false); // Fermer la popup après ajout
            getAllRendezVouss(); // Rafraîchir la liste des rendez-vous
        } catch (err) {
            console.error(err);
        }
    };

    // Gérer la modification d'un rendez-vous
    const handleEditRendezVous = async () => {
        try {
            const rendezVousData = {
                id_patient: editData.id_patient,
                id_medecin: editData.id_medecin,
                date: editData.date,
                heure: `${editData.heure}`
            };
            console.log(rendezVousData)
            await axios_client.post(`rendez-vous/api/rendezVous/update/${editData.id}`, rendezVousData);
            setShowModalEdit(false); // Fermer le modal après modification
            getAllRendezVouss(); // Rafraîchir la liste des rendez-vous
        } catch (err) {
            console.error(err);
        }
    };

    // Gérer la suppression d'un rendez-vous
    const handleDelete = async (id) => {
        try {
            await axios_client.delete(`rendez-vous/api/rendezVous/delete/${id}`);
            getAllRendezVouss(); // Rafraîchir la liste après suppression
        } catch (err) {
            console.error(err);
        }
    };

    // Gérer les changements dans le formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (editData) {
            setEditData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    // Initialiser les données du formulaire pour l'édition
    // Initialiser les données du formulaire pour l'édition
const handleEditModalOpen = (rendezvous) => {
    const formattedDate = new Date(rendezvous.date).toISOString().split('T')[0]; // Formater la date au format YYYY-MM-DD
    setEditData({
        id: rendezvous.id,
        id_patient: rendezvous.id_patient,
        id_medecin: rendezvous.id_medecin,
        date: formattedDate,  // Mettre la date formatée
        heure: rendezvous.heure
    });
    setShowModalEdit(true); // Afficher le modal d'édition
};


    useEffect(() => {
        getAllRendezVouss();
        getPatientsAndMedecins();
    }, []);

    return (
        <div className="container">
            <h2 className="mt-4 mb-3">RendezVous</h2>
            <Button variant="primary" onClick={() => setShowModal(true)}>
                Ajouter un Rendez-vous
            </Button>
            <Table striped bordered hover responsive className="mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Patient</th>
                        <th>Médecin</th>
                        <th>Date</th>
                        <th>Heure</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listRendezVous.map((rendezvous) => {
                        const patient = patients.find(p => p.id === rendezvous.id_patient); 
                        const medecin = medecins.find(m => m.id === rendezvous.id_medecin); 

                        return (
                            <tr key={rendezvous.id}>
                                <td>{rendezvous.id}</td>
                                <td>{patient ? patient.nom : 'Inconnu'}</td>
                                <td>{medecin ? medecin.nom : 'Inconnu'}</td>
                                <td>{rendezvous.date}</td>
                                <td>{rendezvous.heure}</td>
                                <td>
                                    <Button variant="warning" onClick={() => handleEditModalOpen(rendezvous)}>
                                        Edit
                                    </Button>
                                    <Button variant="danger" onClick={() => handleDelete(rendezvous.id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            {/* Modal pour ajouter un nouveau rendez-vous */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter un Rendez-vous</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formPatient">
                            <Form.Label>Choisir un Patient</Form.Label>
                            <Form.Control
                                as="select"
                                name="id_patient"
                                value={formData.id_patient}
                                onChange={handleChange}
                            >
                                <option value="">Sélectionner un patient</option>
                                {patients.map((patient) => (
                                    <option key={patient.id} value={patient.id}>
                                        {patient.nom}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formMedecin" className="mt-3">
                            <Form.Label>Choisir un Médecin</Form.Label>
                            <Form.Control
                                as="select"
                                name="id_medecin"
                                value={formData.id_medecin}
                                onChange={handleChange}
                            >
                                <option value="">Sélectionner un médecin</option>
                                {medecins.map((medecin) => (
                                    <option key={medecin.id} value={medecin.id}>
                                        {medecin.nom}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formDate" className="mt-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formTime" className="mt-3">
                            <Form.Label>Heure</Form.Label>
                            <Form.Control
                                type="time"
                                name="heure"
                                value={formData.heure}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Fermer
                    </Button>
                    <Button variant="primary" onClick={handleAddRendezVous}>
                        Ajouter
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal pour éditer un rendez-vous */}
            <Modal show={showModalEdit} onHide={() => setShowModalEdit(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Éditer un Rendez-vous</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formPatient">
                            <Form.Label>Choisir un Patient</Form.Label>
                            <Form.Control
                                as="select"
                                name="id_patient"
                                value={editData?.id_patient || ''}
                                onChange={handleChange}
                            >
                                <option value="">Sélectionner un patient</option>
                                {patients.map((patient) => (
                                    <option key={patient.id} value={patient.id}>
                                        {patient.nom}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formMedecin" className="mt-3">
                            <Form.Label>Choisir un Médecin</Form.Label>
                            <Form.Control
                                as="select"
                                name="id_medecin"
                                value={editData?.id_medecin || ''}
                                onChange={handleChange}
                            >
                                <option value="">Sélectionner un médecin</option>
                                {medecins.map((medecin) => (
                                    <option key={medecin.id} value={medecin.id}>
                                        {medecin.nom}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formDate" className="mt-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={editData?.date || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formTime" className="mt-3">
                            <Form.Label>Heure</Form.Label>
                            <Form.Control
                                type="time"
                                name="heure"
                                value={editData?.heure || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModalEdit(false)}>
                        Fermer
                    </Button>
                    <Button variant="primary" onClick={handleEditRendezVous}>
                        Enregistrer les modifications
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default RendezVous;
