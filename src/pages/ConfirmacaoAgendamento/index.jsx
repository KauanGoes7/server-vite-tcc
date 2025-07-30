import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';

// Ícones de imagem
import backArrowIcon from '../../assets/servicos/seta-para-a-esquerda 3.png';
import profileIcon from '../../assets/servicos/usuario-de-perfil 2.png';

// Função para gerar um código de confirmação aleatório
function generateConfirmationCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase(); // Gera um código de 6 caracteres
}

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
        confirmationCode: '', // Adicionado estado para o código de confirmação
    });

    // Dados hardcoded para simular a busca de detalhes de serviço e barbeiro
    const hardcodedServices = [
        { Id: 1, Tema: "Corte", NomeServico: "MID FADE + RISQUINHO NA NAVALHA", Descricao: "Degradê médio + detalhe fino na navalha (lados bem alinhados, transição suave)." },
        { Id: 2, Tema: "Corte", NomeServico: "Low Fade + Topo Texturizado", Descricao: "Degradê baixo + topo com tesoura para volume natural (versátil para qualquer ocasião)." },
        { Id: 3, Tema: "Corte", NomeServico: "Buzz Cut + Linha de Contorno", Descricao: "Corte máquina rente + linha de contorno nítida (estilo limpo e moderno)." },
        { Id: 4, Tema: "Barba", NomeServico: "Barba Degradê + Desenhos", Descricao: "Degradê perfeito dos lados + detalhes artísticos (linhas geométricas ou símbolos personalizados)." },
        { Id: 5, Tema: "Barba", NomeServico: "Stuble Texturizado", Descricao: "Barba rala aparada com precisão (3mm-5mm) contorno definido (estilo 'homem moderno')" },
        { Id: 6, Tema: "Barba", NomeServico: "Van Dyke", Descricao: "Bigode separado + cavanhaque alongado (toque vintage e sofisticado)." },
        { Id: 7, Tema: "Corte e Barba", NomeServico: "O Clássico Renovado", Descricao: "Degradê + Barba modelada e aparada com tesoura e navalha." }, // Descrição corrigida
        { Id: 8, Tema: "Corte e Barba", NomeServico: "O Rebelde Controlado", Descricao: "Barba: Dutch beard (laterais quadradas)" },
        { Id: 9, Tema: "Corte e Barba", NomeServico: "O Minimalista Sofisticado", Descricao: "Barba: Circle beard (3cm de comprimento)" },
    ];

    const hardcodedBarbers = [
        { Id: 1, Nome: "Lucas" },
        { Id: 2, Nome: "Rodrigo" },
        { Id: 3, Nome: "Marcelo" },
    ];

    useEffect(() => {
        // Redireciona se o usuário não estiver autenticado
        if (!user || !user.email) {
            navigate('/login');
            return;
        }

        const userAppointmentsKey = `userAppointments_${user.email}`;

        // Tenta carregar dados temporários do localStorage (indicam um novo agendamento)
        const storedServiceIds = JSON.parse(localStorage.getItem('selectedServiceIds') || '[]');
        const storedBarberId = localStorage.getItem('selectedBarberId');
        const storedDate = localStorage.getItem('selectedDate');
        const storedTime = localStorage.getItem('selectedTime');

        // Verifica se há dados temporários para um novo agendamento
        if (storedServiceIds.length > 0 && storedBarberId && storedDate && storedTime) {
            // É um novo agendamento, então processa e salva
            const selectedServices = storedServiceIds
                .map(id => hardcodedServices.find(s => s.Id === id))
                .filter(Boolean);
            const selectedBarber = hardcodedBarbers.find(b => b.Id === parseInt(storedBarberId));

            const newConfirmationCode = generateConfirmationCode(); // Gera o código
            const newAppointment = {
                id: Date.now(), // ID único para o agendamento
                services: selectedServices,
                barbeiro: selectedBarber,
                data: storedDate,
                hora: storedTime,
                status: 'ativo',
                confirmationCode: newConfirmationCode,
                timestamp: new Date().toISOString() // Adiciona um timestamp para ordenação
            };

            // Carrega agendamentos existentes do usuário e adiciona o novo
            const existingAppointments = JSON.parse(localStorage.getItem(userAppointmentsKey) || '[]');
            localStorage.setItem(userAppointmentsKey, JSON.stringify([...existingAppointments, newAppointment]));

            // Atualiza o estado local com os detalhes do agendamento confirmado
            setAppointmentDetails({
                services: selectedServices,
                barber: selectedBarber,
                date: storedDate,
                time: storedTime,
                confirmationCode: newConfirmationCode,
            });

            // Limpa os dados temporários do localStorage após o agendamento ser salvo
            localStorage.removeItem('selectedServiceIds');
            localStorage.removeItem('selectedBarberId');
            localStorage.removeItem('selectedDate');
            localStorage.removeItem('selectedTime');
        } else {
            // Não há dados temporários, tenta carregar o último agendamento salvo
            const existingAppointments = JSON.parse(localStorage.getItem(userAppointmentsKey) || '[]');
            if (existingAppointments.length > 0) {
                // Encontra o agendamento mais recente (baseado no timestamp, se existir, ou no ID)
                const mostRecentAppointment = existingAppointments.sort((a, b) => {
                    const timeA = a.timestamp ? new Date(a.timestamp).getTime() : a.id;
                    const timeB = b.timestamp ? new Date(b.timestamp).getTime() : b.id;
                    return timeB - timeA; // Mais recente primeiro
                })[0];

                // Mapeia os IDs dos serviços para os objetos completos de serviço
                const servicesForDisplay = mostRecentAppointment.services
                    .map(s => hardcodedServices.find(hs => hs.Id === s.Id))
                    .filter(Boolean);
                const barberForDisplay = hardcodedBarbers.find(b => b.Id === mostRecentAppointment.barbeiro.Id);

                setAppointmentDetails({
                    services: servicesForDisplay,
                    barber: barberForDisplay,
                    date: mostRecentAppointment.data,
                    time: mostRecentAppointment.hora,
                    confirmationCode: mostRecentAppointment.confirmationCode || '', // Garante que o código exista
                });
            } else {
                // Se não há agendamentos salvos e nem temporários, redireciona para o início
                navigate('/home');
            }
        }
    }, [user, navigate]); // Adicionado 'user' e 'navigate' como dependências

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

    const handleNewBooking = () => {
        // Limpa os dados temporários (se houver algum resquício)
        localStorage.removeItem('selectedServiceIds');
        localStorage.removeItem('selectedBarberId');
        localStorage.removeItem('selectedDate');
        localStorage.removeItem('selectedTime');
        navigate('/home'); // Mantido o caminho original
    };

    const formatDisplayDate = (dateString) => {
        if (!dateString) return 'Data não disponível';
        const [year, month, day] = dateString.split('-').map(Number);
        const date = new Date(year, month - 1, day);

        if (isNaN(date.getTime())) {
            return 'Data inválida';
        }
        return date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
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
                            <button
                                onClick={handleMyAppointments}
                                style={styles.myAppointmentsButton}
                            >
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
                                        {service.NomeServico}
                                        <br />
                                        <span style={styles.serviceDescription}>
                                            {service.Descricao}
                                        </span>
                                    </span>
                                ))
                            ) : (
                                <span style={styles.detailValue}>Nenhum serviço selecionado.</span>
                            )}
                        </div>
                    </div>
                    {/* Código de Agendamento Aleatório - DENTRO DO CARD */}
                    {appointmentDetails.confirmationCode && (
                        <div style={styles.detailItem}>
                            <span style={styles.detailEmoji}>🔑</span>
                            <div style={styles.detailText}>
                                <span style={styles.detailLabel}>Código de Agendamento</span>
                                <span style={styles.confirmationCodeValue}>{appointmentDetails.confirmationCode}</span>
                            </div>
                        </div>
                    )}
                </section>

                {/* Mensagem de Pagamento - FORA DO CARD E RESUMIDA, SEM BORDA E BACKGROUND */}
                {appointmentDetails.confirmationCode && (
                    <p style={styles.paymentMessage}>
                        Pagamento via WhatsApp. Copie o código de agendamento para referência.
                    </p>
                )}

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

            <footer style={styles.footer}>
                <p style={styles.footerText}>Agenda Corte © 2025 - Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}

