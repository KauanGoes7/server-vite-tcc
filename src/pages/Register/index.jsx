// src/pages/Register/index.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Importe as imagens da tela de Apresentação para o header/footer
import logoPrincipal from '../../assets/apresentacao/image 4-Photoroom 2.png'; // Logo principal
import backArrowIcon from '../../assets/apresentacao/seta-para-a-esquerda 3.png'; // Botão de voltar
import suportIcon from '../../assets/apresentacao/suport.png'; // Ícone de suporte

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Garante que useNavigate está importado

    const handleRegister = (e) => {
        e.preventDefault();

        setError('');
        setRegistrationSuccess(false);

        if (!name || !email || !password) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        // --- SIMULAÇÃO DE REGISTRO SEM BACKEND ---
        const demoUser = {
            id: Date.now(),
            name: name,
            email: email,
            password: password
        };

        localStorage.setItem('demoRegisteredUser', JSON.stringify(demoUser));

        setRegistrationSuccess(true);

        setTimeout(() => {
            setRegistrationSuccess(false);
            navigate('/login');
        }, 2000);
    };

    return (
        <div style={styles.container}>
            {/* Header com botões de voltar e suporte */}
            <header style={styles.header}>
                {/* O botão de 'Voltar' agora usa navigate(-1) para voltar à página anterior */}
                <button onClick={() => navigate(-1)} style={styles.headerIconButton}>
                    <img src={backArrowIcon} alt="Voltar" style={styles.headerIcon} />
                </button>
                {/* O link de 'Suporte' permanece o mesmo */}
                <Link to="/contact" style={styles.headerIconContainer}>
                    <img src={suportIcon} alt="Suporte" style={styles.headerIcon} />
                </Link>
            </header>

            {/* Conteúdo principal (contentWrapper) */}
            <main style={styles.mainContent}>
                <div style={styles.contentWrapper}>
                    <div style={styles.logoContainer}>
                        <img src={logoPrincipal} alt="Agenda Corte Logo" style={styles.logoImage} /> {/* Usando logoPrincipal */}
                    </div>

                    <div style={styles.registerFormContainer}> {/* Novo container para o formulário */}
                        <section style={styles.heroSection}>
                            <h1 style={styles.title}>CRIE SUA CONTA</h1>
                            <p style={styles.subtitle}>Junte-se à nossa comunidade e agende seus serviços!</p>
                        </section>

                        {error && (
                            <div style={styles.errorMessage}>
                                <p>{error}</p>
                            </div>
                        )}

                        {registrationSuccess && (
                            <div style={styles.successMessage}>
                                <p>Cadastro realizado com sucesso!</p>
                                <p>Redirecionando para a página de login...</p>
                            </div>
                        )}

                        <form style={styles.form} onSubmit={handleRegister}>
                            <input
                                type="text"
                                placeholder="Nome Completo"
                                style={styles.input}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                style={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Senha"
                                style={styles.input}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button type="submit" style={styles.registerButton}>
                                Registrar
                            </button>
                        </form>

                        <p style={styles.loginLinkText}>
                            Já tem uma conta?{' '}
                            <Link to="/login" style={styles.loginLink}>
                                Faça login
                            </Link>
                        </p>
                    </div>
                </div>
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
        flexDirection: 'column', // Empilha header, mainContent e footer
        minHeight: '100vh',
        backgroundColor: '#1a1a2e',
        color: 'white',
        boxSizing: 'border-box',
        width: '100%',
        overflowY: 'auto', // Permite rolagem se o conteúdo for muito grande
    },
    // Estilos do Header (copiados de Apresentacao)
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
    headerIconContainer: { // Mantido para o ícone de suporte (Link)
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
    // Estilos para o conteúdo principal para que ele ocupe o espaço restante
    mainContent: {
        flexGrow: 1, // Faz com que ocupe o espaço disponível
        display: 'flex',
        flexDirection: 'column', // Para centralizar o contentWrapper
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        boxSizing: 'border-box',
    },
    contentWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '50px',
        flexWrap: 'wrap',
        width: '100%', // Garante que o wrapper use a largura total para centralização
        maxWidth: '900px', // Limita a largura do conteúdo para melhor leitura
    },
    logoContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    },
    logoImage: {
        width: '350px',
        height: 'auto',
    },
    registerFormContainer: { // Novo estilo para o container do formulário
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '400px',
        padding: '40px',
        backgroundColor: '#2e2e4e',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
        textAlign: 'center',
    },
    heroSection: {
        marginBottom: '30px',
    },
    title: {
        fontSize: '2.2em',
        marginBottom: '10px',
        color: 'white',
    },
    subtitle: {
        fontSize: '1em',
        color: '#aaaaaa',
        lineHeight: '1.6',
    },
    successMessage: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
        width: '100%',
        boxSizing: 'border-box',
        textAlign: 'center',
        fontWeight: 'bold',
        animation: 'fadeIn 0.5s',
    },
    errorMessage: {
        backgroundColor: '#FF6347',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
        width: '100%',
        boxSizing: 'border-box',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    form: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        marginBottom: '20px',
    },
    input: {
        width: 'calc(100% - 20px)',
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
    registerButton: {
        width: 'calc(100% - 40px)', // Ajusta a largura para que o conteúdo + padding corresponda aos inputs
        padding: '12px 20px',
        backgroundColor: '#00bcd4',
        color: 'white',
        borderRadius: '8px',
        border: 'none',
        fontSize: '1.1em',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease',
        '&:hover': {
            backgroundColor: '#009aae',
        },
    },
    loginLinkText: {
        fontSize: '0.9em',
        color: '#aaaaaa',
    },
    loginLink: {
        color: '#00bcd4',
        textDecoration: 'none',
        fontWeight: 'bold',
        transition: 'color 0.3s ease',
        '&:hover': {
            color: '#009aae',
        },
    },
    // Estilos do Footer (copiados de Apresentacao)
    footer: {
        width: '100%',
        backgroundColor: '#2e2e4e',
        color: '#888',
        textAlign: 'center',
        padding: '20px',
    },
    footerText: {
        margin: '0',
        fontSize: '0.9em',
    }
};

export default Register;
