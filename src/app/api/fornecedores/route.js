import { createConnection } from "../../lib/mysql"  //conexão com o bd
import { NextResponse } from "next/server"

export async function GET(){
    try{
        {/*captura as informações do banco e exibe para o usuário*/}
        const db = await createConnection()
        const sql = "select * from fornecedores"
        const [fornecedores] = await db.query(sql)
        return NextResponse.json(fornecedores)

        } catch(error){
        console.log(error)
        return NextResponse.json({error: error.message})
    }
}

export async function POST(req){
    try{
        const db = await createConnection();
        const {name, cidade, endereco} =await req.json();
        const sql = "insert into fornecedores(name, cidade, endereco) values(?, ?, ?)";
        const [result] = await db.query(sql, [name, cidade, endereco]);
        return NextResponse.json({id: result.insertId, name, cidade, endereco})
    } catch(error){
        console.log(error);
        return NextResponse.json({error: error.message})
    }
}