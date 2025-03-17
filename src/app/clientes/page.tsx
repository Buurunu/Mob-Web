"use client";

import React, { useState } from "react";
import styles from './styles.module.css';
import Input from "../componentes/inputs";   
import Navbar from "../componentes/header";
import { useRouter } from "next/navigation";

export default function Cliente() {
    const [name, setName] = useState('');
    const [cidade, setCidade] = useState('');
    const [endereco, setEndereco] = useState('');
    const [loading, setLoading] = useState(false); // Estado para o spinner
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validação dos campos
        if (!name || !cidade || !endereco) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        setLoading(true); // Ativa o spinner

        try {
            // Faz a requisição para a API
            const response = await fetch('/api/clientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, cidade, endereco }), // Envia nome, cidade e endereco
            });

            // Verifica se a requisição foi bem-sucedida
            if (response.ok) {
                setName('');
                setCidade('');
                setEndereco('');
                alert('Cliente cadastrado com sucesso!');
                router.push('/clientes'); // Redireciona para a lista de clientes
            } else {
                const errorData = await response.json();
                console.error('Erro ao cadastrar cliente:', errorData.error);
                alert('Erro ao cadastrar cliente: ' + errorData.error);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro ao cadastrar cliente. Verifique o console para mais detalhes.');
        } finally {
            setLoading(false); // Desativa o spinner
        }
    };

    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.header}>
                <p className={styles.title}>Cadastro de Clientes</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className={styles.formularios}>
                    <div className={styles.name}>
                        <p>Nome</p>
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Digite o nome"
                            required
                        />
                    </div>

                    <div className={styles.cidade}>
                        <p>Cidade</p>
                        <Input
                            type="text"
                            value={cidade}
                            onChange={(e) => setCidade(e.target.value)}
                            placeholder="Digite a cidade"
                            required
                        />
                    </div>

                    <div className={styles.endereco}>
                        <p>Endereço</p>
                        <Input
                            type="text"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                            placeholder="Digite o endereço"
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