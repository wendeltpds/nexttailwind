"use client"
import { DataItem } from "@/types/types";
import { ReactNode, createContext, useState } from "react";


interface FilterContextProps {
    dados: DataItem[];
    nome: string;
    mensagem: string;
    valor: number | string;
    itemEditandoId: number;
    nomeEditado: string;
    mensagemEditada: string;
    valorEditado: string;
    setdados: (value: DataItem[]) => void;
    setNome: (value: string) => void;
    setmensagem: (value: string) => void;
    setvalor: (value: number | string) => void;
    setItemEditandoId: (value: number) => void;
    setNomeEditado: (value: string) => void;
    setMensagemEditada: (value: string) => void;
    setValorEditado: (value: string) => void;
  }


export const FilterContext = createContext<FilterContextProps>({
    dados: [],
    nome: '',
    mensagem:"" ,
    valor: 0,
    itemEditandoId: 0,
    nomeEditado: '' ,
    mensagemEditada: '',
    valorEditado: '' ,
    setdados: (value: DataItem[] ) => {},
    setNome: (value: string) => {},
    setmensagem: (value: string) => {},
    setvalor: (value: number | string) => {},
    setItemEditandoId: (value: number) => {},
    setNomeEditado: (value: string) => {},
    setMensagemEditada: (value: string) => {},
    setValorEditado: (value: string) => {},
})

interface ProviderProps {
    children: ReactNode
}

export function FilterContextProvider({ children } : ProviderProps) {
    const [dados, setdados] = useState<DataItem[]>([]);
    const [nome, setNome] = useState<string>("");
    const [mensagem, setmensagem] = useState<string>('');
    const [valor, setvalor] = useState<number | string>('');
    const [itemEditandoId, setItemEditandoId] = useState<number>(0);
    const [nomeEditado, setNomeEditado] = useState('');
    const [mensagemEditada, setMensagemEditada] = useState('');
    const [valorEditado, setValorEditado] = useState('');
  
    return (
        <FilterContext.Provider value={{
            dados, 
            setdados, 
            nome, 
            setNome, 
            mensagem,
            setmensagem,
            valor,
            setvalor, 
            itemEditandoId ,
            setItemEditandoId , 
            nomeEditado,
            setNomeEditado,
            mensagemEditada,
            setMensagemEditada,
            valorEditado,
            setValorEditado
            }}>
            {children}
        </FilterContext.Provider>
    )
}