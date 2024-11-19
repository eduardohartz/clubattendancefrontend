import { useState, useEffect } from 'react';
import { headersMap, dataKeyMap, getActions, getStatus } from '../utils/TableHelpers';
import FetchData from '../services/FetchData';
import { formatDate, formatTime } from '../utils/Formatters';

function Table({ type, id = "", user, reload }: { type: 'meetings' | 'members' | 'attendees' | 'attendance' | 'users' | 'clubs', id?: string, user: any, reload?: number }) {
    const [data, setData] = useState([]);

    const reloadData = async () => {
        const result = await FetchData({ type, id });
        setData(result);
    };

    useEffect(() => {
        if (user && (type !== "users" || user.admin)) {
            reloadData();
        }
    }, [user, type, id]);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const reloadDataWithTimeout = async () => {
            await reloadData();
            if (reload) {
                timeoutId = setTimeout(reloadDataWithTimeout, reload);
            }
        };

        if (reload) {
            reloadDataWithTimeout();
        }

        return () => clearTimeout(timeoutId);
    }, [reload]);

    if (!user || (type === "users" && !user.admin)) {
        return null;
    }

    const headers = headersMap[type] || [];
    const dataKeys = dataKeyMap[type] || [];

    const renderCellContent = (key: string, row: any) => {
        switch (key) {
            case "date":
            case "joinedAt":
            case "seenAt":
                return formatDate(row[key]);
            case "startTime":
            case "endTime":
            case "timeAttended":
            case "timeAdded":
                return formatTime(row[key]);
            case "actions":
                return getActions(type, row, reloadData);
            case "volunteering":
            case "admin":
                return row[key] ? "Yes" : "No";
            case "status":
                return getStatus(type, row, row[key]);
            default:
                return row[key];
        }
    };

    return (
        <div className="bg-greyscale-100 outline-1 outline-greyscale-200 rounded-lg outline overflow-clip">
            <table className="w-[100%] m-0 border-collapse">
                <thead className="h-[45px]">
                    <tr>
                        {headers.map((header) => (
                            <th key={header} className="px-4 py-2 border-b border-gray-200 text-left text-sm font-medium text-gray-700">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-100">
                            {dataKeys.map((key, colIndex) => (
                                <td
                                    key={colIndex}
                                    className={
                                        "hover:cursor-pointer px-4 py-2 border-gray-200 text-sm text-gray-700 " +
                                        (rowIndex % 2 ? "" : "bg-greyscale-200")
                                    }
                                >
                                    {renderCellContent(key, row)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;