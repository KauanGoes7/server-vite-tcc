// src/pages/Register/index.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Importe a imagem da logo Agenda Corte
import agendaCorteLogo from '../../assets/login/image 4-Photoroom 2.png'; 

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false); 
    const [error, setError] = useState(''); 
    const navigate = useNavigate();

    const handleRegister = (e) => { 
        e.preventDefault(); 

        setError(''); 
        setRegistrationSuccess(false); 

        if (!name || !email || !password) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        // --- SIMULAÇÃO DE REGISTRO SEM BACKEND ---
        // Salva os dados do usuário no localStorage para simular o registro.
        // Em um cenário real, a senha NUNCA seria salva em texto puro.
        // Aqui, para a demonstração, salvamos para permitir o login 'local'.
        const demoUser = {
            id: Date.now(), // Um ID único simples
            name: name,
            email: email,
            password: password // Salvar a senha em texto puro AQUI APENAS PARA FINS DE DEMONSTRAÇÃO LOCAL.
                               // NUNCA faça isso em produção!
        };

        // Salva o usuário demo no localStorage.
        // O key 'demoRegisteredUser' pode ser usado pelo login.
        localStorage.setItem('demoRegisteredUser', JSON.stringify(demoUser));

        setRegistrationSuccess(true); 

        setTimeout(() => {
            setRegistrationSuccess(false); 
            navigate('/login'); 
        }, 2000); 
    };

    return (
        <div style={styles.container}>
            <div style={styles.contentWrapper}> 
                <div style={styles.logoContainer}>
                    <img src={agendaCorteLogo} alt="Agenda Corte Logo" style={styles.logoImage} />
                </div>

                <main style={styles.mainContent}>
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
                </main>
            </div>
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
    mainContent: {
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
        backgroundColor: '#00bcd4',
        color: 'white',
        padding: '12px 20px',
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
};

export default Register;