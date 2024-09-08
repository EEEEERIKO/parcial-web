import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../styles/Product.css'; // Asegúrate de crear este archivo CSS
import { useNavigate } from 'react-router-dom';

export const Product = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const fetchProductDetail = async () => {
        try {
            const resp = await axios.get(`https://parcial.nucleoslabs.com.co/api/v1/productos/listar/${id}`);
            console.log(resp);

            if (resp.status === 200) {
                setProduct(resp.data.result); // Accede a la propiedad 'result' de la respuesta
                console.log("Producto cargado exitosamente");
            }

        } catch (err) {
            if (err.response && err.response.status === 404) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se encontró el producto.',
                    confirmButtonText: 'Reintentar'
                });
            } else {
                console.log("Error al cargar el producto");
                console.log(err);
            }
        }
    }

    useEffect(() => {
        fetchProductDetail();
    }, [id]);

    if (!product) {
        return <div>Cargando...</div>;
    }

    const BuyService = () => {
        Swal.fire({
            icon: 'error',
            title: 'Saldo insuficiente',
            text: 'Saldo insuficiente, pobre',
            confirmButtonText: 'Aceptar'
        });
    }

    const Regresar = () => {
        navigate('/dashboard');
    }

    return (
        <div className='product_container'>
            <div className="product-detail">
                <div className='img_pannel'>
                    <img src={product.image} alt={product.name} className="product-image" />
                </div>
                <div className='panel_content'>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <h4>Marca: {product.marca}</h4>
                </div>

                <div className='panel_buy'>
                    <p>{product.price}$ COP </p>
                    <button onClick={BuyService} className="buy-button">Comprar</button>
                    <button onClick={Regresar} className="back-button">Regresar</button>

                </div>

            </div>
        </div>

    );
}
