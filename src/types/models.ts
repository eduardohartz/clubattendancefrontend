export interface User {
    id: string
    username: string
    password?: string
    status?: boolean
    admin?: boolean
    seenAt?: number
    lastIp?: string
    clubs?: Club[]
    seenStartPopup?: boolean
}

export interface Club {
    id: string
    externalId?: string
    displayName: string
    ownerId?: number
    status?: boolean
    volunteering: boolean
    useStaticCode: boolean
    allowSelfRegistration: boolean
    officer?: string
    owner?: User
}

export interface Meeting {
    id: string
    clubId?: number | null
    status: "ongoing" | "ended"
    startTime: number
    endTime?: number | null
    code?: string | null
    notes?: string | null
    volunteering?: boolean | null
}

export interface Member {
    id: string
    clubId?: number | null
    firstName: string
    lastName: string
    status?: "active" | "inactive" | "graduated"
    joinedAt: number
}
