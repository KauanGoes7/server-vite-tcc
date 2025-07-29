import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';

// Ícones de imagem
import backArrowIcon from '../../assets/servicos/seta-para-a-esquerda 3.png';
import profileIcon from '../../assets/servicos/usuario-de-perfil 2.png';

function ConfirmacaoAgendamento() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showProfilePopup, setShowProfilePopup] = useState(false);

    // Estado para armazenar os detalhes do agendamento
    const [appointmentDetails, setAppointmentDetails] = useState({
        services: [],
        barber: null,
        date: '',
        time: '',
    });

    // Dados hardcoded para simular a busca de detalhes de serviço e barbeiro
    // ATUALIZADO: Usando os mesmos dados e descrições completas do Services/index.jsx para consistência.
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

    const hardcodedBarbers = [
        { Id: 1, Nome: "Lucas" },
        { Id: 2, Nome: "Rodrigo" },
        { Id: 3, Nome: "Marcelo" },
    ];

    useEffect(() => {
        // Carrega os dados do localStorage
        const storedServiceIds = JSON.parse(localStorage.getItem('selectedServiceIds') || '[]');
        const storedBarberId = localStorage.getItem('selectedBarberId');
        const storedDate = localStorage.getItem('selectedDate');
        const storedTime = localStorage.getItem('selectedTime');

        // Mapeia os IDs dos serviços para os objetos completos de serviço
        const selectedServices = storedServiceIds.map(id => hardcodedServices.find(s => s.Id === id)).filter(Boolean);
        const selectedBarber = hardcodedBarbers.find(b => b.Id === parseInt(storedBarberId));

        setAppointmentDetails({
            services: selectedServices,
            barber: selectedBarber,
            date: storedDate,
            time: storedTime,
        });

        // Removido: localStorage.removeItem(...) A limpeza será feita no "Novo Agendamento"
        // ou se o usuário navegar para uma página que inicia um novo fluxo.

    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Função para navegar para Meus Agendamentos
    const handleMyAppointments = () => {
        navigate('/meus-agendamentos');
        setShowProfilePopup(false); // Fecha o popup após navegar
    };

    // NOVO: Função para navegar para a página de Contato
    const handleContact = () => {
        navigate('/contact'); // Supondo que você tenha uma rota '/contact'
        setShowProfilePopup(false); // Fecha o popup após navegar
    };

    const handleNewBooking = () => {
        // Limpa os dados do localStorage APENAS quando um novo agendamento é iniciado
        localStorage.removeItem('selectedServiceIds');
        localStorage.removeItem('selectedBarberId');
        localStorage.removeItem('selectedDate');
        localStorage.removeItem('selectedTime');
        navigate('/home'); // Ou para a rota de seleção de serviços, se for o início do fluxo
    };

    const formatDisplayDate = (dateString) => {
        if (!dateString) return 'Data não disponível';
        // Ajusta para lidar com a diferença de fuso horário ao criar a data
        const [year, month, day] = dateString.split('-').map(Number);
        const date = new Date(year, month - 1, day); // month - 1 porque o mês é baseado em 0

        // Verifica se a data é válida antes de formatar
        if (isNaN(date.getTime())) {
            return 'Data inválida';
        }

        return date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    };

    return (
        <div style={styles.container}>
            {/* Botão de Voltar */}
            <div style={styles.backButtonContainer}>
                <Link to="/AgendaData" style={styles.backButton}> {/* Mantido, mas considere o fluxo de UX */}
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
                        {/* Botão Meus Agendamentos */}
                        <button
                            onClick={handleMyAppointments}
                            style={styles.myAppointmentsButton} // Estilo para o novo botão
                        >
                        Agendamentos
                        </button>
                        {/* NOVO: Botão de Contato */}
                        <button onClick={handleContact} style={styles.contactButton}>
                            Contato
                        </button>
                        <button onClick={handleLogout} style={styles.logoutButton}>Deslogar</button>
                    </div>
                )}
            </div>

            <main style={styles.mainContent}>
                <section style={styles.hero}>
                    <h1 style={styles.title}>AGENDAMENTO CONCLUÍDO <br /> <span style={styles.highlight}>COM SUCESSO!</span></h1>
                    <p style={styles.reminder}>
                        🔔 Você receberá um lembrete pelo WhatsApp um dia antes do seu atendimento.
                    </p>
                </section>

                <section style={styles.summaryCard}>
                    <div style={styles.detailItem}>
                        <span style={styles.detailEmoji}>🗓️</span>
                        <div style={styles.detailText}>
                            <span style={styles.detailLabel}>Data</span>
                            <span style={styles.detailValue}>{formatDisplayDate(appointmentDetails.date)}</span>
                        </div>
                    </div>
                    <div style={styles.detailItem}>
                        <span style={styles.detailEmoji}>⏰</span>
                        <div style={styles.detailText}>
                            <span style={styles.detailLabel}>Horário</span>
                            <span style={styles.detailValue}>{appointmentDetails.time || 'N/A'}</span>
                        </div>
                    </div>
                    <div style={styles.detailItem}>
                        <span style={styles.detailEmoji}>👨‍🦰</span>
                        <div style={styles.detailText}>
                            <span style={styles.detailLabel}>Barbeiro</span>
                            <span style={styles.detailValue}>{appointmentDetails.barber?.Nome || 'N/A'}</span>
                        </div>
                    </div>
                    <div style={styles.detailItem}>
                        <span style={styles.detailEmoji}>✂️</span>
                        <div style={styles.detailText}>
                            <span style={styles.detailLabel}>Serviços</span>
                            {appointmentDetails.services.length > 0 ? (
                                appointmentDetails.services.map((service, index) => (
                                    <span key={service.Id} style={styles.detailValueService}>
                                        {service.NomeServico} ({service.Descricao}){index < appointmentDetails.services.length - 1 ? ', ' : ''}
                                    </span>
                                ))
                            ) : (
                                <span style={styles.detailValue}>Nenhum serviço selecionado.</span>
                            )}
                        </div>
                    </div>
                </section>

                <p style={styles.thankYouMessage}>
                    Muito obrigado pela confiança! Estamos ansiosos para te atender. 💈
                </p>

                <section style={styles.buttonSection}>
                    <button
                        style={styles.newBookingButton}
                        onClick={handleNewBooking}
                    >
                        Novo Agendamento
                    </button>
                </section>
            </main>
        </div>
    );
}

