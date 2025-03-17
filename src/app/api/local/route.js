import { createConnection } from "../../lib/mysql"  //conexão com o bd
import { NextResponse } from "next/server"

export async function GET(){
    try{
        {/*captura as informações do banco e exibe para o usuário*/}
        const db = await createConnection()
        const sql = "select * from local"
        const [local] = await db.query(sql)
        return NextResponse.json(local)

        } catch(error){
        console.log(error)
        return NextResponse.json({error: error.message})
    }  
}

export async function POST(req){
    try{
        const db = await createConnection();
        const {descricao, name} = await req.json();
        const sql = "insert into local(descricao, name) values(?, ?)";
        const [result] = await db.query(sql, [descricao, name]);
        return NextResponse.json({id: result.insertId, descricao, name});
    } catch(error){
        console.log(error);
        return NextResponse.json({error: error.message})
    }
}