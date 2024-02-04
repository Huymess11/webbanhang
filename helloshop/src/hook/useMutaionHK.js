import { useMutation } from "@tanstack/react-query"

export const useMutationHK = (callBack)=>{
    const mutation = useMutation({
        mutationFn: callBack
      })
      return mutation
}