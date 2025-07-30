import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Garante que useNavigate está importado
import { AuthContext } from '../../App';

// Ícones de navegação (reutilizados)
import backArrowIcon from '../../assets/servicos/seta-para-a-esquerda 3.png';
import profileIcon from '../../assets/servicos/usuario-de-perfil 2.png';



// Ícones de contato e redes sociais (CAMINHOS ATUALIZADOS)
import whatsappIcon from '../../assets/contato/whatsapp.png';
import instagramIcon from '../../assets/contato/instagram.png';
import twitterIcon from '../../assets/contato/twitter (1).png'; // Note 'twitter (1).png'
import facebookIcon from '../../assets/contato/facebook.png';

function Contato() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showProfilePopup, setShowProfilePopup] = useState(false);

    const [tema, setTema] = useState('');
    const [assunto, setAssunto] = useState('');

    // Número de WhatsApp fictício para demonstração
    const whatsappNumber = '5511999998888'; // Ex: +55 (DDD) 9XXXX-XXXX

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleMyAppointments = () => {
        navigate('/meus-agendamentos');
        setShowProfilePopup(false);
    };

    const handleContact = () => {
        // Já está na página de Contato
        setShowProfilePopup(false);
    };

    const handleSendWhatsApp = () => {
        if (!tema || !assunto) {
            alert('Por favor, preencha o tema e o assunto para enviar a mensagem.');
            return;
        }

        const message = `Tema: ${tema}\nAssunto: ${assunto}`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank'); // Abre o WhatsApp em uma nova aba
    };

    return (
        <div style={styles.container}>
            {/* Header com botões de voltar e perfil */}
            <header style={styles.header}>
                {/* Botão de Voltar - Agora usa navigate(-1) */}
                <button onClick={() => navigate(-1)} style={styles.headerIconButton}>
                    <img src={backArrowIcon} alt="Voltar" style={styles.headerIcon} />
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
                    <h1 style={styles.title}>ENTRE EM CONTATO</h1>
                    <p style={styles.subtitle}>Fale conosco diretamente pelo WhatsApp!</p>
                </section>

                <section style={styles.whatsappSection}>
                    <img
                        src={whatsappIcon}
                        alt="WhatsApp Icon"
                        style={styles.whatsappIcon}
                    />
                    <input
                        type="text"
                        placeholder="Tema (Ex: Dúvida sobre agendamento)"
                        style={styles.input}
                        value={tema}
                        onChange={(e) => setTema(e.target.value)}
                    />
                    <textarea
                        placeholder="Assunto (Descreva sua solicitação detalhadamente)"
                        style={styles.textarea}
                        rows="5"
                        value={assunto}
                        onChange={(e) => setAssunto(e.target.value)}
                    ></textarea>
                    <button style={styles.sendButton} onClick={handleSendWhatsApp}>
                        Mandar Mensagem
                    </button>
                </section>

                <section style={styles.socialMediaSection}>
                    <p style={styles.socialMediaText}>Acompanhe nossas redes sociais</p>
                    <div style={styles.socialIconsContainer}>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <img
                                src={instagramIcon}
                                alt="Instagram"
                                style={styles.socialIcon}
                            />
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                            <img
                                src={twitterIcon}
                                alt="Twitter"
                                style={styles.socialIcon}
                            />
                        </a>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <img
                                src={facebookIcon} 
                                alt="Facebook"
                                style={styles.socialIcon}
                            />
                        </a>
                    </div>
                </section>
            </main>

            {/* Footer na parte inferior */}
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
    // FIM DOS ESTILOS DO HEADER

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
    heroSection: {
        textAlign: 'center',
        marginBottom: '40px',
        width: '100%',
        maxWidth: '600px',
    },
    title: {
        fontSize: '2.5em',
        marginBottom: '10px',
        color: '#00bcd4',
        lineHeight: '1.2',
    },
    subtitle: {
        fontSize: '1.1em',
        color: '#aaaaaa',
        lineHeight: '1.6',
    },
    whatsappSection: {
        backgroundColor: '#2e2e4e',
        borderRadius: '15px',
        padding: '30px',
        width: '100%',
        maxWidth: '500px',
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '40px',
        boxSizing: 'border-box',
    },
    whatsappIcon: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        marginBottom: '10px',
    },
    input: {
        width: 'calc(100% - 20px)', // Ajusta para padding
        padding: '12px 10px',
        borderRadius: '8px',
        border: '1px solid #4a4a6e',
        backgroundColor: '#1a1a2e',
        color: 'white',
        fontSize: '1em',
        outline: 'none',
        '&::placeholder': {
            color: '#aaaaaa',
        },
    },
    textarea: {
        width: 'calc(100% - 20px)', // Ajusta para padding
        padding: '12px 10px',
        borderRadius: '8px',
        border: '1px solid #4a4a6e',
        backgroundColor: '#1a1a2e',
        color: 'white',
        fontSize: '1em',
        outline: 'none',
        resize: 'vertical', // Permite redimensionar verticalmente
        minHeight: '100px',
        '&::placeholder': {
            color: '#aaaaaa',
        },
    },
    sendButton: {
        backgroundColor: '#25D366', // Cor do WhatsApp
        color: 'white',
        padding: '15px 30px',
        borderRadius: '30px',
        border: 'none',
        fontSize: '1.2em',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
        outline: 'none',
        '&:hover': {
            backgroundColor: '#1EBE52',
            transform: 'scale(1.05)',
        },
    },
    socialMediaSection: {
        width: '100%',
        maxWidth: '500px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '40px', // Espaçamento antes do footer
    },
    socialMediaText: {
        fontSize: '1.1em',
        color: '#cccccc',
        marginBottom: '20px',
    },
    socialIconsContainer: {
        display: 'flex',
        gap: '30px',
    },
    socialIcon: {
        width: '50px',
        height: '50px',
        borderRadius: '50%', // Para ícones redondos
        transition: 'transform 0.2s ease',
        '&:hover': {
            transform: 'scale(1.1)',
        },
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

export default Contato;
