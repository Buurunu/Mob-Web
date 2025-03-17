import { createConnection } from "../../lib/mysql";  // Conexão com o banco de dados
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const db = await createConnection();
        const sql = "SELECT * FROM produtos";
        const [produtos] = await db.query(sql);
        return NextResponse.json(produtos);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message });
    }
}

export async function POST(req) {
    try {
        const db = await createConnection();
        const { nome, quantidade, valor } = await req.json();
        const sql = "INSERT INTO produtos(nome, quantidade, valor) VALUES(?, ?, ?)";
        const [result] = await db.query(sql, [nome, quantidade, valor]);
        return NextResponse.json({ id: result.insertId, nome, quantidade, valor });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message });
    }
}