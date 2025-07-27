// src/components/Navbar/index.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={navbarStyles.nav}>
            <div style={navbarStyles.logo}>
                {/* O logo agora é um link para a página de Usuários */}
                <Link to="/users" style={navbarStyles.logoLink}>Minha Barbearia</Link>
            </div>
            <div style={navbarStyles.navLinks}>
                <Link to="/users" style={navbarStyles.link}>Usuários</Link>
                <Link to="/services" style={navbarStyles.link}>Serviços</Link>
                <Link to="/barbers" style={navbarStyles.link}>Barbeiros</Link>
                <Link to="/appointments" style={navbarStyles.link}>Agendamentos</Link>
            </div>
            <div style={navbarStyles.userInfo}>
                {user && <span style={navbarStyles.userName}>Bem-vindo, {user.name || user.email}!</span>}
                <button onClick={handleLogout} style={navbarStyles.logoutButton}>Sair</button>
            </div>
        </nav>
    );
}

// Estilos básicos para a Navbar
const navbarStyles = {
    nav: {
        backgroundColor: '#333',
        color: 'white',
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    },
    logo: {
        fontSize: '1.5em',
        fontWeight: 'bold',
    },
    logoLink: {
        color: 'white',
        textDecoration: 'none',
    },
    navLinks: {
        display: 'flex',
        gap: '20px',
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '1.1em',
        padding: '5px 10px',
        borderRadius: '5px',
        transition: 'background-color 0.3s ease',
    },
    userInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
    },
    userName: {
        fontSize: '1em',
    },
    logoutButton: {
        backgroundColor: '#dc3545',
        color: 'white',
        padding: '8px 15px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
};
export default Navbar;