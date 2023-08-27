import axios from 'axios';


type FormValues = {
    name: string,
    description: string,
    price: number,
}

export const getProducts = () => axios.get('https://supabase-puce.vercel.app/products')
    .then((response) => {
        return response?.data?.data
    })
    .catch((error) => {
        return error

    })

export const getProduct = (ID: number) => axios.get('https://supabase-puce.vercel.app/products/' + ID)
    .then((response) => {
        return response?.data?.data[0] || null
    })
    .catch((error) => {
        return error
    })

export const postProduct = (payload: FormValues) => axios.post('https://supabase-puce.vercel.app/products', payload)
    .then((response) => {
        return response.data
    })
    .catch((error) => {
        return error
    })

export const putProduct = (payload: FormValues, ID: number) => axios.put('https://supabase-puce.vercel.app/products/' + ID, payload)
    .then((response) => {
        return response.data
    })
    .catch((error) => {
        return error
    })

export const deleteProduct = (ID: number) => axios.delete('https://supabase-puce.vercel.app/products/' + ID)
    .then((response) => {
        return response.data
    })
    .catch((error) => {
        return error
    })



