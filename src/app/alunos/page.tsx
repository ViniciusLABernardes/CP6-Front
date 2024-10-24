"use client";

import { TipoAluno } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react"

export default function Alunos() {

    const [Alunos, setAlunos] = useState<TipoAluno[]>([]);

    useEffect(() => {
        const chamadaApi = async ()=>{
            const response = await fetch("http://localhost:3000/api/aluno");
            const data = await response.json();
            setAlunos(data);
        }
        chamadaApi();
    },[]);
    
   
    return (
        <div className="flex-col m-5 items-center justify-center">
            <h2 className="font-bold text-5xl pb-20">Alunos</h2>
            <section className="sessao-aluno flex flex-wrap items-center justify-center gap-5">
                {Alunos.map((p) => (
                        <div key={p.id} className=" bg-red-900 w-full sm:w-1/2 md:w-1/3 h-[600px] lg:h-[500px] p-6 rounded-md flex flex-col justify-between ">
                            <h2 className="nome-aluno text-3xl"> {p.nome}</h2>
                            <h2 className="rm-aluno text-2xl">RM:{p.rm}</h2>
                            <div className="flex flex-row  pt-3 pb-3">
                                <figure className="w-1/2">
                                    <Image src={p.imagem} className="imagem-aluno rounded-lg" alt="imagem aluno" width={250} height={300} />
                                </figure>
                                
                                <div className="flex flex-col ml-4"> 
                                    <h3>Media das notas dos checkpoints:
                                        <p className="font-bold">{(p.notasCp.reduce((a, b) => a + b, 0) / p.notasCp.length || 0).toFixed(2)}</p>
                                    </h3>
                                    <h3>Media das notas do challenge:
                                        <p className="font-bold">{(p.notasChallenge.reduce((a, b) => a + b, 0) / p.notasChallenge.length || 0).toFixed(2)}</p>
                                    </h3>
                                    <h3>Media das notas das global solution:
                                        <p className="font-bold mb-6">{(p.notasGlobal.reduce((a, b) => a + b, 0) / p.notasGlobal.length || 0).toFixed(2)}</p>
                                    </h3>
                                </div>
                            </div>
                            <div className="bg-red-500 rounded-lg w-full py-2 mb-6 text-center hover:bg-red-700 duration-300 hover:shadow-lg  cursor-pointer">
                                    <button type="submit">Acessar Perfil</button> 
                            </div>
                            
                         </div>
                    ))}


            </section>
           
        </div>
    )
}
