// src/App.jsx
import React, { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

// Importe seus componentes de página.
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ServicesPage from './pages/Services';
import BarbersPage from './pages/Barbers';
// REMOVIDO: import AppointmentsPage from './pages/Appointments'; // Esta linha foi removida

// Importações para as novas páginas
import HomePage from './pages/Home';
import ApresentacaoPage from './pages/Apresentacao';
import AgendaData from './pages/AgendaData'; // MANTIDO
import ConfirmacaoAgendamento from './pages/ConfirmacaoAgendamento'; // MANTIDO (vamos criar este arquivo a seguir!)

// Crie um contexto de autenticação para gerenciar o estado do usuário logado
export const AuthContext = createContext(null);

// Componente para proteger rotas
const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            // Se não houver usuário logado, redireciona para a página de login
            navigate('/login', { replace: true });
        }
    }, [user, navigate]);

    // Renderiza os filhos apenas se houver usuário
    return user ? children : null;
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
                minHeight: '100vh',
                backgroundColor: '#1a1a2e',
                width: '100%',
                boxSizing: 'border-box',
            }}>
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to="/login" replace />}
                    />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                    <Route path="/apresentacao" element={<ApresentacaoPage />} />
                    <Route path="/services" element={<ProtectedRoute><ServicesPage /></ProtectedRoute>} />
                    <Route path="/Barbers" element={<ProtectedRoute><BarbersPage /></ProtectedRoute>} />

                    {/* Rotas para as novas telas de agendamento */}
                    <Route path="/AgendaData" element={<ProtectedRoute><AgendaData /></ProtectedRoute>} />
                    <Route path="/ConfirmacaoAgendamento" element={<ProtectedRoute><ConfirmacaoAgendamento /></ProtectedRoute>} />

                    {/* REMOVIDO: Rota para AppointmentsPage */}
                    {/* <Route path="/appointments" element={<ProtectedRoute><AppointmentsPage /></ProtectedRoute>} /> */}

                    <Route path="*" element={<h1 style={{color: 'white', textAlign: 'center', marginTop: '50px'}}>404 - Página Não Encontrada</h1>} />
                </Routes>
            </div>
        </AuthContext.Provider>
    );
}

export default App;