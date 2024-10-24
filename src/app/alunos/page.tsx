"use client";

import { TipoAluno } from "@/types";
import { color } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
import Link from "next/link";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,   
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  

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
    const responsividadeGrafico = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#ff0000',  
              font: {
                size: 14,  
              },
            },
          },
          tooltip: {
            titleFont: {
              size: 16,
            },
            bodyFont: {
              size: 14,
              color: '#ff0000',  
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: '#ff0000', 
            },
          },
          y: {
            ticks: {
              color: '#ff0000', 
            },
          },
        },
      };
      
      

    const dadosGraficoPorAluno = Alunos.map((aluno) => ({
        nome: aluno.nome,
        dados: {
            labels: ['Checkpoints', 'Challenges', 'Global Solutions'],
            datasets: [
                {
                    label: aluno.nome,
                    data: [
                        aluno.notasCp.reduce((a, b) => a + b, 0) / aluno.notasCp.length || 0,
                        aluno.notasChallenge.reduce((a, b) => a + b, 0) / aluno.notasChallenge.length || 0,
                        aluno.notasGlobal.reduce((a, b) => a + b, 0) / aluno.notasGlobal.length || 0,
                    ],
                    borderColor: '#ff0000',
                    backgroundColor: '#ffffff',
                    
                },
            ],
        }
    }));

    return (
        <div className="flex-col m-5 items-center justify-center ">
            <h2 className="flex-col font-bold text-5xl pb-20 text-center">Alunos</h2>
            <section className="sessao-aluno flex flex-wrap items-center justify-center gap-5">
                {Alunos.map((a,index) => (
                        <div key={a.id} className=" bg-red-900 w-full sm:w-1/1 md:w-1/3 h-[1000px] lg:h-[900px] p-6 rounded-md flex flex-col justify-between ">
                            <h2 className="nome-aluno text-3xl"> {a.nome}</h2>
                            <h2 className="rm-aluno text-2xl">RM:{a.rm}</h2>
                            <div className="flex flex-row  pt-3 pb-3">
                                <figure className="w-1/2">
                                    <Image src={a.imagem} className="imagem-aluno rounded-lg" alt="imagem aluno" width={250} height={300} />
                                </figure>
                                
                                <div className="flex flex-col ml-4"> 
                                    <h3>Media das notas dos checkpoints:
                                        <p className="font-bold">{(a.notasCp.reduce((a, b) => a + b, 0) / a.notasCp.length || 0).toFixed(2)}</p>
                                    </h3>
                                    <h3>Media das notas do challenge:
                                        <p className="font-bold">{(a.notasChallenge.reduce((a, b) => a + b, 0) / a.notasChallenge.length || 0).toFixed(2)}</p>
                                    </h3>
                                    <h3>Media das notas das global solution:
                                        <p className="font-bold mb-6">{(a.notasGlobal.reduce((a, b) => a + b, 0) / a.notasGlobal.length || 0).toFixed(2)}</p>
                                    </h3>
                                </div>
                            </div>
                            <div className="w-[80%] h-[240px] md:w-[80%] md:h-[300px] ">
                                 <Line data={dadosGraficoPorAluno[index].dados} options={responsividadeGrafico}/>
                            </div>
                           
                            
                            <div className="bg-red-500 rounded-lg w-full py-2 mb-6 text-center hover:bg-red-700 duration-300 hover:shadow-lg  cursor-pointer">
                            <Link href={`/alunos/${a.id}`}>Acessar Perfil</Link>
                            </div>
                            
                         </div>
                    ))}
                     
                         

            </section>
           
        </div>
    )
}
