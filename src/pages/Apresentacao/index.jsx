// src/pages/Apresentacao/index.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// Importar as imagens para esta página
import logoPrincipal from '../../assets/apresentacao/image 4-Photoroom 2.png'; // Logo principal
import backArrowIcon from '../../assets/apresentacao/seta-para-a-esquerda 3.png'; // Botão de voltar

function Apresentacao() {
    return (
        <div style={styles.container}>
            {/* Cabeçalho superior com o botão de voltar */}
            <div style={styles.topHeader}>
                <Link to="/home" style={styles.backButton}>
                    <img src={backArrowIcon} alt="Voltar" style={styles.backIcon} />
                </Link>
            </div>

            {/* Logo principal centralizada e em destaque */}
            <div style={styles.mainLogoContainer}>
                <img src={logoPrincipal} alt="Agenda Corte Barbearia Logo" style={styles.mainLogo} />
            </div>

            {/* Conteúdo da Apresentação */}
            <div style={styles.content}>
                <h1 style={styles.title}>Bem-vindo à Experiência Agenda Corte</h1>
                <p style={styles.subtitle}>Mais do que um corte, um estilo de vida.</p>

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
                            <strong>**Excelência:**</strong> Buscamos a perfeição em cada serviço, da tesoura ao atendimento.
                        </li>
                        <li style={styles.listItem}>
                            <strong>**Tradição:**</strong> Honramos as raízes da barbearia, utilizando técnicas clássicas e produtos de qualidade.
                        </li>
                        <li style={styles.listItem}>
                            <strong>**Inovação:**</strong> Estamos sempre atualizados com as últimas tendências e tecnologias do mercado.
                        </li>
                        <li style={styles.listItem}>
                            <strong>**Respeito:**</strong> Valorizamos cada cliente, oferecendo um ambiente acolhedor e profissional.
                        </li>
                        <li style={styles.listItem}>
                            <strong>**Paixão:**</strong> Amamos o que fazemos e isso se reflete em nosso trabalho.
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
        </div>
    );
}

// Estilos para o componente Apresentacao
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // Garante que o container ocupe pelo menos a altura da viewport
        backgroundColor: '#1a1a2e',
        color: 'white',
        alignItems: 'center', // Centraliza o conteúdo horizontalmente
        padding: '0px',
        boxSizing: 'border-box',
        width: '100%',
        overflowY: 'auto', // Permite rolagem vertical no container da página
    },
    topHeader: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        padding: '20px',
        boxSizing: 'border-box',
    },
    backButton: {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'white',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        // Margens negativas para garantir que vá bem para o canto, se necessário
        marginTop: '-10px',
        marginLeft: '-10px',
    },
    backIcon: {
        width: '30px',
        height: '30px',
        objectFit: 'contain',
    },
    mainLogoContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '0px',
        paddingBottom: '30px',
    },
    mainLogo: {
        maxWidth: '300px',
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
        padding: '0 20px 40px 20px', // Adicionado padding inferior para o conteúdo
        boxSizing: 'border-box',
    },
    title: {
        fontSize: '2.5em',
        marginBottom: '10px',
        color: '#00bcd4',
    },
    subtitle: {
        fontSize: '1.2em',
        marginBottom: '40px',
        color: '#aaaaaa',
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
};

export default Apresentacao;