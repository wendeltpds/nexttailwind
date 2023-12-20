import { FilterContext } from "@/contextos/contexts"
import { useContext } from "react";

export function UseFilter(){
    return useContext(FilterContext)
}