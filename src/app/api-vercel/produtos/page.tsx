export default async function Produtos(){

    const dadosApi = await fetch('./api/produto');
    const todosProdutos = await dadosApi.json();

    return(
        <>
            <ul>
                { //Aqui vai apresentar os dados
                    todosProdutos.map ( ( cadaProduto ) => (
                        <li key={cadaProduto.key}>
                            {cadaProduto.id}
                            {cadaProduto.name}
                        </li>
                    ) )
                }
            </ul>
        </>
    )
}