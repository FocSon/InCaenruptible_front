import React, {useState} from 'react';
import './CreateAlertForm.css';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    useDisclosure
} from '@chakra-ui/react';
import {requestAlert} from '../services/alert.service';

function CreateAlertForm() {
    const {isOpen, onOpen, onClose} = useDisclosure();

    const [formData, setFormData] = useState({
        category: 'city',
        title: '',
        description: '',
    });


    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.title !== '' && formData.description !== '') {
            const {
                requestId,
                token
            } = await requestAlert(formData.title, formData.description, 'video', formData.category);
            localStorage.setItem('broadcastToken', token);
            window.location.reload();
        }
        onClose(); // Close the modal after submission
    };

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    return (
        <>
            <Button colorScheme="messenger"  onClick={onOpen}>
                Créer une Alerte
            </Button>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Alerte</ModalHeader>
                    <ModalCloseButton/>
                    <form onSubmit={handleSubmit}>
                        <ModalBody pb={6}>
                            <FormControl isRequired mt={4}>
                                <FormLabel>Sujet d'Alerte</FormLabel>
                                <Select name="category" onChange={handleInputChange} value={formData.category}>
                                    <option value="city">Ville</option>
                                    <option value="company">Entreprise</option>
                                    <option value="other">Autre</option>
                                </Select>
                            </FormControl>

                            <FormControl isRequired mt={4}>
                                <FormLabel>Titre</FormLabel>
                                <Input
                                    name="title"
                                    onChange={handleInputChange}
                                    value={formData.title}
                                    placeholder="Entrez un titre pour votre alerte"
                                />
                            </FormControl>

                            <FormControl isRequired mt={4}>
                                <FormLabel>Description</FormLabel>
                                <Input
                                    name="description"
                                    onChange={handleInputChange}
                                    value={formData.description}
                                    placeholder="Entrez une description pour votre alerte"
                                />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button type="submit" colorScheme="blue" mr={3}>
                                Lancer une alerte
                            </Button>
                            <Button onClick={onClose}>Annuler</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
}

export default CreateAlertForm;
