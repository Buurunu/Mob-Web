// src/app/produtos/page.js
"use client";

import React, { useState, useEffect } from "react";
import styles from './styles.module.css';
import Navbar from "../componentes/header";
import { useRouter } from "next/navigation";

export default function Produtos() {
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState('');
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetchProdutos();
    }, []);

    const fetchProdutos = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/produtos');
            if (response.ok) {
                const data = await response.json();
                setProdutos(data);
            } else {
                console.error('Erro ao buscar produtos:', response.statusText);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!nome || !quantidade || !valor) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/produtos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, quantidade, valor }),
            });

            if (response.ok) {
                setNome('');
                setQuantidade('');
                setValor('');
                alert('Produto cadastrado com sucesso!');
                fetchProdutos();
            } else {
                const errorData = await response.json();
                console.error('Erro ao cadastrar produto:', errorData.error);
                alert('Erro ao cadastrar produto: ' + errorData.error);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro ao cadastrar produto. Verifique o console para mais detalhes.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.header}>
                <p className={styles.title}>Cadastro de Produtos</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className={styles.formularios}>
                    <div className={styles.campo}>
                        <p>Nome</p>
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Digite o nome do produto"
                            required
                        />
                    </div>

                    <div className={styles.campo}>
                        <p>Quantidade</p>
                        <input
                            type="number"
                            value={quantidade}
                            onChange={(e) => setQuantidade(e.target.value)}
                            placeholder="Digite a quantidade"
                            required
                        />
                    </div>

                    <div className={styles.campo}>
                        <p>Valor</p>
                        <input
                            type="number"
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                            placeholder="Digite o valor"
                            required
                        />
                    </div>

                    <button type="submit" className={styles.button} disabled={loading}>
                        {loading ? "Cadastrando..." : "Cadastrar"}
                    </button>
                </div>
            </form>

            
        </div>
    );
}