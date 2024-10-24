export type TipoAluno = {
    id: number,
    nome: string,
    rm:number,
    imagem: string,
    notasCp:[
        nota1:number,
        nota2:number,
        nota3:number,
        nota4:number,
        nota5:number,
        nota6:number,
    ],
    notasChallenge:[
        nota1:number,
        nota2:number,
        nota3:number,
        nota4:number,
    ]
    notasGlobal:[
        nota1:number,
        nota2:number,
    ]
    notaNova:{
        nomeAtividade:string,
        nota:number
    }
}