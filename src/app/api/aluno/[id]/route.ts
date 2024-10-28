import { TipoAluno } from "@/types";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const file = await fs.readFile(process.cwd() + '/src/data/base.json', 'utf-8');
    const dados: TipoAluno[] = JSON.parse(file);
  
    const alunoId = parseInt(params.id, 10);
    const aluno = dados.find(p => p.id === alunoId);
  
    if (!aluno) {
      return NextResponse.json({ message: 'Aluno não encontrado' }, { status: 404 });
    }
  
    return NextResponse.json(aluno);
  }

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const file = await fs.readFile(process.cwd() + '/src/data/base.json', 'utf-8');
    const alunos: TipoAluno[] = JSON.parse(file);
  
    const { nome, rm, imagem, notasCp, notasChallenge, notasGlobal, notaNova } = await request.json();
  
 
    const alunoId = parseInt(params.id, 10);
    const indice = alunos.findIndex(a => a.id === alunoId);
  
    if (indice !== -1) {

      alunos.splice(indice, 1, {
        id: alunoId,
        nome,
        rm,
        imagem,
        notasCp,
        notasChallenge,
        notasGlobal,
        notaNova
      });
  
      const fileUpdate = JSON.stringify(alunos, null, 2);
      await fs.writeFile(process.cwd() + '/src/data/base.json', fileUpdate);
  
      return NextResponse.json({ msg: "Nota atualizada com sucesso!" });
    }
  
    return NextResponse.json({ msg: "Aluno não encontrado" }, { status: 404 });
  }
