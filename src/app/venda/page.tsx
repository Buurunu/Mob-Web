"use client";

import React, { useState } from "react";
import styles from './styles.module.css';
import Input from "../componentes/inputs";
import Navbar from "../componentes/header";
import { useRouter } from "next/navigation";

export default function Venda() {
    const [id_cliente, setIdCliente] = useState('');
    const [id_local, setIdLocal] = useState('');
    const [total, setTotal] = useState('');
    const [data_venda, setDataVenda] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validação dos campos
        if (!id_cliente || !id_local || !total || !data_venda) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/venda', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id_cliente, id_local, total, data_venda }),
            });

            if (response.ok) {
                setIdCliente('');
                setIdLocal('');
                setTotal('');
                setDataVenda('');
                alert('Venda realizada com sucesso');
                router.push('/venda');
            } else {
                const errorData = await response.json();
                console.error('Erro ao fazer uma venda:', errorData.error);
                alert('Erro ao fazer uma venda: ' + errorData.error);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro ao fazer uma venda. Verifique o console para mais detalhes.');
        } finally {
            setLoading(false);
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
                    <div className={styles.cliente}>
                        <p>ID Cliente</p>
                        <Input
                            type="text"
                            value={id_cliente}
                            onChange={(e) => setIdCliente(e.target.value)}
                            placeholder="Digite o ID do cliente"
                            required
                        />
                    </div>

                    <div className={styles.local}>
                        <p>ID Local</p>
                        <Input
                            type="text"
                            value={id_local}
                            onChange={(e) => setIdLocal(e.target.value)}
                            placeholder="Digite o ID do local"
                            required
                        />
                    </div>

                    <div className={styles.data}>
                        <p>Data da Venda</p>
                        <Input
                            type="date"
                            value={data_venda}
                            onChange={(e) => setDataVenda(e.target.value)}
                            placeholder="Digite a data da venda"
                            required
                        />
                    </div>

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