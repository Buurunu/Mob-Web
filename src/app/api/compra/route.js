import { createConnection } from "../../lib/mysql"  //conexão com o bd
import { NextResponse } from "next/server"

export async function GET(){
    try{
        {/*captura as informações do banco e exibe para o usuário*/}
        const db = await createConnection()
        const sql = "select * from compra"
        const [compra] = await db.query(sql)
        return NextResponse.json(compra)
        } catch(error){
        console.log(error)
        return NextResponse.json({error: error.message})
    }
}

export async function POST(req){
    try{
        const db = await createConnection();
        const {dataCompra, total} = await req.json();
        const sql = "insert into compra(dataCompra, total) values(?, ?)";
        const [result] = await db.query(sql, [dataCompra, total]);
        return NextResponse.json({id: result.insertId, dataCompra, total});
    } catch(error){
        console.log(error);
        return NextResponse.json({error: error.message})
    }
}