import { createConnection } from '../../lib/mysql';
import { NextResponse } from 'next/server';

// GET: Listar todos os clientes
export async function GET() {
    try {
        const db = await createConnection();
        const [clientes] = await db.query('SELECT * FROM cliente');
        return NextResponse.json(clientes);
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: Criar um novo cliente
export async function POST(request) {
    try {
        const db = await createConnection();
        const { name, cidade, endereco } = await request.json();

        const [result] = await db.query(
            'INSERT INTO cliente (name, cidade, endereco) VALUES (?, ?, ?)',
            [name, cidade, endereco]
        );

        return NextResponse.json({
            id: result.insertId,
            name,
            cidade,
            endereco,
        }, { status: 201 });
    } catch (error) {
        console.error('Erro ao criar cliente:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}