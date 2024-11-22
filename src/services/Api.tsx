const getBaseUrl = () => {
    let url;
    switch (process.env.ENV) {
        case 'development':
            url = 'http://localhost:3001';
            break;
        case 'production':
        default:
            url = 'https://api.clubattendance.com';
    }

    return url;
}

export default getBaseUrl;