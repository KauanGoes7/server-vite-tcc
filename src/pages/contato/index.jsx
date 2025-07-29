import React from 'react';

function Contato() {
    return (
        <div style={styles.container}>
            <h1 style={styles.message}>Tela em Desenvolvimento</h1>
            <p style={styles.subtitle}>Estamos trabalhando para trazer a você uma experiência incrível!</p>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#1a1a2e', // Cor de fundo consistente
        color: 'white',
        textAlign: 'center',
        padding: '20px',
        boxSizing: 'border-box',
    },
    message: {
        fontSize: '3em',
        color: '#00bcd4', // Cor de destaque
        marginBottom: '20px',
    },
    subtitle: {
        fontSize: '1.2em',
        color: '#cccccc',
        maxWidth: '600px',
        lineHeight: '1.5',
    },
};

export default Contato;
