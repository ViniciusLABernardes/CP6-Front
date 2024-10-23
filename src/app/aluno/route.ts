import { NextResponse } from "next/server";
import {promises as fs} from "fs";
import { TipoProduto } from "@/types";

export async function GET() {   
    const file = await fs.readFile(process.cwd() + '/src/data/base.json','utf-8');
    const dados = JSON.parse(file);
    return NextResponse.json(dados);
}

export async function POST(request:Request) {

    //Recuperando os dados da nossa PSEUDO-BASE de dados o arquivo .json.
    //OBS:Lembre que ao recuperar os dados do arquivo, ele está em modo de string/json e
    //não em objeto, por isso precisamos de fazer o parse para transformar em objeto.
    const file = await fs.readFile(process.cwd() + '/src/data/base.json','utf-8');
    //Realizando o parse de string para objeto literal
    const produtos:TipoProduto[] = JSON.parse(file);
    
    //Aqui estamos recebendo o request do cliente:
    //OBS: O cliente pode ser um testador de API que gere requisições do tipo POST, ou um formulário
    //que envia os dados para a API.
    const{ id,nome,preco,qtd} = await request.json();//Podemos receber os dados do request realizando
    //o parse do JSON para objeto literal e em seguida desestruturando ele, como no exemplo acima.
    //Ou podemos apenas realizar o parse e colocar em um objeto: como abaixo:
    //const dados = await request.json();
    
    //Tipando e colocando em um objeto os dados recebidos no request.
    const produto = { id,nome,preco,qtd} as TipoProduto;

    //Gerar um novo id para o produto
    produto.id = (produtos[ produtos.length - 1 ].id + 1);

    //Devemos pegar o produto e inserir na lista de produtos.
    produtos.push(produto);
    //Agora que temos o produto inserido na lista, devemos salvar a lista no arquivo json.
    //OBS: Aqui estamos usando o método writeFileSync, que é um método sincron
    //o, ou seja, ele não é assíncrono, ou seja, ele não vai continuar a execução do código enquanto 
    // ele não terminar de escrever no arquivo.
    //Não podemos esquecer de realizar o PARSE da lista de produtos para STRING para que 
    // possamos escrever no arquivo.
    const fileCreated = JSON.stringify(produtos);
    await fs.writeFile(process.cwd() + '/src/data/base.json',fileCreated);
        
    return NextResponse.json(produto,{status:201});

}