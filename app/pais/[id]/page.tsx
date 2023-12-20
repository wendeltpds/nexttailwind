import Image from 'next/image';
import logo from '@/public/carro.jpg';
import Link from 'next/link';


interface CarrinhoItem {
  id: number;
  nome: string;
  mensagem: string;
  valor: number;
}


const Pais = async ({ params: { id } }: { params: { id: number } }) => {
  
  const response = await fetch(`https://newtailwindjson.vercel.app/posts/${id}`);
  const carro: CarrinhoItem = await response.json();


  return (
    <section className="w-full min-h-screen flex justify-center items-center flex-col">
      <div key={carro.id}>
        <h1 className="text-3xl mb-10">Os dados de compra do seu carro são:</h1>
        <div className="max-w-sm bg-gradient-to-r from-cyan-500 to-blue-500 ml-10 mb-10 flex justify-center items-center flex-col rounded-lg">
          <Image src={logo} alt="carro" className="mt-5" width={300} height={200} />
          <h3>{carro.nome}</h3>
          <p className="ml-2">{carro.mensagem}</p>
          <p>{`R$ ${carro.valor}`}</p>
          <div className="flex">
            <Link href={'/'}>
              <button className="text-base mr-8 border-b-2 mb-2">Voltar</button>
            </Link>

            <Link href={`/pagamento/${carro.id}`} >
              <button className="text-base border-b-2 mb-2">
                Escolher forma de pagamento
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pais;





