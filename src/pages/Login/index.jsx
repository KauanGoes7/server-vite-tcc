// src/pages/Login/index.jsx
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/api'; 
import { AuthContext } from '../../App';

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
            // TENTATIVA 1: Tentar login com o backend
            const response = await api.post('/login', { email, password });
            const userData = response.data; 

            console.log('Resposta do backend no login:', userData); // VERIFIQUE ESTE LOG NO CONSOLE!

            // --- ALTERAÇÃO AQUI: Ajuste para o formato de resposta do backend ---
            // Se o backend retorna o objeto do usuário DIRETAMENTE (sem a chave 'user' aninhada),
            // use 'authLogin(userData);'
            // Se o backend retorna { message: "...", user: { ... } }, use 'authLogin(userData.user);'
            // Com base no seu relato, é provável que seja 'authLogin(userData);'
            
            // Vamos testar com 'authLogin(userData);' primeiro, que é o mais provável.
            // Se o backend retornar um objeto de usuário válido diretamente, isso funcionará.
            if (userData && (userData.id || userData.email)) { // Verifica se userData é um objeto de usuário válido
                authLogin(userData); // <--- MUDANÇA MAIS PROVÁVEL PARA O SEU CASO
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
            {/* Link para a página de Apresentação no canto superior direito */}
            <Link to="/apresentacao" style={styles.apresentacaoLink}>
                Apresentação
            </Link>

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
        position: 'relative', // Adicionado para posicionamento absoluto do link
    },
    // NOVO ESTILO: Link de Apresentação
    apresentacaoLink: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        color: '#00bcd4', // Cor do link
        textDecoration: 'none',
        fontSize: '1em',
        fontWeight: 'bold',
        padding: '8px 15px',
        borderRadius: '20px',
        border: '1px solid #00bcd4',
        transition: 'background-color 0.3s ease, color 0.3s ease',
        zIndex: 1000,
        '&:hover': {
            backgroundColor: '#00bcd4',
            color: '#1a1a2e',
        },
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
