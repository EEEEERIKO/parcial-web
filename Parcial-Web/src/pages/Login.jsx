import React, { useState } from 'react';
import '../styles/Login.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const loginService = async (e) => {
        e.preventDefault();
        const data = {
            email: email,
            password: password
        };

        try {
            const resp = await axios.post("https://parcial.nucleoslabs.com.co/api/v1/usuarios/login", data);
            console.log(resp);




            if (resp.status === 200) {
                console.log("Inicio de sesion exitoso");
                navigate("/dashboard")
            }

        } catch (err) {
            if (err.response && err.response.status === 404) {
                // Muestra la alerta de datos incorrectos
                Swal.fire({
                    icon: 'error',
                    title: 'Datos Incorrectos',
                    text: 'Tu correo o contraseña son incorrectos.',
                    confirmButtonText: 'Reintentar'
                }).then(() => {
                    navigate("/login"); // Redirige a /login después de cerrar la alerta
                });
            } else {
                console.log("Error en el registro");
                console.log(err);
            }
        }

    }


    return (
        <div className="login-container">
            <div className='main_pannel'>
                <h1>Ingresar</h1>
                <form className='form_login' onSubmit={loginService}>

                    <div className='input_box'>
                        <input type="email" className="email" placeholder='Correo electrónico' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className='input_box'>
                        <input type="password" className="password" placeholder='Contraseña' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type='submit' className='btn_login'> Iniciar Sesión</button>
                </form>
                <p className='register_link'>¿Aun no tienes una cuenta? <a href="/register" className='link_regist'>Registrarse</a></p>
            </div>
        </div>
    );
}