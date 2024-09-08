import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';
import axios from 'axios';
import Swal from 'sweetalert2';

export const Register = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const registerService = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Las contraseñas no coinciden.',
                confirmButtonText: 'Reintentar'
            });
            return; // Detiene la ejecución si las contraseñas no coinciden
        }

        const data = {
            name: name,
            lastname: secondName,
            email: email,
            password: password
        };

        try {
            const resp = await axios.post("https://parcial.nucleoslabs.com.co/api/v1/usuarios/registrar", data);
            console.log(resp);
            console.log("Registro exitoso");

            if (resp.status === 201) {
                // Muestra la alerta de cuenta creada
                Swal.fire({
                    icon: 'success',
                    title: '¡Cuenta creada!',
                    text: 'Tu cuenta ha sido creada exitosamente.',
                    confirmButtonText: 'Ir al Login'
                }).then(() => {
                    navigate("/login"); // Redirige a /login después de cerrar la alerta
                });
            }

        } catch (error) {
            if (error.response && error.response.status === 500) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Correo electrónico ya registrado.',
                    confirmButtonText: 'Aceptar'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error al registrar. Por favor, intenta nuevamente.',
                    confirmButtonText: 'Aceptar'
                });
            }
        }

    }



    return (
        <div className="register-container">

            <div className='main_pannel'>
                <form className='form_register' onSubmit={registerService}>
                    <h1>Registrar</h1>

                    <div className='input_box'>
                        <input type="text" className="name" placeholder='Nombres' value={name} onChange={(e) => setName(e.target.value)} required />

                    </div>
                    <div className='input_box'>
                        <input type="text" className="second_name" placeholder='Apellidos' value={secondName} onChange={(e) => setSecondName(e.target.value)} required />

                    </div>
                    <div className='input_box'>
                        <input type="email" className="email" placeholder='Correo electrónico' value={email} onChange={(e) => setEmail(e.target.value)} required />

                    </div>
                    <div className='input_box'>
                        <input type="password" className="password" placeholder='Contraseña' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className='input_box'>
                        <input type="password" className="password" placeholder='Repetir Contraseña' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>
                    <button type='submit' className='btn_login'> Iniciar Sesión</button>
                </form>
                <p className='register_link'>¿Ya tienes una cuenta? <a href="/login" className='link_regist'>Iniciar Sesión</a></p>

            </div>
            
        </div>
    );
}