// src/pages/Services/index.jsx 
import React, { useState, useContext } from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { AuthContext } from '../../App'; // Para pegar o user logado e o logout 

// Ícones de imagem 
import backArrowIcon from '../../assets/servicos/seta-para-a-esquerda 3.png'; 
import profileIcon from '../../assets/servicos/usuario-de-perfil 2.png'; 
import scissorsIcon from '../../assets/servicos/scissors 1.png'; 
import beardIcon from '../../assets/servicos/beard 1.png'; 
import barberiaIcon from '../../assets/servicos/barbearia 1.png'; 

function Services() { 
    const { user, logout } = useContext(AuthContext); 
    const navigate = useNavigate(); 
    const [showProfilePopup, setShowProfilePopup] = useState(false); 

    // Dados dos serviços HARDCODED, exatamente como nas imagens fornecidas 
    const hardcodedServices = [ 
        { Id: 1, Tema: "Corte", NomeServico: "MID FADE + RISQUINHO NA NAVALHA", Descricao: "Degradê médio + detalhe fino na navalha (lados bem alinhados, transição suave)." }, 
        { Id: 2, Tema: "Corte", NomeServico: "LOW FADE + TOPO TEXTURIZADO", Descricao: "Degradê baixo + topo com tesoura para volume natural (versátil para qualquer ocasião)." }, 
        { Id: 3, Tema: "Corte", NomeServico: "BUZZ CUT + LINHA DE CONTORNO", Descricao: "Corte máquina rente + linha de contorno nítida (estilo limpo e moderno)." }, 
        { Id: 4, Tema: "Barba", NomeServico: "BARBA DEGRADÊ + DESENHOS", Descricao: "Degradê perfeito dos lados + detalhes artísticos (linhas geométricas ou símbolos personalizados)." }, 
        { Id: 5, Tema: "Barba", NomeServico: "STUBLE TEXTURIZADO", Descricao: "Barba rala aparada com precisão (3mm-5mm) contorno definido (estilo 'homem moderno')" }, 
        { Id: 6, Tema: "Barba", NomeServico: "VAN DYKE", Descricao: "Bigode separado + cavanhaque alongado (toque vintage e sofisticado)." }, 
        { Id: 7, Tema: "Corte e Barba", NomeServico: "O CLÁSSICO RENOVADO", Descricao: "Degradê perfeito dos lados + detalhes artísticos (linhas geométricas ou símbolos personalizados)." }, 
        { Id: 8, Tema: "Corte e Barba", NomeServico: "O REBELDE CONTROLADO", Descricao: "Barba: Dutch beard (laterais quadradas)" }, 
        { 
            Id: 9, 
            Tema: "Corte e Barba", 
            NomeServico: "O MINIMALISTA SOFISTICADO", 
            Descricao: "Barba: Circle beard (3cm de comprimento), (Cortes como o Buzz Cut, Caesar, Undercut com degradê e cortes com laterais raspadas)." 
        }, 
    ]; 

    // Estado para armazenar o ID do serviço SELECIONADO ATUALMENTE (apenas um)
    const [selectedServiceId, setSelectedServiceId] = useState(null); 

    const handleLogout = () => { 
        logout(); // Limpa o estado do usuário e o localStorage 
        navigate('/login'); // Redireciona para a tela de login 
    }; 

    // Função para navegar para Meus Agendamentos 
    const handleMyAppointments = () => { 
        navigate('/meus-agendamentos'); 
        setShowProfilePopup(false); // Fecha o popup após navegar 
    }; 

    // Função para navegar para a página de Contato
    const handleContact = () => {
        navigate('/contact'); // Supondo que você tenha uma rota '/contact'
        setShowProfilePopup(false); // Fecha o popup após navegar
    };

    // Função para lidar com a seleção de UM ÚNICO serviço
    const handleServiceSelect = (serviceId) => { 
        // Se o serviço clicado já estiver selecionado, desseleciona.
        // Caso contrário, seleciona o novo serviço.
        setSelectedServiceId(prevSelectedId => 
            prevSelectedId === serviceId ? null : serviceId 
        );
    }; 

    // Verifica se um serviço está selecionado (usando o ID único)
    const isServiceSelected = (serviceId) => { 
        return selectedServiceId === serviceId; 
    }; 

    const handleContinue = () => { 
        // Obter o ID do serviço selecionado
        const selectedServicesToPass = selectedServiceId ? [selectedServiceId] : [];

        if (selectedServicesToPass.length === 0) { 
            alert('Por favor, selecione pelo menos um serviço para continuar.'); 
            return; 
        } 

        // Salvar o ID do serviço selecionado no localStorage 
        localStorage.setItem('selectedServiceIds', JSON.stringify(selectedServicesToPass)); 

        // NAVEGAR PARA A PRÓXIMA PÁGINA: TELA DE BARBEIROS! 
        navigate('/Barbers'); 
    }; 

    // Mapeamento dos temas para os dados dos cards fixos 
    const serviceCardsData = [ 
        { 
            title: "Corte", 
            icon: scissorsIcon, 
            theme: "Corte", 
        }, 
        { 
            title: "Barba", 
            icon: beardIcon, 
            theme: "Barba", 
        }, 
        { 
            title: "Corte + Barba", 
            icon: barberiaIcon, 
            theme: "Corte e Barba", 
        } 
    ]; 

    return ( 
        <div style={styles.servicosContainer}> 
            {/* Botão de Voltar */} 
            <div style={styles.backButtonContainer}> 
                <Link to="/home" style={styles.backButton}> 
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
                        <button onClick={handleMyAppointments} style={styles.myAppointmentsButton}> 
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

            <main style={styles.servicosMainContent}> 
                <section style={styles.servicosHero}> 
                    <h1 style={styles.servicosTitle}> 
                        BEM VINDO <span style={styles.userHighlight}>{user?.name?.toUpperCase() || 'USER'}</span>! 
                    </h1> 
                    <p style={styles.servicosDescription}>
                        No Agenda Corte, você agenda seus cortes de cabelo, barba e tratamentos de forma rápida, fácil e sem complicação. 
                        Escolha o horário perfeito, o profissional preferido e receba lembretes automáticos — tudo na palma da sua mão! 
                    </p> 
                    {/* MENSAGEM ATUALIZADA AQUI */}
                    <p style={styles.whatsappMessage}>
                        Caso queira escolher outro serviço que não está listado, entre em contato via WhatsApp.
                    </p>
                </section> 

                <section style={styles.servicosCategories}> 
                    {serviceCardsData.map((card, cardIndex) => ( 
                        <div key={cardIndex} style={styles.serviceCard}> 
                            <div style={styles.serviceIconCircle}> 
                                <img 
                                    src={card.icon} 
                                    alt={`Ícone ${card.title}`} 
                                    style={styles.cardImage} 
                                /> 
                            </div> 
                            <h2 style={styles.serviceCardTitle}>{card.title}</h2> 
                            <ul style={styles.serviceList}> 
                                {hardcodedServices 
                                    .filter(service => service.Tema === card.theme) 
                                    .map((service) => ( 
                                        <li 
                                            key={service.Id} 
                                            onClick={() => handleServiceSelect(service.Id)} 
                                            style={styles.serviceListItem} 
                                        > 
                                            <span 
                                                style={{ 
                                                    ...styles.radioCircle, 
                                                    ...(isServiceSelected(service.Id) ? styles.radioCircleSelected : {}) 
                                                }} 
                                            ></span> 
                                            {service.NomeServico} 
                                            {service.Descricao && `\n${service.Descricao}`} 
                                        </li> 
                                    ))} 
                            </ul> 
                        </div> 
                    ))} 
                </section> 

                <section style={styles.continueButtonSection}> 
                    <button 
                        style={{ 
                            ...styles.continueButton, 
                            ...(selectedServiceId === null ? styles.continueButtonDisabled : {}) 
                        }} 
                        onClick={handleContinue} 
                        disabled={selectedServiceId === null} 
                    > 
                        Continua 
                    </button> 
                </section> 
            </main> 
        </div> 
    ); 
} 

