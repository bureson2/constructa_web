import React, {useState} from 'react';
import styles from './style.module.scss';
import emailIcon from "../../images/mail_icon.svg";
import lockIcon from "../../images/lock_icon.svg";
import ConnectingParticlesBackground from "./ConnectingParticlesBackground";
import {useNavigate} from "react-router-dom";


function LoginPage() {
    const navigate = useNavigate();
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
            body: JSON.stringify({email, password})
        });

        if (response.ok) {
            // uložení JWT tokenu do sessionStorage
            const {token} = await response.json();
            sessionStorage.setItem('token', token);
            navigate("/");
        } else {
            // zobrazení chybové hlášky
            console.log('Přihlášení se nezdařilo.');
        }
    };

    return (
        <div className={styles.loginPage}>
            <h2>Constructa</h2>
            <h3>Přihlaste se a vybudujme společně lepší svět</h3>
            <form className={styles.form}
                  onSubmit={handleSubmit}>

                <div className={styles.formInput}>
                    <label htmlFor="email">Přihlašovací email:</label>
                    <div className={styles.inputContainer}>
                        <label htmlFor="email">
                            <img src={emailIcon} alt="Email Icon"/>
                        </label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className={styles.formInput}>
                    <label htmlFor="password">Heslo:</label>
                    <div className={styles.inputContainer}>
                        <label htmlFor="password">
                            <img src={lockIcon} alt="Lock Icon"/>
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <button type="submit"
                        className={styles.loginButton}>Přihlásit se
                </button>
            </form>
            <ConnectingParticlesBackground/>
        </div>
    );
}

export default LoginPage;
