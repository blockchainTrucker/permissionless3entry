import { Fragment, useEffect } from 'react';
import NavbarDefault from '../layouts/navbars/NavbarDefault';
import Footer from '../layouts/footers/Footer';

const DefaultLayout = (props) => {
    useEffect(() => {
        document.body.style = 'background-color: #f5f2ec;';
    }, []);
    return (
        <Fragment>
            <NavbarDefault />
            <main style={{ minHeight: '100vh' }}>{props.children}</main>
            <Footer />
        </Fragment>
    );
};

export default DefaultLayout;
