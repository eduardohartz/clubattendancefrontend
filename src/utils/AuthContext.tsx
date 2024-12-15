/* eslint react-refresh/only-export-components: 0 */ // --> OFF

import type { ReactNode } from "react"
import type { Club, User } from "../types/models"
import { createContext, useContext, useState } from "react"

interface AuthContextType {
    user: User | null
    club: Club | null
    setUser: (user: User | null) => void
    setClub: (club: Club | null) => void
    isLoading: boolean
    setIsLoading: (loading: boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [club, setClub] = useState<Club | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    return (
        <AuthContext.Provider value={{ user, club, setUser, setClub, isLoading, setIsLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
