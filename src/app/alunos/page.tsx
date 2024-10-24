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
        <div className="flex-col m-10 items-center justify-center">
            <h2 className="font-bold text-5xl pb-20">Alunos</h2>
            <section className="sessao-aluno flex items-center justify-evenly gap-20 justify-center">
                {Alunos.map((p) => (
                        <div key={p.id}>
                            <h2 className="nome-aluno">{p.nome}</h2>
                            <h2 className="rm-aluno">{p.rm}</h2>
                            <figure><Image src={p.imagem} className="imagem-aluno" alt="imagem aluno" width={400} height={400}></Image></figure>
                            <h3>Media das notas dos checkpoints:<p className="font-bold">{(p.notasCp.reduce((a, b) => a + b, 0) / p.notasCp.length || 0).toFixed(2)}</p></h3>
                            <h3>Media das notas do challenge: <p className="font-bold">  {(p.notasChallenge.reduce((a, b) => a + b, 0) / p.notasChallenge.length || 0).toFixed(2)}</p></h3>
                            <h3>Media das notas das global solution: <p className="font-bold">{(p.notasGlobal.reduce((a, b) => a + b, 0) / p.notasGlobal.length || 0).toFixed(2)}</p></h3>
                        </div>
                    ))}


            </section>
           
        </div>
    )
}
