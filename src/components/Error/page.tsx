import Image from 'next/image'


export default function ErrorComponent(){
return(
    <div className="bg-white">
        <h2>Esta página não existe, para voltar para página inicial, clique aqui!</h2>
        <Image
      src="/CP6-Front\src\img\stitch.jpg"
      width={500}
      height={500}
      alt="Stitch triste"
    />
    </div>
)
}