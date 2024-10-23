import { TipoProduto } from "@/types";
import { promises as fs } from "fs";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: number } }) {

    const file = await fs.readFile(process.cwd() + '/src/data/base.json', 'utf-8');
    const dados:TipoProduto[] = JSON.parse(file);

    const produto = dados.find(p => p.id == params.id);

    return NextResponse.json(produto);
}

export async function PUT(request: Request, { params }: { params: { id: number } }) {

    //Recuperando os dados da nossa PSEUDO-BASE de dados o arquivo .json.
    //OBS:Lembre que ao recuperar os dados do arquivo, ele está em modo de string/json e
    //não em objeto, por isso precisamos de fazer o parse para transformar em objeto.
    const file = await fs.readFile(process.cwd() + '/src/data/base.json','utf-8');
    //Realizando o parse de string para objeto literal
    const produtos:TipoProduto[] = JSON.parse(file);
    
    //Aqui estamos recebendo o request do cliente:
    //OBS: O cliente pode ser um testador de API que gere requisições do tipo PUT, ou um formulário
    //que envia os dados para a API.
    const{nome,preco,qtd} = await request.json();//Podemos receber os dados do request
    
    //Aqui estamos procurando o produto que foi passado no parâmetro da URL, porém vamos retornar o índice onde achamos este produto na lista. Vamos realizar este procedimento usando um método de array de nome findIndex()
    //Obs: Podemos receber como retorno um índice válido ou -1 se o ID não for encontrado na lista.
    const indice = produtos.findIndex(p => p.id == params.id);

    //Vamos validar o índice.
    if(indice != -1){
        //Agora podemos criar um novo produto, atualizado com o ID existente e com os dados atualizados para sobrepor o produto antigo que se encontra na lista. Vamos usar o método de array splice com o ídice encontrado e validado para sobrepor o produto desatualizado.
        produtos.splice(indice, 1, { id: parseInt(params.id.toString()) , nome, preco, qtd});
    
        //Agora que temos o produto inserido na lista, devemos salvar a lista no arquivo json.
        //OBS: Aqui estamos usando o método writeFileSync, que é um método sincron
        //o, ou seja, ele não é assíncrono, ou seja, ele não vai continuar a execução do código enquanto 
        // ele não terminar de escrever no arquivo.
        //Não podemos esquecer de realizar o PARSE da lista de produtos para STRING para que 
        // possamos escrever no arquivo.
        const fileUpdate = JSON.stringify(produtos);
        await fs.writeFile(process.cwd() + '/src/data/base.json',fileUpdate);
            
        return NextResponse.json({msg:"Produto atualizado com sucesso!"});
    
    }
}


export async function DELETE(request: Request, { params }: { params: { id: number } }) {

    //Recuperando os dados da nossa PSEUDO-BASE de dados o arquivo .json.
    //OBS:Lembre que ao recuperar os dados do arquivo, ele está em modo de string/json e
    //não em objeto, por isso precisamos de fazer o parse para transformar em objeto.
    const file = await fs.readFile(process.cwd() + '/src/data/base.json','utf-8');
    //Realizando o parse de string para objeto literal
    const produtos:TipoProduto[] = JSON.parse(file);
    
    //Aqui estamos procurando o produto que foi passado no parâmetro da URL, porém vamos retornar o índice onde achamos este produto na lista. Vamos realizar este procedimento usando um método de array de nome findIndex()
    //Obs: Podemos receber como retorno um índice válido ou -1 se o ID não for encontrado na lista.
    const indice = produtos.findIndex(p => p.id == params.id);

    //Vamos validar o índice.
    if(indice != -1){
        //Agora podemos remover o produto localizado a partir do índice retornado. Vamos usar o método de array splice com o ídice encontrado e validado para excluir o produto da lista.
        produtos.splice(indice, 1);
    
        //Agora que temos o produto removido da lista.
        //OBS: Aqui estamos usando o método writeFileSync, que é um método sincron
        //o, ou seja, ele não é assíncrono, ou seja, ele não vai continuar a execução do código enquanto ele não terminar de escrever no arquivo.
        //Não podemos esquecer de realizar o PARSE da lista de produtos para STRING para que 
        // possamos escrever no arquivo.
        const fileUpdate = JSON.stringify(produtos);
        await fs.writeFile(process.cwd() + '/src/data/base.json',fileUpdate);
            
        return NextResponse.json({msg:"Produto excluído com sucesso!"});
    
    }
}
