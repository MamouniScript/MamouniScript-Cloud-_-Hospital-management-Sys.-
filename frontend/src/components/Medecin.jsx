import { useEffect, useState } from 'react';
import axios_client from '../config/host-app';
import { Table, Button, Modal, Form } from 'react-bootstrap';

function Medecin() {
    const [listMedecin, setListMedecin] = useState([]);
    const [showModal, setShowModal] = useState(false); // Modal pour l'ajout
    const [showModalEdit, setShowModalEdit] = useState(false); // Modal pour l'édition
    const [formData, setFormData] = useState({
        nom: '',
        specialite: '',
        contact: ''
    });
    const [editData, setEditData] = useState(null); // Données pour l'édition

    // Récupérer les médecins existants
    const getAllMedecins = async () => {
        try {
            const response = await axios_client.get('api/medecin/medecins');
            setListMedecin(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    // Gérer l'ajout d'un nouveau médecin
    const handleAddMedecin = async () => {
        try {
            const medecinData = {
                nom: formData.nom,
                specialite: formData.specialite,
                contact: formData.contact
            };
            await axios_client.post('api/medecin/add', medecinData);
            setShowModal(false); // Fermer le modal après ajout
            getAllMedecins(); // Rafraîchir la liste des médecins
        } catch (err) {
            console.error(err);
        }
    };

    // Gérer la modification d'un médecin
    const handleEditMedecin = async () => {
        try {
            const medecinData = {
                nom: editData.nom,
                specialite: editData.specialite,
                contact: editData.contact
            };
            await axios_client.post(`/api/medecin/update/${editData.id}`, medecinData);
            setShowModalEdit(false); // Fermer le modal après modification
            getAllMedecins(); // Rafraîchir la liste des médecins
        } catch (err) {
            console.error(err);
        }
    };

    // Gérer la suppression d'un médecin
    const handleDelete = async (id) => {
        try {
            await axios_client.delete(`api/medecin/delete/${id}`);
            getAllMedecins(); // Rafraîchir la liste après suppression
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
    const handleEditModalOpen = (medecin) => {
        setEditData({
            id: medecin.id,
            nom: medecin.nom,
            specialite: medecin.specialite,
            contact: medecin.contact
        });
        setShowModalEdit(true); // Afficher le modal d'édition
    };

    useEffect(() => {
        getAllMedecins();
    }, []);

    return (
        <div className="container">
            <h2 className="mt-4 mb-3">Médecins</h2>
            <Button variant="primary" onClick={() => setShowModal(true)}>
                Ajouter un Médecin
            </Button>
            <Table striped bordered hover responsive className="mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Spécialité</th>
                        <th>Contact</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listMedecin.map((medecin) => (
                        <tr key={medecin.id}>
                            <td>{medecin.id}</td>
                            <td>{medecin.nom}</td>
                            <td>{medecin.specialite}</td>
                            <td>{medecin.contact}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEditModalOpen(medecin)}>
                                    Modifier
                                </Button>
                                <Button variant="danger" onClick={() => handleDelete(medecin.id)}>
                                    Supprimer
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal pour ajouter un nouveau médecin */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter un Médecin</Modal.Title>
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
                        <Form.Group controlId="formSpecialite" className="mt-3">
                            <Form.Label>Spécialité</Form.Label>
                            <Form.Control
                                type="text"
                                name="specialite"
                                value={formData.specialite}
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
                    <Button variant="primary" onClick={handleAddMedecin}>
                        Ajouter
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal pour éditer un médecin */}
            <Modal show={showModalEdit} onHide={() => setShowModalEdit(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Éditer un Médecin</Modal.Title>
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
                        <Form.Group controlId="formSpecialite" className="mt-3">
                            <Form.Label>Spécialité</Form.Label>
                            <Form.Control
                                type="text"
                                name="specialite"
                                value={editData?.specialite || ''}
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
                    <Button variant="primary" onClick={handleEditMedecin}>
                        Enregistrer les modifications
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Medecin;
