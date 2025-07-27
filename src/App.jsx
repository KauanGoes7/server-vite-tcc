// src/App.jsx
import React, { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

// Importe seus componentes de página.
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import UsersPage from './pages/Users';
import ServicesPage from './pages/Services';
import BarbersPage from './pages/Barbers';
import AppointmentsPage from './pages/Appointments';

// Importe seu componente Navbar.
import Navbar from './components/Navbar';

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
            {user && <Navbar />} {/* Renderiza a Navbar apenas se o usuário estiver logado */}

            {/* AQUI ESTÁ A MUDANÇA: Adicionei o estilo diretamente na div .main-content */}
            {/* Este estilo garante que a área de conteúdo principal ocupe o restante da tela */}
            <div style={{
                flexGrow: 1, // Permite que esta div ocupe o espaço restante verticalmente (se o body for flex)
                display: 'flex',
                flexDirection: 'column', // Para que o conteúdo interno se organize em coluna
                justifyContent: 'center', // Centraliza o conteúdo verticalmente
                alignItems: 'center',    // Centraliza o conteúdo horizontalmente
                minHeight: '100vh',      // Garante que ocupe pelo menos 100% da altura da viewport
                backgroundColor: '#1a1a2e', // A cor de fundo principal
                width: '100%',           // Garante 100% da largura
                paddingTop: user ? '60px' : '0', // Adiciona padding no topo se a Navbar estiver visível
                boxSizing: 'border-box', // Inclui padding na largura/altura total
            }}>
                <Routes>
                    {/* Rota Raiz ("/") */}
                    <Route
                        path="/"
                        element={user ? <Navigate to="/users" replace /> : <Navigate to="/login" replace />}
                    />

                    {/* Rotas Públicas */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    {/* Rotas Protegidas */}
                    <Route path="/users" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
                    <Route path="/services" element={<ProtectedRoute><ServicesPage /></ProtectedRoute>} />
                    <Route path="/barbers" element={<ProtectedRoute><BarbersPage /></ProtectedRoute>} />
                    <Route path="/appointments" element={<ProtectedRoute><AppointmentsPage /></ProtectedRoute>} />

                    {/* Rota 404 */}
                    <Route path="*" element={<h1 style={{color: 'white', textAlign: 'center', marginTop: '50px'}}>404 - Página Não Encontrada</h1>} />
                </Routes>
            </div>
        </AuthContext.Provider>
    );
}

export default App;