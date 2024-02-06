import { AUTH_TOKEN } from "@/constants/localstorage"

export const apiCall = async (route, options) => {
       const token = localStorage.getItem(AUTH_TOKEN)

       const res =  await fetch(`/api/${route}`, {
          ...options,
          headers: {
               authorization: token ? `Bearer ${token}` : undefined
          }
     })

     return await res.json();
}