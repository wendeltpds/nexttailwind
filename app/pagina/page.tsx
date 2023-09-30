import Link from "next/link";


const pagina = () => {
    return (
        <div  className="flex items-center justify-center min-h-screen flex-col"  >
            <h1 className="text-red-700 text-5xl flex-col" >ola</h1>
            <Link href= '/' >voltar</Link>
        </div>
    )
}

export default pagina;