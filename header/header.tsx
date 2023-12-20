"use client"
import Link from "next/link"
import Image from "next/image"
import logowendel from '@/public/wendel.png'
import { signIn, signOut, useSession } from "next-auth/react";
import { CiShoppingCart } from "react-icons/ci";


export const Header = () => {
    const { data: session } = useSession()
    return (
        <div className=" bg-slate-400 h-28 w-full" >
            <div className="flex justify-around h-full items-center" >
                <div>
                    <h1><Link href= '/' ><Image className=" w-48" src={logowendel} alt="imagem logo wendel" /></Link></h1>
                </div>

                <div className="flex justify-around w-72" >
                    {
                        !session ? 
                        <button className=" bg-black text-white rounded-full w-16" onClick={() => signIn()} >logar</button>
                        :
                        <button className=" bg-black text-white rounded-full w-16" onClick={() => signOut()} >logout</button>
                    }
                    <Link href= '/' >home</Link>
                    <Link href= '/contato' >contato</Link>
                    <Link href= '/sobre' >sobre</Link>
                    {
                        session &&
                        <div className=" relative">
                            <span className=" absolute ml-2 bottom-2 w-2 text-red-800 ">0</span>
                            <CiShoppingCart className = " text-2xl cursor-pointer absolute mt-1"/>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}