// Estilos (Mantidos exatamente como antes, com a adição do estilo para myAppointmentsButton e contactButton)
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
    // NOVO ESTILO: Botão de Contato
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
        marginBottom: '10px', // Adicionado margem inferior para separar do botão de deslogar
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
    hero: {
        textAlign: 'center',
        marginBottom: '40px',
        padding: '0 20px',
    },
    title: {
        fontSize: '2.5em',
        marginBottom: '10px',
        color: 'white',
        lineHeight: '1.2',
    },
    highlight: {
        color: '#00bcd4',
    },
    reminder: {
        fontSize: '1em',
        color: '#aaaaaa',
        maxWidth: '600px',
        lineHeight: '1.6',
        marginTop: '20px',
    },
    summaryCard: {
        backgroundColor: '#2e2e4e',
        borderRadius: '15px',
        padding: '30px',
        width: 'calc(100% - 40px)',
        maxWidth: '400px',
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        marginBottom: '30px',
    },
    detailItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        fontSize: '1.1em',
    },
    detailEmoji: {
        fontSize: '2em',
        lineHeight: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '30px',
        height: '30px',
    },
    detailText: {
        display: 'flex',
        flexDirection: 'column',
    },
    detailLabel: {
        fontWeight: 'bold',
        color: '#aaaaaa',
        fontSize: '0.9em',
        marginBottom: '5px',
    },
    detailValue: {
        color: 'white',
        fontWeight: 'normal',
        fontSize: '1.1em',
    },
    detailValueService: {
        color: 'white',
        fontWeight: 'normal',
        fontSize: '1.1em',
        display: 'inline',
    },
    thankYouMessage: {
        fontSize: '1.1em',
        color: '#e0e0e0',
        marginBottom: '40px',
        textAlign: 'center',
        padding: '0 20px',
    },
    buttonSection: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '50px',
    },
    newBookingButton: {
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
        '&:hover': {
            backgroundColor: '#00a0b0',
            transform: 'scale(1.05)',
        },
    },
};

export default ConfirmacaoAgendamento;
