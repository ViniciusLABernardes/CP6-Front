import Image from "next/image";
import imgFiap from "@/img/img-01-fiap-logo.png";
import Link from "next/link";
export default function Cabecalho(){
    return(
        <header className="flex items-center justify-evenly flex-col md:flex-row">
            <Image src={imgFiap} alt="logo fiap" width={150} height={250} className="mt-2 "></Image>
            <ul className="menu-header flex items-center justify-evenly gap-10">
                <li className="links s"><Link href="/">Pagina Inicial</Link></li>
                <li className="links"><a href="https://github.com/ViniciusLABernardes/CP6-Front" target="blank">Github</a></li>
            </ul>
        </header>
    )
}