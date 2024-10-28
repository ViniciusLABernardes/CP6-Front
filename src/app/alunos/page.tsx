"use client";

import React from 'react';
import { TipoAluno } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import Link from "next/link";
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default function Alunos() {
  const [Alunos, setAlunos] = useState<TipoAluno[]>([]);

  useEffect(() => {
    const chamadaApi = async () => {
      const response = await fetch("http://localhost:3000/api/aluno");
      const data = await response.json();
      setAlunos(data);
    };
    chamadaApi();
  }, []);

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
        type: 'category',
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

  return (
    <div className="flex-col m-5 items-center justify-center">
      <h2 className="flex-col font-bold text-5xl pb-20 text-center text-white">Alunos</h2>
      <section className="sessao-aluno flex flex-wrap items-center justify-center gap-5">
        {Alunos.map((a) => (
          <div key={a.id} className="bg-red-900 w-full sm:w-1/1 md:w-1/3 h-[700px] lg:h-[600px] p-6 rounded-md flex flex-col justify-between">
            <h2 className="nome-aluno text-3xl text-white"> {a.nome}</h2>
            <h2 className="rm-aluno text-2xl text-white">RM: {a.rm}</h2>
            <div className="flex flex-row pt-3 pb-3">
              <figure className="w-1/2">
                <Image src={a.imagem} alt="imagem aluno" width={100} height={100} className="rounded-full" />
              </figure>
            </div>
            <div className="bg-white rounded-md shadow-md p-4 mt-4">
              <h3 className="text-xl font-bold text-red-900">Notas CP:</h3>
              <div style={{ height: '200px', width: '100%' }}>
                <Line
                  data={{
                    labels: ['Nota 1', 'Nota 2', 'Nota 3', 'Nota 4', 'Nota 5', 'Nota 6'],
                    datasets: [{
                      label: 'Notas CP',
                      data: a.notasCp,
                      borderColor: 'rgba(255, 0, 0, 1)',
                      backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    }]
                  }}
                  // @ts-ignore
                  options={responsividadeGrafico}
                />
              </div>
            </div>
            <Link href={`/alunos/${a.id}`} className="bg-white text-red-900 font-semibold py-2 px-4 rounded mt-4 text-center">Acessar Perfil</Link>
          </div>
        ))}
      </section>
    </div>
  );
}
