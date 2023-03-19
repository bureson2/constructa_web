import React, { useState } from 'react';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // volání API pro přihlášení
        const response = await fetch('http://localhost:8080/api/v1/auth/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            // uložení JWT tokenu do sessionStorage
            const { token } = await response.json();
            sessionStorage.setItem('token', token);
            alert(token);
        } else {
            // zobrazení chybové hlášky
            console.log('Přihlášení se nezdařilo.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Uživatelské jméno:
                <input type="text" value={email} onChange={event => setEmail(event.target.value)} />
            </label>
            <label>
                Heslo:
                <input type="password" value={password} onChange={event => setPassword(event.target.value)} />
            </label>
            <button type="submit">Přihlásit se</button>
        </form>
    );
}

export default LoginForm;
