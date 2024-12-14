import type { Club, User } from "../types/models"
import axios from "axios"
import Cookies from "js-cookie"
import getBaseUrl from "./Api"

export async function getUser(): Promise<User | null> {
    const token = Cookies.get("session")

    if (!token) {
        return null
    }

    try {
        const response = await axios.get<User>(`${getBaseUrl()}/auth/@me`, {
            headers: {
                Authorization: `${token}`,
            },
        })
        if (!response.data.id) {
            Cookies.remove("session")
            return null
        }
        return response.data
    } catch {
        Cookies.remove("session")
        return null
    }
}
export async function getClub(): Promise<Club | null> {
    const token = Cookies.get("session")

    try {
        const response = await axios.get<Club>(`${getBaseUrl()}/club/get`, {
            headers: {
                Authorization: `${token}`,
            },
        })
        if (!response.data.id) {
            Cookies.remove("session")
            return null
        }
        return response.data
    } catch {
        Cookies.remove("session")
        return null
    }
}
