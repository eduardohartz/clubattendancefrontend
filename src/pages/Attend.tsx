import { Helmet, HelmetProvider } from 'react-helmet-async';

function Attend() {

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Attend Meeting | Club Attendance</title>
                </Helmet>
            </HelmetProvider>
        </>
    );
}

export default Attend;