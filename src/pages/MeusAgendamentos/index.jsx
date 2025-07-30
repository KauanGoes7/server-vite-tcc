// src/pages/MeusAgendamentos/index.jsx
import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Garante que useNavigate está importado
import { AuthContext } from '../../App'; // Ajuste o caminho conforme sua estrutura

// Ícones de imagem
import backArrowIcon from '../../assets/servicos/seta-para-a-esquerda 3.png';
import profileIcon from '../../assets/servicos/usuario-de-perfil 2.png';

function MeusAgendamentos() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showProfilePopup, setShowProfilePopup] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [appointmentToCancel, setAppointmentToCancel] = useState(null);
    const [showSuccessToast, setShowSuccessToast] = useState(false); // NOVO: Estado para o toast de sucesso
    const [toastMessage, setToastMessage] = useState(''); // NOVO: Estado para a mensagem do toast

    useEffect(() => {
        // Carrega os agendamentos do localStorage
        const storedAppointments = JSON.parse(localStorage.getItem('userAppointments') || '[]');
        // Filtra para exibir apenas agendamentos 'ativos' e ordena por data/hora
        const activeAppointments = storedAppointments.filter(app => app.status === 'ativo');

        activeAppointments.sort((a, b) => {
            const dateA = new Date(a.data + 'T' + a.hora);
            const dateB = new Date(b.data + 'T' + b.hora);
            return dateA - dateB;
        });

        setAppointments(activeAppointments);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleMyAppointments = () => {
        // Já está na página Meus Agendamentos
        setShowProfilePopup(false);
    };

    const handleContact = () => {
        navigate('/contact');
        setShowProfilePopup(false);
    };

    const handleCancelClick = (appointment) => {
        setAppointmentToCancel(appointment);
        setShowCancelModal(true);
    };

    const confirmCancelAppointment = () => {
        if (appointmentToCancel) {
            let storedAppointments = JSON.parse(localStorage.getItem('userAppointments') || '[]');
            const updatedAppointments = storedAppointments.map(app =>
                app.id === appointmentToCancel.id ? { ...app, status: 'cancelado' } : app
            );
            localStorage.setItem('userAppointments', JSON.stringify(updatedAppointments));

            // Atualiza o estado local para remover o agendamento cancelado
            setAppointments(prevAppointments =>
                prevAppointments.filter(app => app.id !== appointmentToCancel.id)
            );

            setShowCancelModal(false);
            setAppointmentToCancel(null);

            // NOVO: Exibe a mensagem de sucesso
            setToastMessage('Agendamento cancelado com sucesso!');
            setShowSuccessToast(true);
            setTimeout(() => {
                setShowSuccessToast(false);
                setToastMessage('');
            }, 3000); // Esconde o toast após 3 segundos
        }
    };

    const closeCancelModal = () => {
        setShowCancelModal(false);
        setAppointmentToCancel(null);
    };

    const formatDisplayDate = (dateString) => {
        if (!dateString) return 'Data indisponível';
        const [year, month, day] = dateString.split('-').map(Number);
        const date = new Date(year, month - 1, day);
        return date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    };

    return (
        <div style={styles.container}>
            {/* Header com botões de voltar e perfil */}
            <header style={styles.header}>
                {/* Botão de Voltar - Agora usa navigate(-1) */}
                <button onClick={() => navigate(-1)} style={styles.headerIconButton}>
                    <img src={backArrowIcon} alt="Voltar" style={styles.headerIcon} />
                </button>

                {/* Ícone de Perfil e Popup - Agora dentro do header com os novos estilos */}
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
                <h1 style={styles.title}>Meus Agendamentos</h1>

                <section style={styles.appointmentsList}>
                    {appointments.length > 0 ? (
                        appointments.map(appointment => (
                            <div key={appointment.id} style={styles.appointmentCard}>
                                <div style={styles.appointmentDetail}>
                                    <span style={styles.detailLabel}>Data:</span>
                                    <span style={styles.detailValue}>{formatDisplayDate(appointment.data)}</span>
                                </div>
                                <div style={styles.appointmentDetail}>
                                    <span style={styles.detailLabel}>Horário:</span>
                                    <span style={styles.detailValue}>{appointment.hora}</span>
                                </div>
                                <div style={styles.appointmentDetail}>
                                    <span style={styles.detailLabel}>Barbeiro:</span>
                                    <span style={styles.detailValue}>{appointment.barbeiro?.Nome || 'N/A'}</span>
                                </div>
                                <div style={styles.appointmentDetail}>
                                    <span style={styles.detailLabel}>Serviços:</span>
                                    <div style={styles.serviceList}>
                                        {appointment.services?.length > 0 ? (
                                            appointment.services.map((service, idx) => (
                                                <span key={idx} style={styles.serviceTag}>
                                                    {service.NomeServico}
                                                </span>
                                            ))
                                        ) : (
                                            <span style={styles.detailValue}>Nenhum serviço.</span>
                                        )}
                                    </div>
                                </div>
                                <button
                                    style={styles.cancelButton}
                                    onClick={() => handleCancelClick(appointment)}
                                >
                                    Cancelar Agendamento
                                </button>
                            </div>
                        ))
                    ) : (
                        <p style={styles.noAppointmentsMessage}>Você não tem agendamentos ativos.</p>
                    )}
                </section>
            </main>

            {/* Footer na parte inferior */}
            <footer style={styles.footer}>
                <p style={styles.footerText}>Agenda Corte © 2025 - Todos os direitos reservados.</p>
            </footer>

            {/* Modal de Confirmação de Cancelamento */}
            {showCancelModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h2 style={styles.modalTitle}>Confirmar Cancelamento</h2>
                        <p style={styles.modalMessage}>Tem certeza que deseja cancelar este agendamento?</p>
                        <p style={styles.modalDetails}>
                            Data: {formatDisplayDate(appointmentToCancel?.data)}<br />
                            Horário: {appointmentToCancel?.hora}<br />
                            Barbeiro: {appointmentToCancel?.barbeiro?.Nome}
                        </p>
                        <div style={styles.modalButtons}>
                            <button style={styles.modalConfirmButton} onClick={confirmCancelAppointment}>Sim, Cancelar</button>
                            <button style={styles.modalCancelButton} onClick={closeCancelModal}>Não, Manter</button>
                        </div>
                    </div>
                </div>
            )}

            {/* NOVO: Toast de Sucesso */}
            {showSuccessToast && (
                <div style={styles.successToast}>
                    {toastMessage}
                </div>
            )}
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
        alignItems: 'stretch', // Garante que header/main/footer ocupem a largura total
    },
    // ESTILOS DO HEADER (Copiados de outras telas para consistência)
    header: {
        width: '100%',
        padding: '20px',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2e2e4e',
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
        flexGrow: 1, // Ocupa o espaço restante entre o header e o footer
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Centraliza o conteúdo horizontalmente
        width: '100%',
        maxWidth: '700px', // Limita a largura do conteúdo principal
        margin: '0 auto', // Centraliza o mainContent horizontalmente
        padding: '20px', // Adiciona padding geral para o conteúdo
        boxSizing: 'border-box',
    },
    title: {
        fontSize: '2.2em',
        marginBottom: '40px',
        marginTop: '20px', // Ajustado para dar espaço abaixo do header
        textAlign: 'center',
        color: '#00bcd4',
    },
    appointmentsList: {
        width: '100%',
        maxWidth: '600px', // Limita a largura da lista de agendamentos
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        paddingBottom: '50px', // Espaçamento para o final da página
    },
    appointmentCard: {
        backgroundColor: '#2e2e4e',
        borderRadius: '15px',
        padding: '20px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        position: 'relative',
    },
    appointmentDetail: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '1.1em',
        borderBottom: '1px solid #4a4a6e',
        paddingBottom: '5px',
        '&:last-child': {
            borderBottom: 'none',
        },
    },
    detailLabel: {
        fontWeight: 'bold',
        color: '#aaaaaa',
        minWidth: '80px', // Garante alinhamento
    },
    detailValue: {
        color: 'white',
        textAlign: 'right',
        flexGrow: 1,
    },
    serviceList: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        marginTop: '5px',
        justifyContent: 'flex-end',
        flexGrow: 1,
    },
    serviceTag: {
        backgroundColor: '#4a4a6e',
        padding: '5px 10px',
        borderRadius: '5px',
        fontSize: '0.9em',
        color: 'white',
    },
    cancelButton: {
        backgroundColor: '#e74c3c',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '20px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1em',
        fontWeight: 'bold',
        marginTop: '15px',
        transition: 'background-color 0.3s ease',
        '&:hover': {
            backgroundColor: '#c0392b',
        },
    },
    noAppointmentsMessage: {
        color: '#aaaaaa',
        textAlign: 'center',
        fontSize: '1.2em',
        marginTop: '50px',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2000,
    },
    modalContent: {
        backgroundColor: '#2e2e4e',
        padding: '30px',
        borderRadius: '15px',
        textAlign: 'center',
        maxWidth: '400px',
        width: '90%',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
        position: 'relative',
    },
    modalTitle: {
        color: '#00bcd4',
        marginBottom: '20px',
        fontSize: '1.8em',
    },
    modalMessage: {
        color: 'white',
        marginBottom: '15px',
        fontSize: '1.1em',
    },
    modalDetails: {
        color: '#aaaaaa',
        fontSize: '0.9em',
        marginBottom: '25px',
        lineHeight: '1.5',
    },
    modalButtons: {
        display: 'flex',
        justifyContent: 'space-around',
        gap: '15px',
    },
    modalConfirmButton: {
        backgroundColor: '#e74c3c',
        color: 'white',
        padding: '12px 25px',
        borderRadius: '25px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1em',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease',
        '&:hover': {
            backgroundColor: '#c0392b',
        },
    },
    modalCancelButton: {
        backgroundColor: 'transparent',
        color: '#00bcd4',
        padding: '12px 25px',
        borderRadius: '25px',
        border: '1px solid #00bcd4',
        cursor: 'pointer',
        fontSize: '1em',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease, color 0.3s ease',
        '&:hover': {
            backgroundColor: '#00bcd4',
            color: '#1a1a2e',
        },
    },
    successToast: {
        position: 'fixed',
        bottom: '30px',
        left: '50%', // Centraliza horizontalmente
        transform: 'translateX(-50%)', // Ajusta para o centro exato
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '15px 25px',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        zIndex: 3000,
        fontSize: '1.1em',
        animation: 'fadeInOut 3s forwards',
    },
    '@keyframes fadeInOut': { // Ajustado para apenas opacidade
        '0%': { opacity: 0 },
        '10%': { opacity: 1 },
        '90%': { opacity: 1 },
        '100%': { opacity: 0 },
    },
    // ESTILOS DO FOOTER (Copiados de Apresentacao)
    footer: {
        width: '100%',
        backgroundColor: '#2e2e4e',
        color: '#888',
        textAlign: 'center',
        padding: '20px',
        marginTop: 'auto', // Garante que o footer fique na parte inferior
    },
    footerText: {
        margin: '0',
        fontSize: '0.9em',
    },
};

export default MeusAgendamentos;
