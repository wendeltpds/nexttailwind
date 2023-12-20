import { UseFilter } from "@/hooks/useFilter";
import { DataItem } from "@/types/types";
import { toast } from "react-toastify";


export function Helpers() {
    const { setdados , dados , valorEditado, setValorEditado ,
        mensagemEditada, setMensagemEditada ,
        nomeEditado, setNomeEditado ,
        itemEditandoId, setItemEditandoId ,
        valor, setvalor ,
        mensagem, setmensagem ,
        nome, setNome
     } = UseFilter();
    
    
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
    
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        const novoDado = {
          nome,
          mensagem,
          valor,
        };
    
        fetch('https://newtailwindjson.vercel.app/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(novoDado),
        })
          .then((resp) => resp.json())
          .then((data) => {
            
            setdados([...dados, data]);
            
          })
          .catch((error) => {
            console.error("Erro ao enviar dados:", error);
          });
          toast.success('Dados enviados com sucesso')
          
          setNome('');
          setmensagem('');
          setvalor(0);
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
        toast.success('item deletado com sucesso')
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
    
        setItemEditandoId(0);
        setNomeEditado('');
        setMensagemEditada('');
        setValorEditado('');
        })
        .catch((error) => {
        console.log("Erro ao atualizar dados:", error);
        });
    };

    return {
        handleSubmit,
        deleteItem,
        handleEditarItem,
        handleAtualizarItem
      };
}

