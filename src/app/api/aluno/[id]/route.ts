import { TipoAluno } from "@/types";
import { promises as fs } from "fs";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const file = await fs.readFile(process.cwd() + '/src/data/base.json', 'utf-8');
    const dados: TipoAluno[] = JSON.parse(file);
  
    const alunoId = parseInt(params.id, 10);
    const aluno = dados.find(p => p.id === alunoId);
  
    return NextResponse.json(aluno);
}

export async function PUT(request: Request, { params }: { params: { id: number } }) {

  
    const file = await fs.readFile(process.cwd() + '/src/data/base.json','utf-8');

    const alunos:TipoAluno[] = JSON.parse(file);
    
    const{nome,rm,imagem,notasCp,notasChallenge,notasGlobal,notaNova} = await request.json();

    const indice = alunos.findIndex(a => a.id == params.id);

    if(indice != -1){
        alunos.splice(indice, 1, { id: parseInt(params.id.toString()) , nome,rm, imagem, notasCp,notasChallenge,notasGlobal,notaNova});
    
       
        const fileUpdate = JSON.stringify(alunos);
        await fs.writeFile(process.cwd() + '/src/data/base.json',fileUpdate);
            
        return NextResponse.json({msg:"Nota atualizada com sucesso!"});
    
    }
}

