import { NextResponse } from "next/server";
import {promises as fs} from "fs";
import { TipoAluno } from "@/types";

export async function GET() {   
    const file = await fs.readFile(process.cwd() + '/src/data/base.json','utf-8');
    const dados = JSON.parse(file);
    return NextResponse.json(dados);
}

export async function POST(request:Request) {


    const file = await fs.readFile(process.cwd() + '/src/data/base.json','utf-8');

    const alunos:TipoAluno[] = JSON.parse(file);
    

    const{ id,nome,imagem,notasCp,notasChallenge,notasGlobal} = await request.json();

   
    const Aluno = { id,nome,imagem,notasCp,notasChallenge,notasGlobal} as TipoAluno;

    Aluno.id = (alunos[ alunos.length - 1 ].id + 1);

    alunos.push(Aluno);
  
    const fileCreated = JSON.stringify(alunos);
    await fs.writeFile(process.cwd() + '/src/data/base.json',fileCreated);
        
    return NextResponse.json(Aluno,{status:201});

}