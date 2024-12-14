import type { Club, User } from "../types/models"
import Cookies from "js-cookie"
import { useCallback, useEffect, useRef, useState } from "react"
import { getWsUrl } from "../services/Api"
import { FetchData } from "../services/FetchData"
import { formatDate, formatTime } from "../utils/Formatters"
import { dataKeyMap, getActions, getStatus, headersMap } from "../utils/TableHelpers"
import Loading from "./Loading"

function Table({ type, id = "", user, club }: { type: "meetings" | "members" | "attendees" | "attendance" | "users" | "clubs" | "customFields", id?: string, user: User | null, club: Club | null }) {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const wsRef = useRef<WebSocket | null>(null)
    const token = Cookies.get("session")

    const reloadData = useCallback(async () => {
        setIsLoading(true)
        if (wsRef.current !== null) {
            wsRef.current.close()
        }
        if (type === "attendees") {
            wsRef.current = new WebSocket(getWsUrl())
            wsRef.current.onopen = () => {
                wsRef.current?.send(JSON.stringify({
                    session: token,
                    type: "attendees",
                    id,
                }))
            }
            wsRef.current.onmessage = (event) => {
                const message = JSON.parse(event.data)
                if (message.type === "attendees") {
                    setData(message.data)
                    setIsLoading(false)
                }
            }
            return
        }
        const result = await FetchData({ type, id })
        setData(result)
        setIsLoading(false)
    }, [type, id, token])

    useEffect(() => {
        if (user && (type !== "users" || user.admin)) {
            reloadData()
        }

        return () => {
            if (wsRef.current !== null) {
                wsRef.current.close()
            }
        }
    }, [user, type, reloadData])

    if (!club || !user || (type === "users" && !user.admin)) {
        return null
    }

    const headers = headersMap[type] || []
    const dataKeys = dataKeyMap[type] || []

    const renderCellContent = (key: string, row: any) => {
        switch (key) {
            case "date":
            case "joinedAt":
            case "seenAt":
                return formatDate(row[key])
            case "startTime":
            case "endTime":
            case "time":
            case "timeAdded":
                return formatTime(row[key])
            case "actions":
                return getActions(type, row, reloadData)
            case "volunteering":
            case "admin":
                return row[key] ? "Yes" : "No"
            case "status":
                return getStatus(type, row, row[key])
            case "memberFirstName":
                return row.member ? row.member.firstName : ""
            case "memberLastName":
                return row.member ? row.member.lastName : ""
            case "fieldType":
                return row[key].charAt(0).toUpperCase() + row[key].slice(1)
            case "defaultValue":
                return row[key] || "None"
            default:
                return row[key]
        }
    }

    return (
        <>
            {isLoading ? (
                <Loading table={true} />
            ) : (
                <div className="bg-greyscale-100 outline-1 outline-greyscale-200 rounded-lg outline overflow-clip">
                    <table className="w-[100%] m-0 border-collapse">
                        <thead className="h-[45px]">
                            <tr>
                                {headers.map(header => (
                                    ((header !== 'Volunteering' && header !== 'Volunteered') || club.volunteering === true) && (
                                        <th key={header} className="px-4 py-2 border-b border-gray-200 text-left text-sm font-medium text-gray-700">
                                            {header}
                                        </th>
                                    )
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, rowIndex) => (
                                <tr key={rowIndex} className="hover:bg-gray-100">
                                    {dataKeys.map((key, colIndex) => (
                                        (key !== 'volunteering' || club.volunteering !== false) && (
                                            <td
                                                key={colIndex}
                                                className={
                                                    `hover:cursor-pointer px-4 py-2 border-gray-200 text-sm text-gray-700 ${rowIndex % 2 ? "" : "bg-greyscale-200"}`
                                                }
                                            >
                                                {renderCellContent(key, row)}
                                            </td>
                                        )
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}

export default Table
