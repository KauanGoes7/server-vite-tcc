// src/pages/Barbeiros/index.jsx
import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';

// Importar os ícones necessários.
import backArrowIcon from '../../assets/servicos/seta-para-a-esquerda 3.png';
import profileIcon from '../../assets/servicos/usuario-de-perfil 2.png';
import barberIconImage from '../../assets/barbeiro/barbeiro 1.png';

function Barbeiros() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showProfilePopup, setShowProfilePopup] = useState(false);
    const [selectedBarberId, setSelectedBarberId] = useState(null);
    const [selectedServiceNames, setSelectedServiceNames] = useState([]);

    // Dados dos barbeiros HARDCODED, com o ícone que você forneceu.
    const barbers = [
        { Id: 1, Nome: "Lucas", Icon: barberIconImage },
        { Id: 2, Nome: "Rodrigo", Icon: barberIconImage },
        { Id: 3, Nome: "Marcelo", Icon: barberIconImage },
    ];

    // Dados dos serviços HARDCODED (reutilizados da tela de Serviços para buscar nomes)
    const hardcodedServices = [
        { Id: 1, Tema: "Corte", NomeServico: "MID FADE + RISQUINHO NA NAVALHA", Descricao: "Degradê médio + detalhe fino na navalha (lados bem alinhados, transição suave)." },
        { Id: 2, Tema: "Corte", NomeServico: "Low Fade + Topo Texturizado", Descricao: "Degradê baixo + topo com tesoura para volume natural (versátil para qualquer ocasião)." },
        { Id: 3, Tema: "Corte", NomeServico: "Buzz Cut + Linha de Contorno", Descricao: "Corte máquina rente + linha de contorno nítida (estilo limpo e moderno)." },
        { Id: 4, Tema: "Barba", NomeServico: "Barba Degradê + Desenhos", Descricao: "Degradê perfeito dos lados + detalhes artísticos (linhas geométricas ou símbolos personalizados)." },
        { Id: 5, Tema: "Barba", NomeServico: "Stuble Texturizado", Descricao: "Barba rala aparada com precisão (3mm-5mm) contorno definido (estilo 'homem moderno')" },
        { Id: 6, Tema: "Barba", NomeServico: "Van Dyke", Descricao: "Bigode separado + cavanhaque alongado (toque vintage e sofisticado)." },
        { Id: 7, Tema: "Corte e Barba", NomeServico: "O Clássico Renovado", Descricao: "Degradê perfeito dos lados + detalhes artísticos (linhas geométricas ou símbolos personalizados)." },
        { Id: 8, Tema: "Corte e Barba", NomeServico: "O Rebelde Controlado", Descricao: "Barba: Dutch beard (laterais quadradas)" },
        { Id: 9, Tema: "Corte e Barba", NomeServico: "O Minimalista Sofisticado", Descricao: "Barba: Circle beard (3cm de comprimento)" },
    ];

    useEffect(() => {
        const storedServiceIds = JSON.parse(localStorage.getItem('selectedServiceIds') || '[]');
        const names = storedServiceIds.map(id => {
            const service = hardcodedServices.find(s => s.Id === id);
            return service ? service.NomeServico : `Serviço Desconhecido (ID: ${id})`;
        });
        setSelectedServiceNames(names);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleMyAppointments = () => {
        navigate('/meus-agendamentos');
        setShowProfilePopup(false);
    };

    const handleContact = () => {
        navigate('/contact');
        setShowProfilePopup(false);
    };

    const handleBarberSelect = (barberId) => {
        setSelectedBarberId(barberId);
        localStorage.setItem('selectedBarberId', barberId);
    };

    const handleContinue = () => {
        if (!selectedBarberId) {
            alert('Por favor, selecione um barbeiro para continuar.');
            return;
        }
        navigate('/AgendaData');
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <button onClick={() => navigate(-1)} style={styles.headerIconButton}>
                    <img
                        src={backArrowIcon}
                        alt="Voltar"
                        style={styles.headerIcon}
                    />
                </button>
                <div style={styles.profileContainerHeader}>
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

            <main style={styles.mainContent}>
                <section style={styles.heroSection}>
                    <h1 style={styles.title}>
                        ESCOLHA O SEU{' '}
                        <span style={{ color: 'rgb(16, 175, 232)' }}>BARBEIRO</span>
                    </h1>
                    {/* A frase "Selecione o profissional que irá cuidar do seu estilo." */}
                    <p style={styles.subtitle}>Selecione o profissional que irá cuidar do seu estilo.</p>
                    <p style={styles.selectedServicesText}>
                        Serviços selecionados: {selectedServiceNames.join(', ')}
                    </p>
                </section>

                <section style={styles.barbersList}>
                    {barbers.map((barber) => (
                        <div
                            key={barber.Id}
                            style={{
                                ...styles.barberCard,
                                ...(selectedBarberId === barber.Id ? styles.barberCardSelected : {})
                            }}
                            onClick={() => handleBarberSelect(barber.Id)}
                        >
                            <img src={barber.Icon} alt={barber.Nome} style={styles.barberIcon} />
                            <span style={styles.barberName}>{barber.Nome}</span>
                        </div>
                    ))}
                </section>

                <section style={styles.continueButtonSection}>
                    <button
                        style={{
                            ...styles.continueButton,
                            ...(!selectedBarberId ? styles.continueButtonDisabled : {})
                        }}
                        onClick={handleContinue}
                        disabled={!selectedBarberId}
                    >
                        Continua
                    </button>
                </section>
            </main>

            <footer style={styles.footer}>
                <p style={styles.footerText}>Agenda Corte © 2025 - Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#1a1a2e',
        color: 'white',
        boxSizing: 'border-box',
        width: '100%',
        overflowY: 'auto',
        alignItems: 'stretch',
    },
    header: {
        width: '100%',
        padding: '20px',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2e2e4e',
    },
    headerIconButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerIconContainer: {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'white',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
    },
    headerIcon: {
        width: '32px',
        height: '32px',
        objectFit: 'contain',
        filter: 'invert(53%) sepia(91%) saturate(301%) hue-rotate(139deg) brightness(98%) contrast(101%)',
    },
    profileContainerHeader: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    },
    profileIconHeader: {
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
    mainContent: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        margin: '0 auto',
        padding: '20px',
        boxSizing: 'border-box',
    },
    heroSection: {
        textAlign: 'center',
        marginBottom: '50px',
        padding: '0 20px',
        width: '100%',
        maxWidth: '800px',
    },
    title: {
        fontSize: '2.5em',
        marginBottom: '10px',
        color: 'white',
        textAlign: 'center',
    },
    subtitle: {
        // Mantido o tamanho original e garantido a centralização
        fontSize: '1em',
        color: '#aaaaaa',
        maxWidth: '600px',
        lineHeight: '1.6',
        marginBottom: '20px',
        textAlign: 'center',
        margin: '0 auto 20px auto', // Centraliza horizontalmente e define margem inferior
    },
    selectedServicesText: {
        fontSize: '1.1em',
        color: '#00bcd4',
        fontWeight: 'bold',
        marginBottom: '40px',
        textAlign: 'center',
    },
    barbersList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        maxWidth: '400px',
        marginBottom: '60px',
        padding: '0 20px',
        boxSizing: 'border-box',
        alignSelf: 'center',
    },
    barberCard: {
        backgroundColor: '#2e2e4e',
        borderRadius: '15px',
        padding: '25px',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.4)',
        transition: 'background-color 0.2s ease, border 0.2s ease, transform 0.2s ease',
        border: '3px solid transparent',
    },
    barberCardSelected: {
        borderColor: '#00bcd4',
        transform: 'scale(1.02)',
    },
    barberIcon: {
        width: '70px',
        height: '70px',
        objectFit: 'contain',
        marginRight: '25px',
    },
    barberName: {
        fontSize: '1.8em',
        fontWeight: 'bold',
        color: 'white',
    },
    continueButtonSection: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '50px',
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
        outline: 'none',
    },
    continueButtonDisabled: {
        backgroundColor: '#00bcd480',
        cursor: 'not-allowed',
    },
    footer: {
        width: '100%',
        backgroundColor: '#2e2e4e',
        color: '#888',
        textAlign: 'center',
        padding: '20px',
        boxSizing: 'border-box',
        marginTop: 'auto',
    },
    footerText: {
        margin: '0',
        fontSize: '0.9em',
    },
};

export default Barbeiros;
