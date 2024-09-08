import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../styles/Dashboard.css'; 
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const resp = await axios.get("https://parcial.nucleoslabs.com.co/api/v1/productos/listar");
            console.log(resp);

            if (resp.status === 200) {
                
                    setProducts(resp.data.result); 
                    console.log("Productos cargados exitosamente");
                
                
            }

        } catch (err) {
            if (err.response && err.response.status === 404) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se encontraron productos.',
                    confirmButtonText: 'Reintentar'
                });
            } else {
                console.log("Error al cargar productos");
                console.log(err);
            }
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
    }

    return (
        <div className="product-grid">
            {Array.isArray(products) && products.map(product => (
                <div key={product._id} className="product-card" onClick={() => handleProductClick(product._id)}>
                    <img src={product.image} alt={product.name} className="product-image" />
                    <h2>{product.name}</h2>
                    <p>{product.price}</p>
                </div>
            ))}
        </div>
    );
}

export default Dashboard;