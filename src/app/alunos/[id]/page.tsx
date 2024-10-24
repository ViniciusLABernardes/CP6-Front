"use client";

import { TipoAluno } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AtualizarNota({ params }: { params: { id: number } }) {

  const navigate = useRouter();

  const [Aluno, setAluno] = useState<TipoAluno>({
    id: 0,
    nome: "",
    rm: 0,
    imagem:"",
    notasCp: [0, 0, 0, 0, 0, 0],
    notasChallenge: [0, 0, 0, 0],
    notasGlobal: [0, 0],
    notaNova: { nomeAtividade: "", nota: 0 }
  });
  type Atividades = "notasCp" | "notasChallenge" | "notasGlobal";

  const [atividadeSelecionada, setAtividadeSelecionada] = useState<Atividades>("notasCp");
 
  const [notaIndex, setNotaIndex] = useState(0); // 

  useEffect(() => {
    const chamadaApi = async () => {
      const response = await fetch(`http://localhost:3000/api/aluno/${params.id}`);
      const data = await response.json();
      setAluno(data);
    };
    chamadaApi();
  }, [params]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
   
    setAtividadeSelecionada(e.target.value as Atividades);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = parseFloat(e.target.value);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/aluno/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(Aluno)
      });

      if (response.ok) {
        alert("Nota atualizada com sucesso.");
        navigate.push("/alunos");
      }

    } catch (error) {
      console.error("Erro ao atualizar nota!", error);
    }
  };

  return (
    <div>
      <h2>Aluno</h2>

      <div>
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>

          <h2>De qual atividade você deseja alterar a nota?</h2>
          <select value={atividadeSelecionada} onChange={handleSelectChange}>
            <option value="notasCp">Notas CPs</option>
            <option value="notasChallenge">Notas Challenges</option>
            <option value="notasGlobal">Notas Global</option>
          </select>

          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Nota
            </label>
            <input
              type="number"
              id="idNota"
              name="nota"
              value={Aluno[atividadeSelecionada][notaIndex]} // Usa a atividade e o índice da nota
              onChange={(e) => handleInputChange(e, notaIndex)} // Atualiza a nota
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nota"
              required
            />
          </div>
        
          <div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Alterar Nota
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
}
