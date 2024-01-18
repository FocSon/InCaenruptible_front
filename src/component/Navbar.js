import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import logo from '../imgs/logo.png';

function Navbar() {
    return (
        <Box as="nav" display="flex" justifyContent="left" alignItems="center" p={4}>
            <Box>
                <img src={logo} alt="Logo" className='navbar-logo' />
            </Box>

            <Box display={{ base: 'none', md: 'block' }}>
                <ul>
                    <li><Link className='link' to="*">Principal</Link></li>
                    <li><Link className='link' to="/posts">Posts</Link></li>
                    <li><Link  className='link'to="/events">Evenements</Link></li>
                </ul>
            </Box>

            <Menu>
                <MenuButton as={IconButton} icon={<HamburgerIcon />} className='menuD' display={{ base: 'block', md: 'none' }} />
                <MenuList>
                    <MenuItem as={Link} to="*">Principal</MenuItem>
                    <MenuItem as={Link} to="/posts">Posts</MenuItem>
                    <MenuItem as={Link} to="/events">Evenements</MenuItem>
                </MenuList>
            </Menu>
        </Box>
    );
}

export default Navbar;