// Estilos 
const styles = { 
    servicosContainer: { 
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
    servicosMainContent: { 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        width: '100%', 
        maxWidth: '1200px', 
        paddingTop: '80px', 
        boxSizing: 'border-box', 
    }, 
    servicosHero: { 
        textAlign: 'center', 
        marginBottom: '50px', 
        padding: '0 20px', 
    }, 
    servicosTitle: { 
        fontSize: '2.5em', 
        marginBottom: '10px', 
        color: 'white', 
    }, 
    userHighlight: { 
        color: '#00bcd4', 
    }, 
    servicosDescription: { 
        fontSize: '1em', 
        color: '#cccccc', 
        maxWidth: '800px', 
        lineHeight: '1.6', 
    }, 
    // ESTILO ATUALIZADO PARA A MENSAGEM DO WHATSAPP
    whatsappMessage: {
        fontSize: '0.95em',
        color: 'white', // Cor vermelha (nem muito escura, nem muito clara)
        marginTop: '20px',
        marginBottom: '20px',
        maxWidth: '600px',
        lineHeight: '1.5',
        padding: '10px 20px',
        backgroundColor: '#3a3a5e',
        borderRadius: '8px',
        border: '1px solid rgb(0, 187, 212)', // Borda com a mesma cor
        textAlign: 'center', // Garante que o texto dentro seja centralizado
        margin: '20px auto', // Centraliza o bloco da mensagem horizontalmente
    },
    servicosCategories: { 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        gap: '40px', 
        marginBottom: '60px', 
        width: '100%', 
        padding: '0 20px', 
        boxSizing: 'border-box', 
    }, 
    serviceCard: { 
        backgroundColor: '#11111aff', 
        borderRadius: '15px', 
        padding: '30px', 
        width: '350px', 
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        textAlign: 'center', 
        position: 'relative', 
    }, 
    serviceIconCircle: { 
        backgroundColor: '#00bcd4', 
        borderRadius: '50%', 
        width: '80px', 
        height: '80px', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginBottom: '20px', 
    }, 
    cardImage: { 
        width: '50px', 
        height: '50px', 
        objectFit: 'contain', 
    }, 
    serviceCardTitle: { 
        fontSize: '2em', 
        color: 'white', 
        marginBottom: '25px', 
    }, 
    serviceList: { 
        listStyle: 'none', 
        padding: '0', 
        margin: '0', 
        width: '100%', 
        textAlign: 'left', 
        flexGrow: 1, 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    }, 
    serviceListItem: { 
        display: 'flex', 
        alignItems: 'flex-start', 
        marginBottom: '15px', 
        cursor: 'pointer', 
        lineHeight: '1.4', 
        fontSize: '1.1em', 
        color: '#cccccc', 
        whiteSpace: 'pre-wrap', 
    }, 
    radioCircle: { 
        width: '18px', 
        height: '18px', 
        borderRadius: '50%', 
        border: '2px solid #888888', 
        marginRight: '12px', 
        flexShrink: 0, 
        boxSizing: 'border-box', 
        transition: 'background-color 0.2s ease, border-color 0.2s ease', 
        marginTop: '3px', 
    }, 
    radioCircleSelected: { 
        backgroundColor: '#00ff00', 
        borderColor: '#00ff00', 
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

export default Services;
