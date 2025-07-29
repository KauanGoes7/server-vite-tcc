import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';

// Ícones (Certifique-se de que estes caminhos estão corretos)
import backArrowIcon from '../../assets/servicos/seta-para-a-esquerda 3.png'; // Reutilizando ícone de seta
import profileIcon from '../../assets/servicos/usuario-de-perfil 2.png'; // Reutilizando ícone de perfil

function AgendaData() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showProfilePopup, setShowProfilePopup] = useState(false);

    const [selectedDate, setSelectedDate] = useState(null); // Armazena o objeto Date ou null
    const [selectedTime, setSelectedTime] = useState('');

    // Dados para recuperar do localStorage (serviços e barbeiro)
    const [selectedServiceIds, setSelectedServiceIds] = useState([]);
    const [selectedBarberId, setSelectedBarberId] = useState(null);

    // Dados hardcoded para simular a busca de detalhes (em um app real, viriam de uma API ou banco de dados)
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

    // Horários fixos conforme a imagem fornecida
    const fixedAvailableTimes = [
        "09:30", "10:00", "11:00", "12:00", "14:00",
        "15:00", "16:00", "17:00"
    ];

    // Gera os próximos 5 dias da semana (Segunda a Sexta)
    const generateWeekdays = () => {
        const dates = [];
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Zera a hora para comparação

        let daysAdded = 0;
        while (daysAdded < 5) { // Gerar 5 dias de semana
            currentDate.setDate(currentDate.getDate() + 1); // Avança um dia

            // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
            const dayOfWeek = currentDate.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Se não for Sábado (6) ou Domingo (0)
                dates.push(new Date(currentDate)); // Adiciona uma cópia da data
                daysAdded++;
            }
        }
        return dates;
    };

    const weekdays = generateWeekdays(); // Dias da semana para exibição

    useEffect(() => {
        // Carrega os IDs dos serviços e do barbeiro do localStorage
        const storedServiceIds = JSON.parse(localStorage.getItem('selectedServiceIds') || '[]');
        const storedBarberId = localStorage.getItem('selectedBarberId');

        setSelectedServiceIds(storedServiceIds);
        setSelectedBarberId(storedBarberId ? parseInt(storedBarberId) : null);

    }, []);

    const getServiceName = (id) => {
        const service = hardcodedServices.find(s => s.Id === id);
        return service ? service.NomeServico : `Serviço ID ${id}`;
    };

    const getBarberName = (id) => {
        const barber = hardcodedBarbers.find(b => b.Id === id);
        return barber ? barber.Nome : `Barbeiro ID ${id}`;
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleMyAppointments = () => {
        navigate('/meus-agendamentos');
        setShowProfilePopup(false); // Fecha o popup após navegar
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setSelectedTime(''); // Reseta a seleção de hora ao mudar a data
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };

    const handleConfirmBooking = () => {
        if (!selectedDate || !selectedTime) {
            alert('Por favor, selecione uma data e um horário para continuar.');
            return;
        }

        // Formata a data para YYYY-MM-DD para salvar no localStorage
        const formattedDate = selectedDate.toISOString().split('T')[0];

        // Mapeia os IDs dos serviços para os objetos completos de serviço
        const selectedServices = selectedServiceIds.map(id => hardcodedServices.find(s => s.Id === id)).filter(Boolean);
        const selectedBarber = hardcodedBarbers.find(b => b.Id === selectedBarberId);

        // --- NOVA LÓGICA: Salvar o agendamento na lista permanente 'userAppointments' ---
        let userAppointments = JSON.parse(localStorage.getItem('userAppointments') || '[]');

        // Gera um ID único para o novo agendamento
        const newAppointmentId = userAppointments.length > 0
            ? Math.max(...userAppointments.map(a => a.id)) + 1
            : 1;

        const newAppointment = {
            id: newAppointmentId,
            services: selectedServices, // Usando 'services' para consistência
            barbeiro: selectedBarber, // Mantendo 'barbeiro' como no seu mock
            data: formattedDate,
            hora: selectedTime,
            status: 'ativo', // Define o status inicial como 'ativo'
            timestamp: new Date().toISOString() // Adiciona um timestamp para ajudar a evitar duplicação em refreshes rápidos
        };

        userAppointments.push(newAppointment);
        localStorage.setItem('userAppointments', JSON.stringify(userAppointments));

        // Salva os dados temporários para a tela de confirmação (que os lerá e depois limpará)
        localStorage.setItem('selectedDate', formattedDate);
        localStorage.setItem('selectedTime', selectedTime);
        // Os IDs de serviço e barbeiro já estão no localStorage, mas para clareza, podemos garantir que estejam lá
        localStorage.setItem('selectedServiceIds', JSON.stringify(selectedServiceIds));
        localStorage.setItem('selectedBarberId', selectedBarberId);


        // Navega para a tela de confirmação
        navigate('/ConfirmacaoAgendamento');
    };

    // Função auxiliar para formatar a data para exibição no botão
    const formatDateButton = (date) => {
        const options = { weekday: 'short', day: 'numeric', month: 'short' };
        return date.toLocaleDateString('pt-BR', options).replace('.', ''); // Remove o ponto do short weekday
    };

    return (
        <div style={styles.container}>
            {/* Botão de Voltar */}
            <div style={styles.backButtonContainer}>
                <Link to="/Barbeiros" style={styles.backButton}> {/* Volta para a tela de Barbeiros */}
                    <img src={backArrowIcon} alt="Voltar" style={styles.backIcon} />
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
                        <button onClick={handleLogout} style={styles.logoutButton}>Deslogar</button>
                    </div>
                )}
            </div>

            <main style={styles.mainContent}>
                <section style={styles.hero}>
                    <h1 style={styles.title}>SELECIONE <br /> <span style={styles.highlight}>DATA E HORA</span></h1>
                    <p style={styles.description}>
                        Escolha a data e o horário que melhor se encaixa na sua rotina.
                    </p>
                </section>

                <section style={styles.selectionCard}>
                    <h2 style={styles.cardTitle}>Escolha a Data</h2>
                    <div style={styles.dateGrid}>
                        {weekdays.map((date, index) => (
                            <button
                                key={index}
                                style={{
                                    ...styles.dateButton,
                                    ...(selectedDate && selectedDate.toDateString() === date.toDateString() ? styles.dateButtonSelected : {})
                                }}
                                onClick={() => handleDateSelect(date)}
                            >
                                {formatDateButton(date)}
                            </button>
                        ))}
                    </div>
                </section>

                <section style={styles.selectionCard}>
                    <h2 style={styles.cardTitle}>Escolha o Horário</h2>
                    <div style={styles.timeGrid}>
                        {fixedAvailableTimes.length > 0 ? (
                            fixedAvailableTimes.map((time, index) => (
                                <button
                                    key={index}
                                    style={{
                                        ...styles.timeButton,
                                        ...(selectedTime === time ? styles.timeButtonSelected : {}),
                                        // Desabilita os botões de horário se nenhuma data foi selecionada
                                        ...(selectedDate === null ? styles.timeButtonDisabled : {})
                                    }}
                                    onClick={() => handleTimeSelect(time)}
                                    disabled={selectedDate === null} // Desabilita se nenhuma data foi selecionada
                                >
                                    {time}
                                </button>
                            ))
                        ) : (
                            <p style={styles.noTimes}>Nenhum horário disponível para esta data.</p>
                        )}
                    </div>
                    {!selectedDate && (
                        <p style={styles.selectDateFirst}>Por favor, selecione uma data primeiro para ver os horários.</p>
                    )}
                </section>

                <section style={styles.confirmButtonSection}>
                    <button
                        style={{
                            ...styles.confirmButton,
                            ...(selectedDate === null || selectedTime === '' ? styles.confirmButtonDisabled : {})
                        }}
                        onClick={handleConfirmBooking}
                        disabled={selectedDate === null || selectedTime === ''}
                    >
                        Confirmar Agendamento
                    </button>
                </section>
            </main>
        </div>
    );
}

