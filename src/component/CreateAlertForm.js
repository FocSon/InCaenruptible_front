import React, { useState } from "react";
import "./CreateAlertForm.css";
import {
  Modal,
  FormControl,
  useDisclosure,
  ModalBody,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Select,
  FormErrorMessage
} from "@chakra-ui/react";

function Alert(properties) {
    const { homeService } = properties;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [formData, setFormData] = useState({
    type: "video",
    category: "city",
    title: "",
    description: "",
  });



  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("passed in the Submit")
    if (formData.title !== "" && formData.description !== "") {
      homeService.createAlert(
        formData.type,
        formData.category,
        formData.title,
        formData.description
      ).then((r) => {
        // Handle response
      });
    }
    onClose(); // Close the modal after submission
  };

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  

  return (
    <>
      <Button colorScheme="messenger" onClick={onOpen}>
        Créer une Alerte
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Alerte</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody pb={6}>
              <FormControl isRequired>
                <FormLabel>Type d'Alerte</FormLabel>
                <Select name="type" onChange={handleInputChange} value={formData.type}>
                  <option value="video">Live</option>
                  <option value="co2">Taux de CO2</option>
                  <option value="sound">Niveau Sonore</option>
                </Select>
                
              </FormControl>

              <FormControl isRequired  mt={4}>
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

// function CreateAlertForm(properties) {
//   const { homeService } = properties;

//   const [formData, setFormData] = useState({
//     type: "video",
//     category: "city",
//     title: "",
//     description: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (formData.title !== "" || formData.description !== "") {
//       homeService
//         .createAlert(
//           formData.type,
//           formData.category,
//           formData.title,
//           formData.description
//         )
//         .then((r) => {});
//     }

//     setFormData({
//       type: "video",
//       category: "city",
//       title: "",
//       description: "",
//     });
//   };

//   return (
//     <div className="Home">
//       <form onSubmit={handleSubmit}>
//         <div className="form-entry">
//           <label htmlFor="type">Type</label>
//           <select
//             name="type"
//             onChange={handleChange}
//             value={formData.type}
//             className="entry"
//           >
//             <option value="video">Video</option>
//             <option value="co2">CO2 level</option>
//             <option value="sound">Sound level</option>
//           </select>
//         </div>

//         <div className="form-entry">
//           <label htmlFor="category">Type</label>
//           <select
//             name="category"
//             onChange={handleChange}
//             value={formData.category}
//             className="entry"
//           >
//             <option value="city">City</option>
//             <option value="company">Company</option>
//             <option value="other">Other</option>
//           </select>
//         </div>

//         <div className="form-entry">
//           <label htmlFor="title">Title</label>
//           <input
//             className="entry"
//             onChange={handleChange}
//             value={formData.title}
//             name="title"
//           ></input>
//         </div>

//         <div className="form-entry">
//           <label for="description">Description</label>
//           <textarea
//             className="entry"
//             onChange={handleChange}
//             value={formData.description}
//             name="description"
//           ></textarea>
//         </div>

//         <button className="form-entry" type="submit">
//           Launch an alert
//         </button>
//       </form>
//     </div>
//   );
// }

export default Alert;
