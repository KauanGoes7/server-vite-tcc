// src/pages/Login/index.jsx
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/api';
import { AuthContext } from '../../App';

// Importe a imagem da logo Agenda Corte. Caminho relativo correto para src/assets/login/
import logoAgendaCorte from '../../assets/login/image 4-Photoroom 2.png';

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
            const response = await api.post('/login', { email, password });
            const userData = response.data;

            authLogin(userData);
            navigate('/home'); // <--- ALTERADO AQUI: Redireciona para /home após o login
        } catch (err) {
            console.error('Erro no login:', err);
            if (err.response) {
                setError(err.response.data.error || 'Credenciais inválidas. Tente novamente.');
            } else if (err.request) {
                setError('Não foi possível conectar ao servidor. Verifique sua conexão ou se o backend está online.');
            } else {
                setError('Ocorreu um erro inesperado. Tente novamente.');
            }
        }
    };

    return (
        <div style={styles.container}>
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
        </div>
    );
}

// Estilos para o componente - Incorporados para simplicidade
const styles = {
    container: {
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#1a1a2e',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        boxSizing: 'border-box',
        gap: '50px',
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
        padding: '30px',
        backgroundColor: '#2e2e4e',
        borderRadius: '15px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
        maxWidth: '320px',
        minWidth: '280px',
        height: 'fit-content',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        width: '100%',
    },
    input: {
        backgroundColor: '#4a4a6e',
        color: 'white',
        padding: '12px 18px',
        borderRadius: '25px',
        border: 'none',
        fontSize: '1em',
        outline: 'none',
    },
    button: {
        backgroundColor: '#00bcd4',
        color: 'white',
        padding: '12px 18px',
        borderRadius: '25px',
        border: 'none',
        fontSize: '1.1em',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
        marginTop: '10px',
        outline: 'none',
    },
    errorText: {
        color: '#ff6b6b',
        marginTop: '-10px',
        marginBottom: '8px',
        fontSize: '0.9em',
        textAlign: 'center',
    },
    registerText: {
        marginTop: '25px',
        color: '#aaaaaa',
        fontSize: '0.85em',
    },
    registerLink: {
        color: '#00bcd4',
        textDecoration: 'none',
        fontWeight: 'bold',
        letterSpacing: '0.5px',
    },
};
export default Login;