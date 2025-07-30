// src/pages/Login/index.jsx
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/api';
import { AuthContext } from '../../App';

// Importações de imagens
import logoAgendaCorte from '../../assets/login/image 4-Photoroom 2.png';
import backArrowIcon from '../../assets/apresentacao/seta-para-a-esquerda 3.png'; // Ícone de voltar
import suportIcon from '../../assets/apresentacao/suport.png'; // Ícone de suporte

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login: authLogin } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        try {
            // TENTATIVA 1: Tentar login com o backend
            const response = await api.post('/login', { email, password });
            const userData = response.data;

            console.log('Resposta do backend no login:', userData);

            if (userData && (userData.id || userData.email)) {
                authLogin(userData);
                navigate('/home');
            } else {
                console.error("Formato de dados do usuário inesperado na resposta do login do backend:", userData);
                setError("Erro inesperado na resposta do servidor. Formato de dados inválido.");
            }

        } catch (err) {
            console.error('Erro no login do backend:', err);

            let backendLoginFailed = false;
            if (err.response) {
                if (err.response.status === 401 || err.response.status === 404) {
                    backendLoginFailed = true;
                } else {
                    setError(err.response.data.error || 'Erro ao conectar com o servidor. Tente novamente mais tarde.');
                }
            } else if (err.request) {
                backendLoginFailed = true;
                setError('Não foi possível conectar ao servidor. Verifique sua conexão ou se o backend está online.');
            } else {
                setError('Ocorreu um erro inesperado. Tente novamente.');
            }

            // TENTATIVA 2: Se o login do backend falhou, tentar login com a conta demo do localStorage
            if (backendLoginFailed || err.request) {
                try {
                    const storedDemoUser = JSON.parse(localStorage.getItem('demoRegisteredUser') || 'null');

                    if (storedDemoUser && storedDemoUser.email === email && storedDemoUser.password === password) {
                        console.log('Login bem-sucedido com conta demo local:', storedDemoUser);
                        authLogin(storedDemoUser);
                        navigate('/home');
                    } else {
                        setError('Email ou senha incorretos. Por favor, verifique suas credenciais.');
                    }
                } catch (localErr) {
                    console.error('Erro ao ler do localStorage para login demo:', localErr);
                    setError('Ocorreu um erro ao tentar o login. Tente novamente.');
                }
            }
        }
    };

    return (
        <div style={styles.container}>
            {/* Header com botões de voltar e suporte */}
            <header style={styles.header}>
                <Link to="/apresentacao" style={styles.headerIconContainer}>
                    <img src={backArrowIcon} alt="Voltar" style={styles.headerIcon} />
                </Link>
                <Link to="/contact" style={styles.headerIconContainer}>
                    <img src={suportIcon} alt="Suporte" style={styles.headerIcon} />
                </Link>
            </header>

            {/* Conteúdo principal (painéis) */}
            <main style={styles.mainContent}>
                <div style={styles.leftPanel}>
                    <img src={logoAgendaCorte} alt="Agenda Corte Barbearia Logo" style={styles.logo} />
                </div>
                <div style={styles.rightPanel}>
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            style={styles.input}
                            required
                        />
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Senha"
                            style={styles.input}
                            required
                        />
                        {error && <p style={styles.errorText}>{error}</p>}
                        <button type="submit" style={styles.button}>Entrar</button>
                    </form>
                    <p style={styles.registerText}>
                        <Link to="/register" style={styles.registerLink}>CRIAR UM USUÁRIO</Link>
                    </p>
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
        flexDirection: 'column', // Altera para coluna para empilhar header, conteúdo e footer
        minHeight: '100vh',
        backgroundColor: '#1a1a2e',
        color: 'white',
        boxSizing: 'border-box',
        width: '100%',
        position: 'relative',
    },
    header: {
        width: '100%',
        padding: '20px',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2e2e4e',
        zIndex: 100, // Garante que o header fique acima de outros elementos
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
        filter: 'invert(53%) sepia(91%) saturate(301%) hue-rotate(139deg) brightness(98%) contrast(101%)', // Adicionado filtro para a cor dos ícones
    },
    mainContent: {
        flexGrow: 1, // Ocupa todo o espaço restante entre o header e o footer
        display: 'flex',
        justifyContent: 'center', // Centraliza os painéis horizontalmente
        alignItems: 'center', // Centraliza os painéis verticalmente
        padding: '20px',
        boxSizing: 'border-box',
        gap: '50px',
        flexWrap: 'wrap', // Permite que os painéis quebrem para a próxima linha em telas menores
    },
    leftPanel: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        maxWidth: '400px',
        flexShrink: 0,
    },
    logo: {
        maxWidth: '100%',
        height: 'auto',
    },
    rightPanel: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
        backgroundColor: '#2e2e4e',
        borderRadius: '15px',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.5)',
        width: '90%',
        maxWidth: '400px',
        height: 'fit-content',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
    },
    input: {
        backgroundColor: '#4a4a6e',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        border: 'none',
        fontSize: '1em',
        outline: 'none',
    },
    button: {
        backgroundColor: '#00bcd4',
        color: 'white',
        padding: '15px 25px',
        borderRadius: '50px',
        background: 'linear-gradient(45deg, #00bcd4, #00796b)',
        border: 'none',
        fontSize: '1.1em',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 10px rgba(0, 188, 212, 0.3)',
        marginTop: '10px',
        outline: 'none',
        '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 6px 15px rgba(0, 188, 212, 0.5)',
        },
    },
    errorText: {
        color: '#ff6b6b',
        marginTop: '-10px',
        marginBottom: '8px',
        fontSize: '0.9em',
        textAlign: 'center',
    },
    registerText: {
        marginTop: '20px',
        color: '#cccccc',
        fontSize: '0.95em',
    },
    registerLink: {
        color: '#00bcd4',
        textDecoration: 'none',
        fontWeight: 'bold',
        transition: 'color 0.3s ease',
        '&:hover': {
            color: '#00796b',
        },
    },
    footer: {
        width: '100%',
        backgroundColor: '#2e2e4e',
        color: '#888',
        textAlign: 'center',
        padding: '20px',
        boxSizing: 'border-box', // Garante que o padding não aumente a largura total
        marginTop: 'auto', // Empurra o footer para o final se houver espaço
    },
    footerText: {
        margin: '0',
        fontSize: '0.9em',
    }
};

export default Login;
