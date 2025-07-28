// src/pages/Barbeiros/index.jsx
import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';

// Importar os ícones necessários.
import backArrowIcon from '../../assets/barbeiro/seta-para-a-esquerda 3.png'; // Caminhos confirmados
import profileIcon from '../../assets/barbeiro/usuario-de-perfil 2.png';         // Caminhos confirmados
import barberIconImage from '../../assets/barbeiro/barbeiro 1.png'; // Caminho confirmado e renomeado para evitar conflito

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

    const handleBarberSelect = (barberId) => {
        setSelectedBarberId(barberId);
        // Salva o ID do barbeiro selecionado no localStorage imediatamente
        localStorage.setItem('selectedBarberId', barberId);
    };

    const handleContinue = () => {
        if (!selectedBarberId) {
            alert('Por favor, selecione um barbeiro para continuar.');
            return;
        }
        // O ID do barbeiro já foi salvo em handleBarberSelect
        navigate('/AgendaData'); // Navega para a tela de agenda
    };

    return (
        <div style={styles.container}>
            <div style={styles.backButtonContainer}>
                <Link to="/services" style={styles.backButton}>
                    <img
                        src={backArrowIcon}
                        alt="Voltar"
                        style={styles.backIcon}
                    />
                </Link>
            </div>

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
                        <button onClick={handleLogout} style={styles.logoutButton}>Deslogar</button>
                    </div>
                )}
            </div>

            <main style={styles.mainContent}>
                <section style={styles.heroSection}>
                    <h1 style={styles.title}>
                        ESCOLHA O SEU{' '}
                        <span style={{ color: 'rgb(16, 175, 232)' }}>BARBEIRO</span>
                    </h1>
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
        </div>
    );
}

// Estilos para o componente Barbeiros
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
        position: 'relative',
    },
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
    mainContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '800px',
        paddingTop: '80px',
        boxSizing: 'border-box',
    },
    heroSection: {
        textAlign: 'center',
        marginBottom: '50px',
        padding: '0 20px',
    },
    title: {
        fontSize: '2.5em',
        marginBottom: '10px',
        color: 'white',
    },
    subtitle: {
        fontSize: '1em',
        color: '#aaaaaa',
        maxWidth: '600px',
        lineHeight: '1.6',
        marginBottom: '20px',
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
    },
    barberCard: {
        backgroundColor: '#2e2e4e',
        borderRadius: '15px', // Levemente maior para um look mais robusto
        padding: '25px',      // Aumentado o padding
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.4)', // Sombra mais proeminente
        transition: 'background-color 0.2s ease, border 0.2s ease, transform 0.2s ease', // Adicionado transform para efeito ao selecionar
        border: '3px solid transparent', // Borda um pouco mais grossa
    },
    barberCardSelected: {
        borderColor: '#00bcd4',
        transform: 'scale(1.02)', // Um pequeno zoom ao ser selecionado
    },
    barberIcon: {
        width: '70px',  // Aumentado o tamanho do ícone
        height: '70px', // Aumentado o tamanho do ícone
        objectFit: 'contain',
        marginRight: '25px', // Mais espaço à direita do ícone
    },
    barberName: {
        fontSize: '1.8em', // Aumentado o tamanho da fonte do nome
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
};

export default Barbeiros;