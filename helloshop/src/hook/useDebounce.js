import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"

export const useDebounce = (value,delay)=>{
    const [valueD,setValueD] = useState('')
    useEffect(()=>{
        const handle = setTimeout(()=>{
            setValueD(value)
        },[delay])
        return() =>{
            clearTimeout(handle)
        }
    },[value])
    
    return valueD
}