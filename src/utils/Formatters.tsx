export const formatDate = (timestamp: string) => {
    if (!timestamp) return "N/A";
    const date = new Date(parseInt(timestamp) * 1000);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const formatTime = (timestamp: string) => {
    if (!timestamp) return "N/A";
    const date = new Date(parseInt(timestamp) * 1000);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
};