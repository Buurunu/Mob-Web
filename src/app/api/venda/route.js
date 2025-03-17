import { createConnection } from "../../lib/mysql"; // Conexão com o banco de dados
import { NextResponse } from "next/server";

// GET: Busca todas as vendas
export async function GET() {
    try {
        const db = await createConnection();
        const sql = `
            SELECT venda.id_venda, venda.data_venda, venda.total, venda.id_cliente, venda.id_local
            FROM venda
        `;
        const [vendas] = await db.query(sql);
        return NextResponse.json(vendas); // Retorna os dados diretamente
    } catch (error) {
        console.error('Erro na API de vendas:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: Cria uma nova venda
export async function POST(req) {
    try {
        const db = await createConnection();
        const { id_cliente, id_local, total, data_venda } = await req.json();

        // Validação básica
        if (!id_cliente || !id_local || !total || !data_venda) {
            return NextResponse.json({ error: "Campos obrigatórios faltando." }, { status: 400 });
        }

        const sql = "INSERT INTO venda (id_cliente, id_local, total, data_venda) VALUES (?, ?, ?, ?)";
        const [result] = await db.query(sql, [id_cliente, id_local, total, data_venda]);

        return NextResponse.json({ id: result.insertId, id_cliente, id_local, total, data_venda });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}