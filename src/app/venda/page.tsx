"use client";

import React, { useState } from "react";
import styles from './styles.module.css';
import Input from "../componentes/inputs";   
import Navbar from "../componentes/header";
import { useRouter } from "next/navigation";

export default function Venda(){
    const [total, setTotal] = useState('');
    const [loading, setLoading] = useState(false); // Estado para o spinner
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validação dos campos
        if (!total) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        setLoading(true); // Ativa o spinner

        try {
            // Faz a requisição para a API
            const response = await fetch('/api/venda', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ total }),
            });

            // Verifica se a requisição foi bem-sucedida
            if (response.ok) {
                setTotal('');
                alert('Venda realizada com sucesso');
                router.push('/venda'); //
            } else {
                const errorData = await response.json();
                console.error('Erro ao fazer uma venda:', errorData.error);
                alert('Erro ao fazer uma venda: ' + errorData.error);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro ao fazer uma. Verifique o console para mais detalhes.');
        } finally {
            setLoading(false); // Desativa o spinner
        }
    };

    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.header}>
                <p className={styles.title}>Venda de Produtos</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className={styles.formularios}>
                    <div className={styles.total}>
                        <p>Total</p>
                        <Input
                            type="number"
                            value={total}
                            onChange={(e) => setTotal(e.target.value)}
                            placeholder="Digite o valor total"
                            required
                        />
                    </div>

                    <button type="submit" className={styles.button} disabled={loading}>
                        {loading ? "Salvando..." : "Salvar"}
                    </button>
                </div>
            </form>
        </div>
    );
}