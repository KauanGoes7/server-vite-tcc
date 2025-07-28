// src/App.jsx
import React, { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

// Importe seus componentes de página.
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ServicesPage from './pages/Services';
import BarbersPage from './pages/Barbers';
import AppointmentsPage from './pages/Appointments';

// Importações para as novas páginas
import HomePage from './pages/Home';
import ApresentacaoPage from './pages/Apresentacao';

// Crie um contexto de autenticação para gerenciar o estado do usuário logado
export const AuthContext = createContext(null);

// Componente para proteger rotas
const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login', { replace: true });
        }
    }, [user, navigate]);

    return user ? children : null; // Renderiza os filhos apenas se houver usuário
};

function App() {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            <div style={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                // Remova 'justifyContent: center' e 'alignItems: center' do App.jsx
                // quando se trata de páginas que precisam rolar, pois eles centralizam
                // o conteúdo verticalmente e horizontalmente, impedindo a rolagem natural.
                // As páginas internas controlarão seu próprio alinhamento.
                minHeight: '100vh',
                backgroundColor: '#1a1a2e',
                width: '100%',
                boxSizing: 'border-box',
                // Importante para a rolagem:
                // Se o conteúdo de uma página for muito grande, o container principal do App.jsx
                // precisa permitir que ele se estenda. Ao remover `justifyContent: 'center'`,
                // a div não tentará forçar todo o conteúdo a caber na tela.
                // A rolagem será gerenciada pelo `overflowY: 'auto'` na página específica.
            }}>
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to="/login" replace />}
                    />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                    <Route path="/apresentacao" element={<ApresentacaoPage />} /> {/* Esta rota é que precisamos que role */}
                    <Route path="/services" element={<ProtectedRoute><ServicesPage /></ProtectedRoute>} />
                    <Route path="/barbers" element={<ProtectedRoute><BarbersPage /></ProtectedRoute>} />
                    <Route path="/appointments" element={<ProtectedRoute><AppointmentsPage /></ProtectedRoute>} />
                    <Route path="*" element={<h1 style={{color: 'white', textAlign: 'center', marginTop: '50px'}}>404 - Página Não Encontrada</h1>} />
                </Routes>
            </div>
        </AuthContext.Provider>
    );
}

export default App;