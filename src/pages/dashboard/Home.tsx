import { Helmet, HelmetProvider } from 'react-helmet-async';

function Home() {

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Dashboard | Club Attendance</title>
                </Helmet>
            </HelmetProvider>
        </>
    );
}

export default Home;