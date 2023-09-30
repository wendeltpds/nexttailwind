"use client"
import Image from 'next/image';
import React, { FormEvent, useEffect, useState } from "react";
import logo from '@/public/carro.jpg';
import Link from 'next/link';
import { toast } from 'react-toastify';

type DataItem = {
  id: number;
  nome: string;
  mensagem: string;
  valor: number | string;
};


export function Main() {

  const [dados, setdados] = useState<DataItem[]>([]);
  const [nome, setnome] = useState<string>("");
  const [mensagem, setmensagem] = useState<string>('');
  const [valor, setvalor] = useState<number| string>();



  const [itemEditandoId, setItemEditandoId] = useState<number | null>(null);
  const [nomeEditado, setNomeEditado] = useState('');
  const [mensagemEditada, setMensagemEditada] = useState('');
  const [valorEditado, setValorEditado] = useState('');



      useEffect(() => {
          fetch('https://newtailwindjson.vercel.app/posts', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
          })
            .then((resp) => resp.json())
            .then((data) => {
              setdados(data);
            });
        }, [dados]);
      
        const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault();
      
          const novoDado = {
            nome: nome,
            mensagem: mensagem,
            valor: valor,
          };
      
          fetch('https://newtailwindjson.vercel.app/posts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoDado),
          })
            //.then((resp) => resp.json())
            .then((data) => {
              //alert("Dados enviados com sucesso:");
              toast.success('Dados enviados com sucesso')
              
              setnome('');
              setmensagem('');
              setvalor('');
              
              setdados([...dados, data]);

            })
            .catch((error) => {
              console.error("Erro ao enviar dados:", error);
            });
        };

  const deleteItem = (id: number) => {
    fetch(`https://newtailwindjson.vercel.app/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((resp) => resp.json())
      .then(() => {
        setdados(dados.filter((project) => project.id !== id));
      });
  };


  const handleEditarItem = (item: DataItem) => {
    setItemEditandoId(item.id);
    setNomeEditado(item.nome);
    setMensagemEditada(item.mensagem);
    setValorEditado(item.valor.toString());
  };
  
  const handleAtualizarItem = (id: number) => {
    const dadosAtualizados = {
      nome: nomeEditado,
      mensagem: mensagemEditada,
      valor: valorEditado,
    };
  
    fetch(`https://newtailwindjson.vercel.app/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dadosAtualizados)
    })
      .then((resp) => resp.json())
      .then((data) => {
        const novosDados = dados.map((item) => (item.id === id ? data : item));
        setdados(novosDados);
  
        setItemEditandoId(null);
        setNomeEditado('');
        setMensagemEditada('');
        setValorEditado('');
      })
      .catch((error) => {
        console.log("Erro ao atualizar dados:", error);
      });
  };


  return (
    <div className='w-full' >
        <p className='flex justify-center text-2xl font-black' >escreva os dados do carro para criar um novo</p>

        <div className='flex justify-center' >

        <form className=' flex  flex-col  ml-10 mt-5  lg:flex-row' onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setnome(e.target.value)}
          required
          className=' border-2 border-black mr-4'
        />
          <textarea 
          name="mensagem"
          placeholder="mensagem"
          value={mensagem}
          onChange={(e) => setmensagem(e.target.value)}
          required
          className=' border-2 border-black mr-4 h-20 lg:h-8'
          maxLength={182}
        />
          <input
          type="number"
          name="valor"
          placeholder="valor do carro"
          value={valor}
          onChange={(e) => setvalor(e.target.value)}
          required
          className=' border-2 border-black mr-4'
        />
        <button className='border-4 mr-4 border-black rounded-lg text-white bg-black' type="submit">Enviar</button>
      </form>

        </div>

      <div className='flex flex-wrap justify-center' >
        {dados.map((pessoal) => (
        <div key={pessoal.id}>
        {itemEditandoId === pessoal.id ? (
        <form className='flex flex-col ml-7' onSubmit={() => handleAtualizarItem(pessoal.id)}>
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={nomeEditado}
            onChange={(e) => setNomeEditado(e.target.value)}
            required
            className='border-2 border-black mb-2 mt-5'
          />
          <textarea
            name="mensagem"
            placeholder="Mensagem"
            value={mensagemEditada}
            onChange={(e) => setMensagemEditada(e.target.value)}
            required
            className='border-2 border-black  mb-2'
          />
          <input
            type="number"
            name="valor"
            placeholder="Valor do carro"
            value={valorEditado}
            onChange={(e) => setValorEditado(e.target.value)}
            required
            className='border-2 border-black mb-2'
          />
          <button className='border-4 border-black rounded-lg text-white bg-black' type="submit">Atualizar</button>
        </form>
      ) : (
        <section className=' flex justify-center mt-5 w-full b' >
          <div className="bg-gradient-to-r relative from-cyan-500 to-blue-500 mr-5 ml-5 mb-10 flex justify-center items-center flex-col rounded-lg h-[30rem] w-72 sm:w-96">
            <Image src={logo} alt="carro" className=" absolute top-4" width={300} height={200} />
            <h3 className=' absolute top-48' >{pessoal.nome}</h3>
            <p className="ml-2 absolute top-56">{pessoal.mensagem}</p>
            <p className=' absolute bottom-16' >{`R$ ${pessoal.valor}`}</p>
            <div className='flex justify-center items-center absolute bottom-2' >
              <button
                className="bg-gradient-to-tr from-orange-500 to-orange-800 h-10  rounded-md text-lg p-1"
                id="button"
                type="button"
                onClick={() => handleEditarItem(pessoal)}
              >
                Editar
              </button>

              <button
                className="bg-gradient-to-tr from-orange-500 to-orange-800 h-10 mt-2 mb-2 rounded-md text-lg p-1 ml-4"
                id="button"
                type="button"
                onClick={() => deleteItem(pessoal.id)}
              >
                Excluir
              </button>

            <Link href={`/pais/${pessoal.id}`} >
              <button
                className="bg-gradient-to-tr from-orange-500 to-orange-800 h-10 mt-2 mb-2 rounded-md text-lg p-1 ml-4"
                id="button"
                type="button"
              >
                comprar
              </button>
            </Link>

            </div>
          </div>
        </section>
      )}
    </div>
))}
      </div>
    </div>
  );
};