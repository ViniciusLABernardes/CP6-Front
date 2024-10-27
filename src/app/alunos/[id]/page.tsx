"use client";

import { useParams } from "next/navigation";
import { TipoAluno } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AtualizarNota() {
  const { id } = useParams();
  const navigate = useRouter();

  const [aluno, setAluno] = useState<TipoAluno | null>(null);
  const [novaNota, setNovaNota] = useState({ nomeAtividade: "", nota: 0 });
  const [alterarNota, setAlterarNota] = useState({ index: -1, tipo: "", nota: 0 });
  const [showModal, setShowModal] = useState(false);
  const [isEditingCp, setIsEditingCp] = useState(-1);
  const [isEditingChallenge, setIsEditingChallenge] = useState(-1);
  const [isEditingGlobal, setIsEditingGlobal] = useState(-1);

  useEffect(() => {
    const chamadaApi = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/aluno/${id}`);
        if (!response.ok) throw new Error("Erro ao buscar dados do aluno");
        const data = await response.json();
        setAluno(data);
      } catch (error) {
        console.error("Erro na chamada da API:", error);
      }
    };
    chamadaApi();
  }, [id]);

  const handleAddNota = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (aluno) {
      const updatedAluno = { ...aluno, notasCp: [...aluno.notasCp, novaNota.nota] };
      try {
        const response = await fetch(`http://localhost:3000/api/aluno/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedAluno),
        });
        if (response.ok) {
          alert("Nota adicionada com sucesso.");
          setAluno(updatedAluno);
          setNovaNota({ nomeAtividade: "", nota: 0 });
        }
      } catch (error) {
        console.error("Erro ao adicionar nota!", error);
      }
    }
  };

  const handleEditNota = async () => {
    const updatedAluno = { ...aluno };
    if (alterarNota.tipo === "Cp") updatedAluno.notasCp[alterarNota.index] = alterarNota.nota;
    else if (alterarNota.tipo === "Challenge") updatedAluno.notasChallenge[alterarNota.index] = alterarNota.nota;
    else if (alterarNota.tipo === "Global") updatedAluno.notasGlobal[alterarNota.index] = alterarNota.nota;
    try {
      const response = await fetch(`http://localhost:3000/api/aluno/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedAluno),
      });
      if (response.ok) {
        alert("Nota atualizada com sucesso.");
        setAluno(updatedAluno);
        setShowModal(false);
      }
    } catch (error) {
      console.error("Erro ao atualizar nota!", error);
    }
  };

  const data = {
    labels: ["Checkpoints", "Sprints", "Global Solutions"],
    datasets: [
      {
        label: "Notas",
        data: [
          aluno?.notasCp?.reduce((a, b) => a + b, 0) / aluno?.notasCp.length || 0,
          aluno?.notasChallenge?.reduce((a, b) => a + b, 0) / aluno?.notasChallenge.length || 0,
          aluno?.notasGlobal[0] || 0,
        ],
        backgroundColor: ["#f87171", "#fbbf24", "#34d399"],
      },
    ],
  };

  return (
    <div className="flex flex-row p-5 bg-[#1e1e1e] min-h-screen text-white space-x-6">
      {aluno ? (
        <>
          <div className="flex flex-col w-1/3 space-y-6">
            <section className="p-5 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-pink-400">Checkpoints</h3>
              <div className="flex space-x-2 mt-3">
                {aluno.notasCp.map((nota, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-700 rounded-md text-center w-16 relative"
                    onMouseEnter={() => setIsEditingCp(index)}
                    onMouseLeave={() => setIsEditingCp(-1)}
                  >
                    {nota}
                    {isEditingCp === index && (
                      <>
                        <button
                          onClick={() => {
                            setAlterarNota({ index, tipo: "Cp", nota });
                            setShowModal(true);
                          }}
                          className="absolute top-0 right-0 text-xs text-yellow-300"
                        >
                          ✏️
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </section>
            <section className="p-5 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-yellow-400">Sprints</h3>
              <div className="flex space-x-2 mt-3">
                {aluno.notasChallenge.map((nota, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-700 rounded-md text-center w-16 relative"
                    onMouseEnter={() => setIsEditingChallenge(index)}
                    onMouseLeave={() => setIsEditingChallenge(-1)}
                  >
                    {nota}
                    {isEditingChallenge === index && (
                      <button
                        onClick={() => {
                          setAlterarNota({ index, tipo: "Challenge", nota });
                          setShowModal(true);
                        }}
                        className="absolute top-0 right-0 text-xs text-yellow-300"
                      >
                        ✏️
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </section>
            <section className="p-5 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-green-400">Global Solutions</h3>
              <div className="flex space-x-2 mt-3">
                {aluno.notasGlobal.map((nota, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-700 rounded-md text-center w-16 relative"
                    onMouseEnter={() => setIsEditingGlobal(index)}
                    onMouseLeave={() => setIsEditingGlobal(-1)}
                  >
                    {nota}
                    {isEditingGlobal === index && (
                      <button
                        onClick={() => {
                          setAlterarNota({ index, tipo: "Global", nota });
                          setShowModal(true);
                        }}
                        className="absolute top-0 right-0 text-xs text-yellow-300"
                      >
                        ✏️
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="flex flex-col w-1/3 items-center justify-center">
            <h3 className="text-2xl font-semibold text-yellow-400 mb-4">Gráfico de Notas</h3>
            <Bar data={data} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </div>

          <div className="flex flex-col w-1/3 space-y-6">
            <form onSubmit={handleAddNota} className="flex flex-col bg-gray-800 p-5 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-purple-400 mb-4">Adicionar Nota</h3>
              <input
                type="text"
                value={novaNota.nomeAtividade}
                onChange={(e) => setNovaNota({ ...novaNota, nomeAtividade: e.target.value })}
                required
                className="mt-1 block w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md"
                placeholder="Nome da Atividade"
              />
              <input
                type="number"
                value={novaNota.nota}
                onChange={(e) => setNovaNota({ ...novaNota, nota: parseFloat(e.target.value) })}
                required
                className="mt-1 block w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md"
                placeholder="Nota"
              />
              <button
                type="submit"
                className="bg-purple-600 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-500 mt-3"
              >
                Adicionar Nota
              </button>
            </form>
          </div>

          {showModal && (
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold text-yellow-400">Editar Nota</h2>
                <input
                  type="number"
                  value={alterarNota.nota}
                  onChange={(e) => setAlterarNota({ ...alterarNota, nota: parseFloat(e.target.value) })}
                  className="mt-1 block w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md"
                />
                <button
                  onClick={handleEditNota}
                  className="bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-500 mt-3"
                >
                  Atualizar
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-500 mt-3"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div>Carregando...</div>
      )}
    </div>
  );
}
