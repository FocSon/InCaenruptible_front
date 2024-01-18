import React, { useState } from 'react';
import { Button, FormControl, FormLabel, Input, Box, Heading, VStack } from '@chakra-ui/react';
import './AdminLogin.css';

import loginService from '../../services/login.service';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        await loginService.login(username, password);
    };

    const logoutCall = () => {
        loginService.logout();
    };

    if (loginService.isLoggedIn === false) {
        return (
            <main className='bodyColor'>
            <Box p={4}>
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        <FormControl id="username" isRequired>
                            <FormLabel className='filterText'>Nom d'utilisateur</FormLabel>
                            <Input  className='filterText' type="text" placeholder="Nom d'utilisateur" 
                                   value={username} onChange={(e) => setUsername(e.target.value)} />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel className='filterText'>Mot de Passe</FormLabel>
                            <Input  className='filterText' type="password" placeholder="Mot de Passe" 
                                   value={password} onChange={(e) => setPassword(e.target.value)} />
                        </FormControl>
                        <Button type="submit" colorScheme="blue" className='button-login'>Connexion</Button>
                    </VStack>
                </form>
            </Box>
        </main>
        );
    } else {
        return (
            <main className='content center-logout bodyColor'>
            <Box p={4}>
                <Heading as="h2" size="lg" mb={4} className='logout-text'>Vous êtes connecté</Heading>
                <Button colorScheme="red" className="button-logout" onClick={logoutCall}>Deconnexion</Button>
            </Box>
            </main>
        );
    }
};

export default AdminLogin;
