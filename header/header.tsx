import Link from "next/link"
import Image from "next/image"
import logowendel from '@/public/wendel.png'


export const Header = () => {
    return (
        <div className=" bg-slate-400 h-28 w-full" >
            <div className="flex justify-around h-full items-center" >
                <div>
                    <h1><Link href= '/' ><Image className=" w-48" src={logowendel} alt="imagem logo wendel" /></Link></h1>
                </div>

                <div className="flex justify-around w-72" >
                    <Link href= '/' >home</Link>
                    <Link href= '/contato' >contato</Link>
                    <Link href= '/sobre' >sobre</Link>
                </div>
            </div>
        </div>
    )
}