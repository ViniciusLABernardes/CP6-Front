import Image from "next/image";
import imgFiap from "@/img/img-01-fiap-logo.png";
import Link from "next/link";
export default function Cabecalho(){
    return(
        <header className="flex items-center justify-evenly ">
            <Image src={imgFiap} alt="logo fiap" width={350} height={250}></Image>
            <ul className="menu-header flex items-center justify-evenly gap-10">
                <li className="links"><Link href="/">Pagina Inicial</Link></li>
                <li className="links"><Link href="/">Alterar nota</Link></li>
                <li className="links"><Link href="/">Cadastrar nota</Link></li>
            </ul>
        </header>
    )
}