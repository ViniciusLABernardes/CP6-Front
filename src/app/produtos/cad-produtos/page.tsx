"use client";

import { TipoProduto } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CadProdutos() {

  const navigate = useRouter();

    const [produto, setProduto] = useState<TipoProduto>({
        id: 0,
        nome: "",
        preco: 0.0,
        qtd:0.0
    });

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();

      try {
        const response = await fetch(process.env.ENDPOINT_URL as string, {
          method:"POST",
          headers:{
            "Content-Type" : "application/json"
          },
          body: JSON.stringify(produto)
        });

        if(response.ok){
          alert("Produto cadastrado com sucesso.")
          setProduto({
            id: 0,
            nome: "",
            preco: 0.0,
            qtd:0.0
        });
          navigate.push("/produtos");
        }

      } catch (error) {
        console.error("Falha ao cadastrar produto!",error);
      }
 
    }

    // const validaCPF = (cpf:string)=>{
    //   cpf = cpf.replace(/[^\d]+/g, "");
    //   // A barra /
    //   // \d = é um dígito númerico de 0 a 9, correponde a qualquer número.
    //   // + = é uma quantidade indeterminada de vezes que o caractere anterior deve ser repetido. No caso aqui o /d
    //   // [^\d] = é um espaço de negação, tudo o que colocarmos dentro dele é o oposto do que está fora. No caso aqui, tudo o que não for um dígito númerico.
    //   //A flag g = é uma flag que faz com que o regex seja aplicado em todos os caracteres na string.

    //   if(cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)){
    //       return false;
    //   }
    //   // ^(\d)\1{10}$ = é uma expressão regular que verifica se o CPF tem 11 dígitos e se o primeiro dígito é igual aos
    //   //10 dígitos seguintes. Vamos ver um a um.
    //   // ^ = é o início da string.
    //   // (\d) = é um dígito númerico de 0 a 9
    //   // \1{10} = é o mesmo dígito anterior repetido 10 vezes
    //   // $ = é o final da string.
    //   // O \1 é um referência ao grupo de captura (\d) anterior. Porque o (\d) está dentro de um parenteses?
    //   // Isso faz com que o regex capture o dígito e o armazene em um grupo de captura, que pode ser referenciado posteriormente com \1.
      
    // }


  return (
    <div>
        <h1>Cadastro de Produtos</h1>
        <div>
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Nome</label>
            <input
              type="text"
              id="idNome"
              name="nome"
              value={produto.nome}
               onChange={(e)=> setProduto({...produto,nome:e.target.value})}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nome do produto"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Preço</label>
            <input
              type="number"
              id="idPreco"
              name="preco"
              value={produto.preco}
              onChange={(e)=> setProduto({...produto,preco: parseFloat(e.target.value) })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Preço do produto"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Quantidade</label>
            <input
              type="number"
              id="idQtd"
              name="qtd"
              value={produto.qtd}
              onChange={(e)=> setProduto({...produto,qtd: parseInt(e.target.value) })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Quantidade do produto"
              required
            />
          </div>
          <div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cadastrar</button>
          </div>

        </form>
      </div>
     
    </div>
  )
}
