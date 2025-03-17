// src/app/dados/page.js
"use client";

import React, { useState, useEffect } from "react";
import styles from './styles.module.css';
import Navbar from "../componentes/header";
import { useRouter } from "next/navigation";

export default function Dados() {
    const [dados, setDados] = useState([]);
    const [tabela, setTabela] = useState('clientes'); // Estado para controlar qual tabela exibir
    const [loading, setLoading] = useState(false); // Estado para o spinner
    const router = useRouter();

    useEffect(() => {
        fetchDados();
    }, [tabela]);

    const fetchDados = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/${tabela}`);
            if (response.ok) {
                const data = await response.json();
                // Garante que `dados` seja sempre um array
                setDados(Array.isArray(data) ? data : []);
            } else {
                console.error('Erro ao buscar dados:', response.statusText);
                setDados([]); // Define `dados` como um array vazio em caso de erro
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            setDados([]); // Define `dados` como um array vazio em caso de erro
        } finally {
            setLoading(false);
        }
    };

    const handleTabelaChange = (event) => {
        setTabela(event.target.value);
    };

    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.header}>
                <p className={styles.title}>Dados</p>
            </div>

            <div className={styles.formularios}>
                <div className={styles.selectContainer}>
                    <label htmlFor="tabela">Selecione a Tabela:</label>
                    <select id="tabela" value={tabela} onChange={handleTabelaChange}>
                        <option value="clientes">Clientes</option>
                        <option value="fornecedores">Fornecedores</option>
                        <option value="venda">Vendas</option>
                        <option value="compra">Compras</option>
                        <option value="classificacao">Classificação</option>
                        <option value="local">Local</option>
                        <option value="produtos">Produtos</option>
                    </select>
                </div>

                {loading ? (
                    <p className={styles.loading}>Carregando...</p>
                ) : dados.length === 0 ? (
                    <p className={styles.loading}>Nenhum dado encontrado.</p>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                {Object.keys(dados[0]).map((key) => (
                                    <th key={key}>{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {dados.map((item, index) => (
                                <tr key={index}>
                                    {Object.entries(item).map(([key, value]) => (
                                        <td key={key}>
                                            {typeof value === 'number' && (key === 'total' || key === 'valor') 
                                                ? `R$ ${value.toFixed(2)}` 
                                                : String(value)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}