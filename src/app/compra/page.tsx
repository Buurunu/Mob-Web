"use client";

import React, { useState } from "react";
import styles from './styles.module.css';
import Input from "../componentes/inputs";
import Navbar from "../componentes/header";
import { useRouter } from "next/navigation";

export default function Compra() {
    const [id_fornecedor, setIdFornecedor] = useState('');
    const [data_compra, setDataCompra] = useState('');
    const [total, setTotal] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validação dos campos
        if (!id_fornecedor || !data_compra || !total) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/compra', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id_fornecedor, data_compra, total }),
            });

            if (response.ok) {
                setIdFornecedor('');
                setDataCompra('');
                setTotal('');
                alert('Compra finalizada com sucesso');
                router.push('/compra');
            } else {
                const errorData = await response.json();
                console.error('Erro ao realizar uma compra:', errorData.error);
                alert('Erro ao realizar uma compra: ' + errorData.error);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro ao fazer uma compra. Verifique o console para mais detalhes.');
        } finally {
            setLoading(false);
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
                    <div className={styles.fornecedor}>
                        <p>ID Fornecedor</p>
                        <Input
                            type="text"
                            value={id_fornecedor}
                            onChange={(e) => setIdFornecedor(e.target.value)}
                            placeholder="Digite o ID do fornecedor"
                            required
                        />
                    </div>

                    <div className={styles.data}>
                        <p>Data da Compra</p>
                        <Input
                            type="date"
                            value={data_compra}
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