// src/pages/Apresentacao/index.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// Importar as imagens para esta página
import logoPrincipal from '../../assets/apresentacao/image 4-Photoroom 2.png'; // Logo principal
import backArrowIcon from '../../assets/apresentacao/seta-para-a-esquerda 3.png'; // Botão de voltar
import suportIcon from '../../assets/apresentacao/suport.png'; // Ícone de suporte
import corteImage from '../../assets/apresentacao/corte.png'; // Nova imagem de corte 1
import corte2Image from '../../assets/apresentacao/corte2.png'; // Nova imagem de corte 2

function Apresentacao() {
    return (
        <div style={styles.container}>
            {/* Header com botões de voltar e suporte */}
            <header style={styles.header}>
                <Link to="/home" style={styles.headerIconContainer}>
                    <img src={backArrowIcon} alt="Voltar" style={styles.headerIcon} />
                </Link>
                <Link to="/contact" style={styles.headerIconContainer}>
                    <img src={suportIcon} alt="Suporte" style={styles.headerIcon} />
                </Link>
            </header>

            {/* Container para a logo principal */}
            <div style={styles.logoContainer}>
                <img src={logoPrincipal} alt="Agenda Corte Barbearia Logo" style={styles.mainLogo} />
            </div>

            {/* Conteúdo da Apresentação */}
            <div style={styles.content}>
                <h1 style={styles.title}>Bem-vindo à Experiência Agenda Corte</h1>
                <p style={styles.subtitle}>Mais do que um corte, um estilo de vida.</p>
                
                {/* Botão de login moderno */}
                <Link to="/login" style={styles.loginButton}>
                    Agende seu horário
                </Link>

                <div style={styles.imageRow}>
                    <img src={corteImage} alt="Corte de Cabelo Moderno" style={styles.haircutImage} />
                    <img src={corte2Image} alt="Corte de Cabelo Clássico" style={styles.haircutImage} />
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>Nossa História</h2>
                    <p style={styles.paragraph}>
                        O nosso projeto deu início dia 10 de junho de 2025, com o surgimento do
                        trabalho final do curso de Tec. Desenvolvimento de Sistemas o Tcc
                        demoramos um pouco para decidir o "Tema" mais então começamos o
                        projeto Agendamento de Corte Online que foi pensado para facilitar o
                        agendamento de Corte de cabelo e Barba Online. Assim com cada um de
                        nós & Alisson, Kauan, Vitor e Luca se dividindo em tarefas para o
                        desenvolvimento do projeto.
                    </p>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>Nossos Valores</h2>
                    <ul style={styles.list}>
                        <li style={styles.listItem}>
                            <strong>Excelência:</strong> Buscamos a perfeição em cada serviço, da tesoura ao atendimento.
                        </li>
                        <li style={styles.listItem}>
                            <strong>Tradição:</strong> Honramos as raízes da barbearia, utilizando técnicas clássicas e produtos de qualidade.
                        </li>
                        <li style={styles.listItem}>
                            <strong>Inovação:</strong> Estamos sempre atualizados com as últimas tendências e tecnologias do mercado.
                        </li>
                        <li style={styles.listItem}>
                            <strong>Respeito:</strong> Valorizamos cada cliente, oferecendo um ambiente acolhedor e profissional.
                        </li>
                        <li style={styles.listItem}>
                            <strong>Paixão:</strong> Amamos o que fazemos e isso se reflete em nosso trabalho.
                        </li>
                    </ul>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>Um Ambiente, Uma Experiência Única</h2>
                    <p style={styles.paragraph}>
                        No Agenda Corte, cada detalhe do nosso espaço foi cuidadosamente planejado para
                        oferecer mais do que um serviço: uma verdadeira experiência de conforto e
                        exclusividade. Relaxe em nossas poltronas clássicas, desfrute de um café ou bebida
                        especial e permita-se um momento de cuidado e rejuvenescimento. Nosso ambiente é
                        um refúgio onde a tradição e o bom gosto se encontram.
                    </p>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>Nosso Compromisso com Você</h2>
                    <p style={styles.paragraph}>
                        No Agenda Corte, seu conforto e satisfação são nossa prioridade. Utilizamos apenas
                        produtos de alta qualidade, garantindo não só um visual impecável, mas também a
                        saúde e o cuidado da sua pele e cabelo. Venha desfrutar de um momento só seu,
                        um ambiente pensado para o seu relaxamento e estilo.
                        Estamos ansiosos para te receber e fazer parte da sua rotina de cuidados!
                    </p>
                </div>
            </div>
            
            {/* Footer na parte inferior */}
            <footer style={styles.footer}>
                <p style={styles.footerText}>Agenda Corte © 2025 - Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}

// Estilos para o componente Apresentacao
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#1a1a2e',
        color: 'white',
        alignItems: 'center', // Centraliza o conteúdo horizontalmente
        boxSizing: 'border-box',
        width: '100%',
        overflowY: 'auto', // Permite rolagem vertical no container da página
    },
    header: {
        width: '100%',
        padding: '20px',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'space-between', // Alinha os ícones nas extremidades
        alignItems: 'center',
        backgroundColor: '#2e2e4e', // Cor igual à do footer
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
        width: '30px',
        height: '30px',
        objectFit: 'contain',
    },
    logoContainer: {
        width: '100%',
        padding: '10px 0',
        display: 'flex',
        justifyContent: 'center', // Centraliza a logo
    },
    mainLogo: {
        maxWidth: '200px',
        height: 'auto',
        objectFit: 'contain',
    },
    content: {
        width: '100%',
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px 20px 40px 20px',
        boxSizing: 'border-box',
    },
    title: {
        fontSize: '2.5em',
        marginBottom: '10px',
        color: '#00bcd4',
    },
    subtitle: {
        fontSize: '1.2em',
        marginBottom: '20px',
        color: '#aaaaaa',
    },
    loginButton: {
        display: 'inline-block',
        padding: '15px 30px',
        fontSize: '1.2em',
        fontWeight: 'bold',
        textDecoration: 'none',
        color: 'white',
        backgroundColor: '#00bcd4',
        borderRadius: '50px', // Borda mais arredondada para um visual "moderno"
        background: 'linear-gradient(45deg, #00bcd4, #00796b)', // Gradiente para um toque de modernidade
        boxShadow: '0 4px 15px rgba(0, 188, 212, 0.4)',
        transition: 'all 0.3s ease',
        marginTop: '20px',
        marginBottom: '40px',
        cursor: 'pointer',
    },
    imageRow: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around',
        marginBottom: '30px',
    },
    haircutImage: {
        maxWidth: '350px',
        height: 'auto',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        objectFit: 'cover',
    },
    section: {
        marginBottom: '40px',
        width: '100%',
        padding: '0 20px',
        boxSizing: 'border-box',
    },
    sectionTitle: {
        fontSize: '1.8em',
        marginBottom: '20px',
        color: '#00bcd4',
        borderBottom: '2px solid #00bcd4',
        paddingBottom: '10px',
        display: 'inline-block',
    },
    paragraph: {
        fontSize: '1em',
        lineHeight: '1.6',
        textAlign: 'justify',
        marginBottom: '15px',
    },
    list: {
        listStyle: 'none',
        padding: '0',
        textAlign: 'left',
    },
    listItem: {
        fontSize: '1em',
        lineHeight: '1.8',
        marginBottom: '10px',
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
    }
};

export default Apresentacao;