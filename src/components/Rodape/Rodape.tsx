"use client"
import { TipoAluno } from "@/types";
import { useState, useEffect } from "react";

export default function Rodape(){
    
    const [Alunos, setAlunos] = useState<TipoAluno[]>([]);

    useEffect(() => {
        const chamadaApi = async ()=>{
            const response = await fetch("http://localhost:3000/api/aluno");
            const data = await response.json();
            setAlunos(data);
        }
        chamadaApi();
    },[]);
    return(
        <footer className="rodape text-center pt-10">
           
            <h2>Desenvolvido por:</h2>
            <ul className=" md:flex-row lista-alunos items-center justify-evenly pt-10 pb-10  ">
                {Alunos.map((p) => (
                        <li key={p.id}>
                            <p className="nome-aluno-footer">{p.nome}</p>
                        </li>
                    ))}
                
            </ul>
        </footer>
    )
}