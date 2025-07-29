// src/pages/Home/index.jsx

import React, { useState, useContext } from 'react'; // Adicionado useState
import { AuthContext } from '../../App';
import { Link, useNavigate } from 'react-router-dom';

// Importar as imagens
import logoAgendaCorte from '../../assets/Home/image 4-Photoroom 2.png'; // Logo principal

// Ícones reutilizados de outras telas
import backArrowIcon from '../../assets/servicos/seta-para-a-esquerda 3.png';
import profileIcon from '../../assets/servicos/usuario-de-perfil 2.png';


function Home() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showProfilePopup, setShowProfilePopup] = useState(false); // Estado para controlar o popup

    const handleAgendarClick = () => {
        navigate('/services');
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleMyAppointments = () => {
        navigate('/meus-agendamentos');
        setShowProfilePopup(false); // Fecha o popup após navegar
    };

    const handleContact = () => {
        navigate('/contact'); // Supondo que você tenha uma rota '/contact'
        setShowProfilePopup(false); // Fecha o popup após navegar
    };

    return (
        <div style={styles.container}>
            {/* Botão de Voltar */}
            <div style={styles.backButtonContainer}>
                <Link to="/login" style={styles.backButton}> {/* Volta para a tela de Login */}
                    <img
                        src={backArrowIcon}
                        alt="Voltar"
                        style={styles.backIcon}
                    />
                </Link>
            </div>

            {/* Ícone de Perfil e Popup */}
            <div style={styles.profileContainer}>
                <img
                    src={profileIcon}
                    alt="Perfil"
                    style={styles.profileIcon}
                    onClick={() => setShowProfilePopup(!showProfilePopup)}
                />
                {showProfilePopup && (
                    <div style={styles.profilePopup}>
                        <img src={profileIcon} alt="Perfil" style={styles.popupProfileIcon} />
                        <p style={styles.popupUserName}>{user?.name || '[Nome da Conta]'}</p>
                        <p style={styles.popupUserEmail}>{user?.email || 'email@exemplo.com'}</p>
                        <div style={styles.popupDivider}></div>
                        <button onClick={handleMyAppointments} style={styles.myAppointmentsButton}>
                            Meus Agendamentos
                        </button>
                        <button onClick={handleContact} style={styles.contactButton}>
                            Contato
                        </button>
                        <button onClick={handleLogout} style={styles.logoutButton}>Deslogar</button>
                    </div>
                )}
            </div>

            {/* Conteúdo Central */}
            <div style={styles.content}>
                <img src={logoAgendaCorte} alt="Agenda Corte Barbearia Logo" style={styles.logo} />
                <p style={styles.text}>Estilo não se improvisa.</p>
                <p style={styles.text}>Agende agora.</p>
                <button
                    style={styles.button}
                    onClick={handleAgendarClick}
                >
                    Agendar
                </button>
            </div>

            {/* Rodapé (vazio por enquanto) */}
            <div style={styles.footer}>
                {/* Conteúdo futuro, se houver */}
            </div>
        </div>
    );
}

// Estilos para o componente Home
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#1a1a2e',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0px',
        boxSizing: 'border-box',
        width: '100%',
        position: 'relative', // Essencial para posicionamento absoluto dos ícones
    },
    // Removidos: header, headerIconLeft, presentationLinkRight
    
    // NOVOS ESTILOS PARA O CABEÇALHO PADRÃO
    backButtonContainer: {
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 1000,
    },
    backButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backIcon: {
        width: '32px',
        height: '32px',
        filter: 'invert(53%) sepia(91%) saturate(301%) hue-rotate(139deg) brightness(98%) contrast(101%)',
    },
    profileContainer: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        zIndex: 1000,
    },
    profileIcon: {
        width: '40px',
        height: '40px',
        cursor: 'pointer',
        borderRadius: '50%',
        backgroundColor: 'transparent',
        padding: '0',
        boxSizing: 'border-box',
    },
    profilePopup: {
        position: 'absolute',
        top: '55px',
        right: '0',
        backgroundColor: '#2e2e4e',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '220px',
        zIndex: 1000,
    },
    popupProfileIcon: {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: 'transparent',
        padding: '0',
        marginBottom: '15px',
    },
    popupUserName: {
        fontSize: '1.2em',
        fontWeight: 'bold',
        marginBottom: '5px',
        color: 'white',
    },
    popupUserEmail: {
        fontSize: '0.9em',
        color: '#aaaaaa',
        marginBottom: '15px',
    },
    popupDivider: {
        width: '80%',
        height: '1px',
        backgroundColor: '#4a4a6e',
        marginBottom: '15px',
    },
    myAppointmentsButton: {
        backgroundColor: 'transparent',
        color: '#00bcd4',
        border: '1px solid #00bcd4',
        padding: '10px 20px',
        borderRadius: '20px',
        cursor: 'pointer',
        fontSize: '1em',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease, color 0.3s ease',
        width: '100%',
        marginBottom: '10px',
    },
    contactButton: {
        backgroundColor: 'transparent',
        color: '#00bcd4',
        border: '1px solid #00bcd4',
        padding: '10px 20px',
        borderRadius: '20px',
        cursor: 'pointer',
        fontSize: '1em',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease, color 0.3s ease',
        width: '100%',
        marginBottom: '10px',
    },
    logoutButton: {
        backgroundColor: 'transparent',
        color: 'red',
        border: '1px solid red',
        padding: '10px 20px',
        borderRadius: '20px',
        cursor: 'pointer',
        fontSize: '1em',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease, color 0.3s ease',
        width: '100%',
    },
    // FIM DOS NOVOS ESTILOS DE CABEÇALHO

    content: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px',
    },
    logo: {
        maxWidth: '400px',
        height: 'auto',
        marginBottom: '30px',
    },
    text: {
        fontSize: '1.5em',
        margin: '5px 0',
    },
    button: {
        backgroundColor: '#00bcd4',
        color: 'white',
        padding: '15px 40px',
        borderRadius: '30px',
        border: 'none',
        fontSize: '1.2em',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
        marginTop: '40px',
        outline: 'none',
    },
    footer: {
        width: '100%',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

export default Home;
