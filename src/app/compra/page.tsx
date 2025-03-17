"use client";

import React, { useState } from "react";
import styles from './styles.module.css';
import Input from "../componentes/inputs";   
import Navbar from "../componentes/header";
import { useRouter } from "next/navigation";

export default function Compra(){
    //const [name, setName] = useState('');
    const [dataCompra, setDataCompra] = useState('');
    const [total, setTotal] = useState('');
    const [loading, setLoading] = useState(false); // Estado para o spinner
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validação dos campos
        if (!dataCompra || !total) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        setLoading(true); // Ativa o spinner

        try {
            // Faz a requisição para a API
            const response = await fetch('/api/compra', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ dataCompra, total }),
            });

            // Verifica se a requisição foi bem-sucedida
            if (response.ok) {
                setDataCompra('');
                setTotal('');
                alert('Compra finalizada com sucesso');
                router.push('/compra'); //
            } else {
                const errorData = await response.json();
                console.error('Erro ao inserir ao fazer uma compra:', errorData.error);
                alert('Erro ao realizar uma compra: ' + errorData.error);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro ao fazer uma compra. Verifique o console para mais detalhes.');
        } finally {
            setLoading(false); // Desativa o spinner
        }
    };

    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.header}>
                <p className={styles.title}>Compra de Produtos</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className={styles.formularios}>
                    <div className={styles.data}>
                        <p>Data da compra</p>
                        <Input
                            type="text"
                            value={dataCompra}
                            onChange={(e) => setDataCompra(e.target.value)}
                            placeholder="Digite a data da compra"
                            required
                        />
                    </div>

                    <div className={styles.total}>
                        <p>Total</p>
                        <Input
                            type="number"
                            value={total}
                            onChange={(e) => setTotal(e.target.value)}
                            placeholder="Digite o valor da compra"
                            required
                        />
                    </div>

                    <button type="submit" className={styles.button} disabled={loading}>
                        {loading ? "Inserindo..." : "Adicionar"}
                    </button>
                </div>
            </form>
        </div>
    );
}