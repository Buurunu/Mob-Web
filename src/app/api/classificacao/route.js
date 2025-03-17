import { createConnection } from "../../lib/mysql"  //conexão com o bd
import { NextResponse } from "next/server"

export async function GET(){
    try{
        {/*captura as informações do banco e exibe para o usuário*/}
        const db = await createConnection()
        const sql = "select * from classificacao"
        const [classificacao] = await db.query(sql)
        return NextResponse.json(classificacao)

        } catch(error){
        console.log(error)
        return NextResponse.json({error: error.message})
    }    
}

export async function POST(req){
    try{
        const db = await createConnection();
        const {name, descricao} = await req.json();
        const sql = "insert into classificacao(name, descricao) values(?, ?)";
        const [result] = await db.query(sql, [name, descricao]);
        return NextResponse.json({id: result.insertId, name, descricao})
    } catch(error){
        console.log(error);
        return NextResponse.json({error: error.message})
    }
}