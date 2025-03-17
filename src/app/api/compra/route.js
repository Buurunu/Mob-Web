import { createConnection } from "../../lib/mysql"; // Conexão com o banco de dados
import { NextResponse } from "next/server";

// GET: Busca todas as compras
export async function GET() {
    try {
        const db = await createConnection();
        const sql = `
            SELECT compra.id_compra, compra.data_compra, compra.total, compra.id_fornecedor
            FROM compra
        `;
        const [compras] = await db.query(sql);
        return NextResponse.json(compras); // Retorna os dados diretamente
    } catch (error) {
        console.error('Erro na API de compras:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: Cria uma nova compra
export async function POST(req) {
    try {
        const db = await createConnection();
        const { id_fornecedor, data_compra, total } = await req.json();

        // Validação básica
        if (!id_fornecedor || !data_compra || !total) {
            return NextResponse.json({ error: "Campos obrigatórios faltando." }, { status: 400 });
        }

        const sql = "INSERT INTO compra (id_fornecedor, data_compra, total) VALUES (?, ?, ?)";
        const [result] = await db.query(sql, [id_fornecedor, data_compra, total]);

        return NextResponse.json({ id: result.insertId, id_fornecedor, data_compra, total });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}