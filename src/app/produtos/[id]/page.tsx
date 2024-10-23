"use client";

import { TipoProduto } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditarProdutos({ params }: { params: { id: number } }) {

  const navigate = useRouter();

  const [produto, setProduto] = useState<TipoProduto>({
    id: 0,
    nome: "",
    preco: 0.0,
    qtd:0.0
});

  useEffect(() => {
      const chamadaApi = async ()=>{
        const response = await fetch(`http://localhost:3000/api/base-produtos/${params.id}`);
        const data = await response.json();
        setProduto(data);
      }
      chamadaApi();
  }, [params])


  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        //Realizando um destructuring no evento que é passado como parâmetro:
        const { name, value } = e.target;
        //Aqui estamos atualizando o estado do produto com o novo valor do campo que foi alterado pelo usuário ao digitar os dados neste mesmo campo.
        setProduto((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/base-produtos/${params.id}`, {
        method:"PUT",
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(produto)
      });

      if(response.ok){
        alert("Produto atualizado com sucesso.")
        setProduto({
          id: 0,
          nome: "",
          preco: 0.0,
          qtd:0.0
      });
        navigate.push("/produtos");
      }

    } catch (error) {
      console.error("Falha ao atualizar produto!",error);
    }

  }

  return (
    <div>
      <h2>Produto</h2>

      <div>
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Nome
            </label>
            <input
              type="text"
              id="idNome"
              name="nome"
              value={produto.nome}
              onChange={(e)=> handleChange(e)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nome do produto"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Preço
            </label>
            <input
              type="number"
              id="idPreco"
              name="preco"
              value={produto.preco}
              onChange={(e)=> handleChange(e)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Preço do produto"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Quantidade
            </label>
            <input
              type="number"
              id="idQtd"
              name="qtd"
              value={produto.qtd}
              onChange={(e)=> handleChange(e)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Quantidade do produto"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Alterar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
