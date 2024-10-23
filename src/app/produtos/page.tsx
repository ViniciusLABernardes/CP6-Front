"use client";

import { TipoProduto } from "@/types";
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Produtos() {

    const [produtos, setProdutos] = useState<TipoProduto[]>([]);

    const handleDelete = async (id:number) =>{
        try {
            const response = await fetch(`http://localhost:3000/api/base-produtos/${id}`,{
                method: 'DELETE',
            });

            if (response.ok) {
                alert("Produto escluído com sucesso!");
                window.location.href = "/produtos";
            }

        } catch (error) {
            console.error("Falha na exclusão!", error);
            
        }
    }

    useEffect(() => {
        const chamadaApi = async ()=>{
            const response = await fetch("http://localhost:3000/api/base-produtos");
            const data = await response.json();
            setProdutos(data);
        }
        chamadaApi();
    },[]);
    
   
    return (
        <div>
            <h2>Produtos</h2>
            <table className="tabelaProd">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Quantidade</th>
                        <th>Editar | Excluir</th>
                    </tr>
                </thead>

                <tbody>
                    {produtos.map((p) => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.nome}</td>
                            <td>{p.preco}</td>
                            <td>{p.qtd}</td>
                            <td><Link href={`/produtos/${p.id}`}>Editar</Link> | 
                            <Link href="#" onClick={()=>handleDelete(p.id)}> Excluir</Link></td>
                        </tr>
                    ))}
                </tbody>

                <tfoot>
                    <tr>
                        <td colSpan={5}>
                            Quantidade de registros: {produtos.length}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
