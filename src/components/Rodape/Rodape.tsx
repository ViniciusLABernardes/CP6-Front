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
        <footer className="rodape">
           
            <h2>Desenvolvido por:</h2>
            <ul className="lista-alunos flex items-center justify-evenly ">
                {Alunos.map((p) => (
                        <li key={p.id}>
                            <p className="nome-aluno-footer">{p.nome}</p>
                        </li>
                    ))}
                
            </ul>
        </footer>
    )
}