import axios, { type CreateAxiosDefaults } from "axios"

const options: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
}

const axiosClassic = axios.create(options)

export { axiosClassic }
