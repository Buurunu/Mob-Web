"use client";

import React, { useState } from "react";
import styles from './styles.module.css';
import Input from "../componentes/inputs";   
import Navbar from "../componentes/header";
import { useRouter } from "next/navigation";

export default function Local(){
    const [name, setName] = useState('');
    const [descricao, setDescricao] = useState('');
    const [loading, setLoading] = useState(false); // Estado para o spinner
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validação dos campos
        if (!name || !descricao) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        setLoading(true); // Ativa o spinner

        try {
            // Faz a requisição para a API
            const response = await fetch('/api/local', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, descricao }),
            });

            // Verifica se a requisição foi bem-sucedida
            if (response.ok) {
                setName('');
                setDescricao('');
                alert('Local cadastrado com sucesso');
                router.push('/local'); //
            } else {
                const errorData = await response.json();
                console.error('Erro ao cadastrar um local:', errorData.error);
                alert('Erro ao cadastrar um local: ' + errorData.error);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro ao cadastrar um local. Verifique o console para mais detalhes.');
        } finally {
            setLoading(false); // Desativa o spinner
        }
    };

    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.header}>
                <p className={styles.title}>Local</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className={styles.formularios}>
                    <div className={styles.nome}>
                        <p>Nome</p>
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Digite o nome"
                            required
                        />
                    </div>

                    <div className={styles.descricao}>
                        <p>Endereco</p>
                        <Input
                            type="text"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            placeholder="Digite a descricao do local"
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