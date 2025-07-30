// src/pages/Home/index.jsx

import React, { useState, useContext } from 'react';
import { AuthContext } from '../../App';
import { Link, useNavigate } from 'react-router-dom'; // Garante que useNavigate está importado

// Importar as imagens
import logoAgendaCorte from '../../assets/Home/image 4-Photoroom 2.png'; // Logo principal do conteúdo
import logoPrincipal from '../../assets/apresentacao/image 4-Photoroom 2.png'; // Logo para o footer (do apresentacao)

// Ícones reutilizados de outras telas e de Apresentacao
import backArrowIcon from '../../assets/servicos/seta-para-a-esquerda 3.png'; // Seta de voltar
import profileIcon from '../../assets/servicos/usuario-de-perfil 2.png'; // Ícone de perfil


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
            {/* Header com botões de voltar e suporte (estilo Apresentacao) */}
            <header style={styles.header}>
                {/* Botão de Voltar - Agora usa navigate(-1) */}
                <button onClick={() => navigate(-1)} style={styles.headerIconButton}>
                    <img src={backArrowIcon} alt="Voltar" style={styles.headerIcon} />
                </button>

                {/* Ícone de Perfil e Popup - Agora dentro do header */}
                <div style={styles.profileContainerHeader}> {/* Novo container para o perfil dentro do header */}
                    <img
                        src={profileIcon}
                        alt="Perfil"
                        style={styles.profileIconHeader} 
                        onClick={() => setShowProfilePopup(!showProfilePopup)}
                    />
                    {showProfilePopup && (
                        <div style={styles.profilePopup}>
                            <img src={profileIcon} alt="Perfil" style={styles.popupProfileIcon} />
                            <p style={styles.popupUserName}>{user?.name || '[Nome da Conta]'}</p>
                            <p style={styles.popupUserEmail}>{user?.email || 'email@exemplo.com'}</p>
                            <div style={styles.popupDivider}></div>
                            <button onClick={handleMyAppointments} style={styles.myAppointmentsButton}>
                                Agendamentos
                            </button>
                            <button onClick={handleContact} style={styles.contactButton}>
                                Contato
                            </button>
                            <button onClick={handleLogout} style={styles.logoutButton}>Deslogar</button>
                        </div>
                    )}
                </div>
            </header>

            {/* Conteúdo Central - Agora dentro de uma tag <main> */}
            <main style={styles.mainContent}>
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
            </main>

            {/* Footer na parte inferior (estilo Apresentacao) */}
            <footer style={styles.footer}>
                <p style={styles.footerText}>Agenda Corte © 2025 - Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}

// Estilos para o componente Home
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column', // Empilha header, mainContent e footer
        minHeight: '100vh',
        backgroundColor: '#1a1a2e',
        color: 'white',
        boxSizing: 'border-box',
        width: '100%',
        overflowY: 'auto', // Permite rolagem se o conteúdo for muito grande
    },
    // ESTILOS DO HEADER (Copiados de Apresentacao e ajustados)
    header: {
        width: '100%',
        padding: '20px',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'space-between', // Alinha os ícones nas extremidades
        alignItems: 'center',
        backgroundColor: '#2e2e4e', // Cor igual à do footer
    },
    // NOVO ESTILO PARA O BOTÃO DE ÍCONE NO HEADER
    headerIconButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '10px', // Aumenta a área clicável
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerIconContainer: { // Para o link de voltar
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'white',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
    },
    headerIcon: { // Para a imagem da seta de voltar
        width: '30px',
        height: '30px',
        objectFit: 'contain',
        filter: 'invert(53%) sepia(91%) saturate(301%) hue-rotate(139deg) brightness(98%) contrast(101%)', // Mantém a cor original da seta
    },
    profileContainerHeader: { // Novo container para o ícone de perfil dentro do header
        position: 'relative', // Para o popup se posicionar corretamente
        display: 'flex',
        alignItems: 'center',
    },
    profileIconHeader: { // Novo estilo para o ícone de perfil dentro do header
        width: '40px',
        height: '40px',
        cursor: 'pointer',
        borderRadius: '50%',
        backgroundColor: 'transparent',
        padding: '0',
        boxSizing: 'border-box',
    },
    profilePopup: { // Mantém o estilo do popup, mas garante que 'top' seja relativo ao 'profileContainerHeader'
        position: 'absolute',
        top: '55px', // Ajustado para ficar abaixo do ícone
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
    // FIM DOS ESTILOS DO HEADER

    mainContent: {
        flexGrow: 1, // Ocupa todo o espaço restante entre o header e o footer
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px',
    },
    content: { // Mantido para o conteúdo central original
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
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
    // ESTILOS DO FOOTER (Copiados de Apresentacao)
    footer: {
        width: '100%',
        backgroundColor: '#2e2e4e',
        color: '#888',
        textAlign: 'center',
        padding: '20px',
    },
    footerText: {
        margin: '0',
        fontSize: '0.9em',
    },
};

export default Home;
