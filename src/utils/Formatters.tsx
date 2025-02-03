export function formatDate(timestamp: string) {
    if (!timestamp)
        return "N/A"
    const date = new Date(Number.parseInt(timestamp) * 1000)
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })
}

export function formatTime(timestamp: string) {
    if (!timestamp)
        return "N/A"
    const date = new Date(Number.parseInt(timestamp) * 1000)
    return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    })
}

export function formatLength(timestamp1: number, timestamp2: number) {
    const durationMs = Math.abs(((timestamp1) * 1000) - (timestamp2 * 1000))
    const durationSec = Math.floor(durationMs / 1000)
    const hours = Math.floor(durationSec / 3600)
    const minutes = Math.floor((durationSec % 3600) / 60)
    const seconds = durationSec % 60

    const durationStr = `${hours.toString().padStart(2, "0")}h:${minutes
        .toString()
        .padStart(2, "0")}m:${seconds.toString().padStart(2, "0")}s`

    return durationStr
}