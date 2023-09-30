import Link from "next/link";

const Pagamento = async ({params: {pag}} : {params : {pag: number}}) => {


    const response = await fetch(`https://newtailwindjson.vercel.app/posts/${pag}`)
    const valor = await response.json();

        let total = +valor.valor + 30

        let dataAtual = new Date();
        let ano = dataAtual.getFullYear();
        let mes:string | Number = dataAtual.getMonth() + 1; 
        let dia = dataAtual.getDate();
        let hora:string | Number = dataAtual.getHours();
        let minutos:string | Number = dataAtual.getMinutes();
        let horaformatada = hora + ',' + minutos

        if (minutos.valueOf() < 10) {
            minutos = 0 + '' + minutos
        }

        if(hora.valueOf() < 10) {
            hora = 0 + '' + hora
        }

        if(mes.valueOf() < 10) {
            mes = 0 + '' + mes
        }
        
        let dataFormatada = dia + '/' + mes + '/' + ano;






    return (
        <div className=" flex justify-center items-center min-h-screen flex-col"  >
            <div className=" bg-green-400 h-96 flex flex-col justify-between w-96 rounded-md" >
                    <h1 className="text-white flex justify-center text-2xl mt-5" >resumo da compra</h1>
                        <p className="ml-5">data da compra: {dataFormatada} {hora.valueOf()}:{minutos.valueOf()}</p>
                        <h1 className="ml-5">valor do pedido: R${valor.valor}</h1>
                        <h1 className="ml-5">valor do frete: R$30</h1>

                    <div className=" border-t-2  flex flex-col items-center" >
                        <h1 className="mt-2" > valor total :</h1>
                        <h1>R${total}</h1>
                    </div>
                    <div className="w-full flex justify-around mb-4">
                        <Link className="hover:scale-110" href={`/pais/${pag}`} >
                            volta
                        </Link>
                        <button className=" bg-slate-400 rounded-md w-32 h-8 hover:scale-110" >finalizar pedido</button>
                    </div>
            </div>
        </div>
        )
}

export default Pagamento;