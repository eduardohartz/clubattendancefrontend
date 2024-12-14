export function getBaseUrl() {
    let url
    switch (import.meta.env.VITE_ENV) {
        case "development":
            url = "http://localhost:3001"
            break
        case "production":
        default:
            url = "https://api.clubattendance.com"
    }

    return url
}

export function getWsUrl() {
    let url
    switch (import.meta.env.VITE_ENV) {
        case "development":
            url = "ws://localhost:3001"
            break
        case "production":
        default:
            url = "wss://api.clubattendance.com"
    }

    return url
}

export default getBaseUrl
