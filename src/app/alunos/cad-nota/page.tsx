"use client";

import { TipoAluno } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CadAlunos() {

  const navigate = useRouter();

    const [Aluno, setAluno] = useState<TipoAluno>({
        id: 0,
        nome: "",
        rm:0,
        imagem:"",
        notasCp:[
          0,
          0,
          0,
          0,
          0,
          0
        ],
        notasChallenge:[
          0,
          0,
          0,
          0,
        ],
        notasGlobal:[
          0,
          0
        ],
        notaNova:{
          nomeAtividade:"",
          nota:0
        }
    });

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();

      try {
        const response = await fetch(process.env.ENDPOINT_URL as string, {
          method:"POST",
          headers:{
            "Content-Type" : "application/json"
          },
          body: JSON.stringify(Aluno)
        });

        if(response.ok){
          alert("Nota cadastrada com sucesso.")
          setAluno({
            id: 0,
            nome: "",
            rm:0,
            imagem:"",
            notasCp:[
              0,
              0,
              0,
              0,
              0,
              0
            ],
            notasChallenge:[
              0,
              0,
              0,
              0,
            ],
            notasGlobal:[
              0,
              0
            ],
            notaNova:{
              nomeAtividade:"",
              nota:0
            }
        });
          navigate.push("/alunos");
        }

      } catch (error) {
        console.error("Falha ao cadastrar Nota!",error);
      }
 
    }


  return (
    <div>
        <h1>Cadastrar Nota</h1>
        <div>
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
         
        <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Nome Atividade</label>
            <input
              type="string"
              id="idNomeNota"
              name="nome-nota"
              value={Aluno.notaNova.nomeAtividade}
              onChange={(e) => {
                const newNota: {nomeAtividade:string,nota:number} = {...Aluno.notaNova};
                newNota.nomeAtividade =(e.target.value); 
                setAluno({...Aluno, notaNova: newNota}); 
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nome da Atividade"
              required
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Nota</label>
            <input
              type="number"
              id="idNota"
              name="nota"
              value={Aluno.notasCp[0]}
              onChange={(e) => {
                const newNota: {nomeAtividade:string,nota:number} = {...Aluno.notaNova};
                newNota.nota = parseFloat(e.target.value); 
                setAluno({...Aluno, notaNova: newNota}); 
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nota"
              required
            />
          </div>
          
          <div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cadastrar Nota</button>
          </div>

        </form>
      </div>
     
    </div>
  )
}