// Estilos (Adaptados da imagem fornecida, com alteração no profileIcon)
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
    myAppointmentsButton: { // Estilo adicionado para o botão "Meus Agendamentos"
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
        marginBottom: '10px', // Adicionado para espaçar do botão de logout
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
        alignItems: 'center',
        width: '100%',
        maxWidth: '700px', // Ajustado para a largura da imagem
        paddingTop: '80px',
        boxSizing: 'border-box',
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
    description: {
        fontSize: '1em',
        color: '#aaaaaa',
        maxWidth: '600px',
        lineHeight: '1.6',
    },
    selectionCard: {
        backgroundColor: '#2e2e4e',
        borderRadius: '15px',
        padding: '30px',
        width: 'calc(100% - 40px)', // Para preencher a largura com padding
        maxWidth: '600px', // Ajusta ao container principal
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '30px',
        textAlign: 'center',
    },
    cardTitle: {
        fontSize: '1.6em',
        color: '#00bcd4',
        marginBottom: '25px',
        textTransform: 'uppercase',
    },
    dateGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', // Ajusta o número de colunas
        gap: '15px',
        width: '100%',
        justifyContent: 'center',
    },
    dateButton: {
        backgroundColor: '#4a4a6e',
        color: 'white',
        padding: '15px 10px',
        borderRadius: '10px',
        border: 'none',
        fontSize: '1em',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: '#5a5a7e',
        },
    },
    dateButtonSelected: {
        backgroundColor: '#00ff00', // Verde vibrante para selecionado
        color: '#1a1a2e',
    },
    timeGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', // Ajusta para mais botões
        gap: '15px',
        width: '100%',
        justifyContent: 'center',
    },
    timeButton: {
        backgroundColor: '#4a4a6e',
        color: 'white',
        padding: '15px 10px',
        borderRadius: '10px',
        border: 'none',
        fontSize: '1em',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: '#5a5a7e',
        },
    },
    timeButtonSelected: {
        backgroundColor: '#00ff00', // Verde vibrante para selecionado
        color: '#1a1a2e',
    },
    timeButtonDisabled: {
        backgroundColor: '#3a3a5e',
        color: '#888888',
        cursor: 'not-allowed',
        opacity: 0.6,
    },
    noTimes: {
        color: '#aaaaaa',
        fontSize: '1em',
        marginTop: '10px',
    },
    selectDateFirst: {
        color: '#aaaaaa',
        fontSize: '0.9em',
        marginTop: '20px',
    },
    confirmButtonSection: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '50px',
    },
    confirmButton: {
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
    confirmButtonDisabled: {
        backgroundColor: '#00bcd480',
        cursor: 'not-allowed',
    },
};

export default AgendaData;