// Estilos (Mantidos exatamente como antes, com as adições para melhor visualização dos serviços, código e mensagem)
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
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#1a1a2e',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0px',
        boxSizing: 'border-box',
        width: '100%',
        overflowY: 'auto',
        flexGrow: 1,
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
        fontWeight: 'bold',
        fontSize: '1.1em',
    },
    serviceDescription: {
        color: '#aaaaaa',
        fontSize: '0.9em',
        fontWeight: 'normal',
        display: 'block',
        marginTop: '5px',
    },
    confirmationCodeValue: {
        color: '#00bcd4',
        fontWeight: 'bold',
        fontSize: '1.2em',
        userSelect: 'all',
        cursor: 'text',
    },
    // Estilos para a mensagem de pagamento - agora sem borda e background, similar ao reminder
    paymentMessage: {
        fontSize: '1em', // Tamanho de fonte igual ao reminder
        color: '#aaaaaa', // Cor de texto igual ao reminder
        maxWidth: '600px', // Largura máxima igual ao reminder
        lineHeight: '1.6', // Altura da linha igual ao reminder
        marginTop: '20px', // Margem superior para espaçamento
        textAlign: 'center',
        padding: '0 20px', // Padding horizontal para alinhamento
        marginBottom: '30px', // Margem inferior para espaçamento
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
    footer: {
        width: '100%',
        backgroundColor: '#2e2e4e',
        color: '#888',
        textAlign: 'center',
        padding: '20px',
        marginTop: 'auto',
    },
    footerText: {
        margin: '0',
        fontSize: '0.9em',
    },
};

export default ConfirmacaoAgendamento;
