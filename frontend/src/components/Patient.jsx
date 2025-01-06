import { useEffect, useState } from 'react';
import axios_client from '../config/host-app';
import { Table, Button, Modal, Form } from 'react-bootstrap';

function Patient() {
    const [listPatient, setListPatient] = useState([]);
    const [showModal, setShowModal] = useState(false); // Modal pour l'ajout
    const [showModalEdit, setShowModalEdit] = useState(false); // Modal pour l'édition
    const [formData, setFormData] = useState({
        nom: '',
        age: '',
        adresse: '',
        contact: ''
    });
    const [editData, setEditData] = useState(null); // Données pour l'édition

    // Récupérer les patients existants
    const getAllPatients = async () => {
        try {
            const response = await axios_client.get('patient/api/patient/patients');
            setListPatient(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    // Gérer l'ajout d'un nouveau patient
    const handleAddPatient = async () => {
        try {
            const patientData = {
                nom: formData.nom,
                age: formData.age,
                adresse: formData.adresse,
                contact: formData.contact
            };
            await axios_client.post('patient/api/patient/add', patientData);
            setShowModal(false); // Fermer le modal après ajout
            getAllPatients(); // Rafraîchir la liste des patients
        } catch (err) {
            console.error(err);
        }
    };

    // Gérer la modification d'un patient
    const handleEditPatient = async () => {
        try {
            const patientData = {
                nom: editData.nom,
                age: editData.age,
                adresse: editData.adresse,
                contact: editData.contact
            };
            await axios_client.post(`patient/api/patient/update/${editData.id}`, patientData);
            setShowModalEdit(false); // Fermer le modal après modification
            getAllPatients(); // Rafraîchir la liste des patients
        } catch (err) {
            console.error(err);
        }
    };

    // Gérer la suppression d'un patient
    const handleDelete = async (id) => {
        try {
            await axios_client.delete(`patient/api/patient/delete/${id}`);
            getAllPatients(); // Rafraîchir la liste après suppression
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
    const handleEditModalOpen = (patient) => {
        setEditData({
            id: patient.id,
            nom: patient.nom,
            age: patient.age,
            adresse: patient.adresse,
            contact: patient.contact
        });
        setShowModalEdit(true); // Afficher le modal d'édition
    };

    useEffect(() => {
        getAllPatients();
    }, []);

    return (
        <div className="container">
            <h2 className="mt-4 mb-3">Patients</h2>
            <Button variant="primary" onClick={() => setShowModal(true)}>
                Ajouter un Patient
            </Button>
            <Table striped bordered hover responsive className="mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Age</th>
                        <th>Adresse</th>
                        <th>Contact</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listPatient.map((patient) => (
                        <tr key={patient.id}>
                            <td>{patient.id}</td>
                            <td>{patient.nom}</td>
                            <td>{patient.age}</td>
                            <td>{patient.adresse}</td>
                            <td>{patient.contact}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEditModalOpen(patient)}>
                                    Edit
                                </Button>
                                <Button variant="danger" onClick={() => handleDelete(patient.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal pour ajouter un nouveau patient */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter un Patient</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formNom">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control
                                type="text"
                                name="nom"
                                value={formData.nom}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formAge" className="mt-3">
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formAdresse" className="mt-3">
                            <Form.Label>Adresse</Form.Label>
                            <Form.Control
                                type="text"
                                name="adresse"
                                value={formData.adresse}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formContact" className="mt-3">
                            <Form.Label>Contact</Form.Label>
                            <Form.Control
                                type="text"
                                name="contact"
                                value={formData.contact}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Fermer
                    </Button>
                    <Button variant="primary" onClick={handleAddPatient}>
                        Ajouter
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal pour éditer un patient */}
            <Modal show={showModalEdit} onHide={() => setShowModalEdit(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Éditer un Patient</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formNom">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control
                                type="text"
                                name="nom"
                                value={editData?.nom || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formAge" className="mt-3">
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type="number"
                                name="age"
                                value={editData?.age || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formAdresse" className="mt-3">
                            <Form.Label>Adresse</Form.Label>
                            <Form.Control
                                type="text"
                                name="adresse"
                                value={editData?.adresse || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formContact" className="mt-3">
                            <Form.Label>Contact</Form.Label>
                            <Form.Control
                                type="text"
                                name="contact"
                                value={editData?.contact || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModalEdit(false)}>
                        Fermer
                    </Button>
                    <Button variant="primary" onClick={handleEditPatient}>
                        Enregistrer les modifications
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Patient;
