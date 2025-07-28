// src/pages/Services/index.jsx
import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App'; // Para pegar o user logado e o logout
import api from '../../api/api'; // Para buscar os serviços do backend

// Importar os ícones específicos para a tela de Serviços
import backArrowIcon from '../../assets/apresentacao/seta-para-a-esquerda 3.png'; // Caminho existente
import profileIcon from '../../assets/servicos/usuario-de-perfil 2.png'; // Novo ícone de perfil
import scissorsIcon from '../../assets/servicos/scissors 1.png'; // Ícone para "Corte"
import beardIcon from '../../assets/servicos/beard 1.png'; // Ícone para "Barba"
import barberiaIcon from '../../assets/servicos/barbearia 1.png'; // Ícone para "Corte e Barba"

function Services() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showProfilePopup, setShowProfilePopup] = useState(false);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Função para buscar os serviços
        const fetchServices = async () => {
            try {
                setLoading(true);
                const response = await api.get('/services'); // Endpoint para buscar serviços
                setServices(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Erro ao buscar serviços:', err);
                setError('Não foi possível carregar os serviços. Tente novamente mais tarde.');
                setLoading(false);
            }
        };

        fetchServices();
    }, []); // Executa apenas uma vez ao montar o componente

    const handleLogout = () => {
        logout(); // Limpa o estado do usuário e o localStorage
        navigate('/login'); // Redireciona para a tela de login
    };

    // Função para renderizar os serviços dentro de cada card
    const renderServicesList = (theme) => {
        const filteredServices = services.filter(service => service.Tema === theme);
        
        // Define as cores dos círculos (você pode ajustar a lógica aqui se precisar de mais variação)
        const colors = ['#888888', '#00ff00']; // Cinza, Verde

        return filteredServices.map((service, index) => (
            <div key={service.Id} style={styles.serviceItem}>
                {/* Lógica para alternar as cores dos círculos (ex: cinza/verde) */}
                <div style={{
                    ...styles.serviceCircle,
                    backgroundColor: colors[index % colors.length]
                }}></div>
                <span style={styles.serviceName}>{service.NomeServico}</span>
            </div>
        ));
    };

    // Dados dos cards conforme o design e o GET
    const serviceCardsData = [
        {
            title: "Corte",
            icon: scissorsIcon,
            theme: "Corte",
            services: [
                "Degradê médio + detalhe fino na navalha.",
                "Low Fade + Topo Texturizado",
                "Buzz Cut + Linha de Contorno"
            ]
        },
        {
            title: "Barba",
            icon: beardIcon,
            theme: "Barba",
            services: [
                "Barba Degradê + Desenhos",
                "Stuble Texturizado",
                "Van Dyke"
            ]
        },
        {
            title: "Corte + Barba",
            icon: barberiaIcon,
            theme: "Corte e Barba",
            services: [
                "O Clássico Renovado",
                "O Rebelde Controlado",
                "O Minimalista Sofisticado"
            ]
        }
    ];

    return (
        <div style={styles.container}>
            {/* Cabeçalho superior com o botão de voltar e o ícone de perfil */}
            <div style={styles.topBar}>
                <Link to="/home" style={styles.backButton}>
                    <img src={backArrowIcon} alt="Voltar" style={styles.backIcon} />
                </Link>
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
                            <p style={styles.popupUserName}>{user?.name || '[Nome da Conta]'}</p> {/* Pega o nome do user */}
                            <p style={styles.popupUserEmail}>{user?.email || 'email@exemplo.com'}</p> {/* Pega o email do user */}
                            <div style={styles.popupDivider}></div>
                            <button onClick={handleLogout} style={styles.logoutButton}>Deslogar</button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mensagem de boas-vindas */}
            <h1 style={styles.welcomeText}>
                BEM VINDO <span style={styles.userNameHighlight}>{user?.name?.toUpperCase() || 'USER'}</span>!
            </h1>
            <p style={styles.descriptionText}>
                No Agenda Corte, você agenda seus cortes de cabelo, barba e tratamentos de forma rápida, fácil e sem complicação.
                Escolha o horário perfeito, o profissional preferido e receba lembretes automáticos — tudo na palma da sua mão!
            </p>

            {/* Seção dos Cards de Serviço */}
            {loading ? (
                <p style={styles.loadingText}>Carregando serviços...</p>
            ) : error ? (
                <p style={styles.errorText}>{error}</p>
            ) : (
                <div style={styles.cardsContainer}>
                    {serviceCardsData.map((card, cardIndex) => (
                        <div key={cardIndex} style={styles.card}>
                            <div style={styles.cardIconCircle}>
                                <img src={card.icon} alt={card.title} style={styles.cardIcon} />
                            </div>
                            <h2 style={styles.cardTitle}>{card.title}</h2>
                            <div style={styles.servicesList}>
                                {renderServicesList(card.theme)} {/* Renderiza os serviços filtrados */}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            <button style={styles.continueButton}>Continua</button>
        </div>
    );
}

// Estilos para o componente Services
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#1a1a2e',
        color: 'white',
        alignItems: 'center',
        padding: '0px',
        boxSizing: 'border-box',
        width: '100%',
        overflowY: 'auto',
    },
    topBar: { // Container para o botão de voltar E o ícone de perfil
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between', // Espaço entre os elementos
        alignItems: 'flex-start', // Alinha ao topo
        padding: '20px',
        boxSizing: 'border-box',
        position: 'relative', // Para o popup
    },
    backButton: {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'white',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        marginTop: '-10px',
        marginLeft: '-10px',
    },
    backIcon: {
        width: '30px',
        height: '30px',
        objectFit: 'contain',
    },
    profileContainer: {
        position: 'relative', // Para posicionar o popup em relação a este container
    },
    profileIcon: {
        width: '40px',
        height: '40px',
        cursor: 'pointer',
        borderRadius: '50%',
        backgroundColor: '#00bcd4', // Fundo azul para o ícone de perfil
        padding: '5px',
        boxSizing: 'border-box',
    },
    profilePopup: {
        position: 'absolute',
        top: '55px', // Ajuste a distância do ícone
        right: '0',
        backgroundColor: '#2e2e4e',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '220px',
        zIndex: 1000, // Garante que o popup fique acima de outros elementos
    },
    popupProfileIcon: {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: '#00bcd4',
        padding: '5px',
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
    logoutButton: {
        backgroundColor: 'transparent',
        color: '#00bcd4',
        border: '1px solid #00bcd4',
        padding: '10px 20px',
        borderRadius: '20px',
        cursor: 'pointer',
        fontSize: '1em',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease, color 0.3s ease',
    },
    logoutButtonHover: {
        backgroundColor: '#00bcd4',
        color: 'white',
    },
    welcomeText: {
        fontSize: '2.5em',
        marginBottom: '10px',
        color: 'white',
        textAlign: 'center',
        marginTop: '30px',
    },
    userNameHighlight: {
        color: '#00bcd4', // Cor azul para o USER destacado
    },
    descriptionText: {
        fontSize: '1em',
        color: '#aaaaaa',
        textAlign: 'center',
        maxWidth: '800px',
        lineHeight: '1.6',
        marginBottom: '50px',
        padding: '0 20px', // Padding para não colar nas bordas
    },
    cardsContainer: {
        display: 'flex',
        flexWrap: 'wrap', // Permite que os cards quebrem linha
        justifyContent: 'center', // Centraliza os cards
        gap: '40px', // Espaço entre os cards
        width: '100%',
        maxWidth: '1200px', // Limite a largura para os cards
        marginBottom: '60px',
    },
    card: {
        backgroundColor: '#2e2e4e',
        borderRadius: '15px',
        padding: '30px',
        width: '320px', // Largura fixa para cada card
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },
    cardIconCircle: {
        backgroundColor: '#00bcd4', // Fundo azul para os ícones dos cards
        borderRadius: '50%',
        width: '80px',
        height: '80px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px',
    },
    cardIcon: {
        width: '50px', // Tamanho dos ícones dentro dos círculos
        height: '50px',
        objectFit: 'contain',
    },
    cardTitle: {
        fontSize: '1.8em',
        color: 'white',
        marginBottom: '25px',
    },
    servicesList: {
        width: '100%',
        textAlign: 'left', // Alinha o texto dos serviços à esquerda
    },
    serviceItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
    },
    serviceCircle: {
        width: '14px',
        height: '14px',
        borderRadius: '50%',
        marginRight: '12px',
        flexShrink: 0, // Impede que o círculo diminua
    },
    serviceName: {
        fontSize: '1em',
        color: 'white',
        lineHeight: '1.4',
    },
    continueButton: {
        backgroundColor: '#00bcd4',
        color: 'white',
        padding: '15px 60px',
        borderRadius: '30px',
        border: 'none',
        fontSize: '1.2em',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
        marginBottom: '50px', // Espaço abaixo do botão
        outline: 'none',
    },
    loadingText: {
        fontSize: '1.5em',
        color: '#00bcd4',
        marginTop: '50px',
    },
    errorText: {
        fontSize: '1.2em',
        color: '#ff6b6b',
        marginTop: '50px',
        textAlign: 'center',
    },
};

export default Services;