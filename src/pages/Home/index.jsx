// src/pages/Home/index.jsx

import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../App';
import { Link, useNavigate } from 'react-router-dom'; // <--- Adicionado useNavigate aqui



// Importar as imagens
import logoAgendaCorte from '../../assets/Home/image 4-Photoroom 2.png'; // Logo principal
import iconHome from '../../assets/Home/410441 1.png'; // Ícone pequeno


function Home() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate(); // <--- Inicializado o useNavigate


    const handleAgendarClick = () => { // <--- Nova função para lidar com o clique
        navigate('/services'); // <--- Redireciona para /services
    };


    return (
        <div style={styles.container}>
            {/* Cabeçalho: Ícone no canto superior esquerdo, Link no canto superior direito */}
            <div style={styles.header}>
                {/* Ícone no canto superior esquerdo */}
                <img src={iconHome} alt="Ícone" style={styles.headerIconLeft} />

                {/* Link de apresentação no canto superior direito */}
                <Link to="/apresentacao" style={styles.presentationLinkRight}>APRESENTAÇÃO</Link>
            </div>

            {/* Conteúdo Central */}
            <div style={styles.content}>
                <img src={logoAgendaCorte} alt="Agenda Corte Barbearia Logo" style={styles.logo} />
                <p style={styles.text}>Estilo não se improvisa.</p>
                <p style={styles.text}>Agende agora.</p>
                <button
                    style={styles.button}
                    onClick={handleAgendarClick} // <--- Adicionado o onClick
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
        flexDirection: 'column', // Organiza os filhos (header, content, footer) em coluna
        minHeight: '100vh',
        backgroundColor: '#1a1a2e', // Cor de fundo
        color: 'white',
        alignItems: 'center', // Centraliza o conteúdo horizontalmente (content e footer)
        justifyContent: 'space-between', // Distribui espaço entre header, content, footer
        padding: '0px', // Removendo padding do container para controle total
        boxSizing: 'border-box',
        width: '100%', // Ocupa 100% da largura
    },
    header: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between', // Um item à esquerda, outro à direita
        alignItems: 'center',
        padding: '20px', // Padding no header para espaçamento interno
        boxSizing: 'border-box',
    },
    headerIconLeft: { // Estilos para o ícone no canto esquerdo
        width: '30px',
        height: '30px',
        objectFit: 'contain',
    },
    presentationLinkRight: { // Estilos para o link de apresentação no canto direito
        color: 'white',
        textDecoration: 'none',
        fontSize: '1em',
        fontWeight: 'bold',
        letterSpacing: '0.8px',
        transition: 'color 0.3s ease',
    },
    content: {
        flexGrow: 1, // Ocupa o espaço restante
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // Centraliza verticalmente
        alignItems: 'center',    // Centraliza horizontalmente
        textAlign: 'center',
        padding: '20px',
    },
    logo: {
        maxWidth: '400px', // Tamanho máximo da logo
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
        height: '50px', // Mantenha um rodapé para 'space-between' funcionar
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

export default Home;