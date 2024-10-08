// import node module libraries
import { Fragment, useState } from 'react';
import Link from 'next/link';
import { Row, Col, Image } from 'react-bootstrap';

const Footer = () => {
    const [year] = useState(new Date().getFullYear());

    return (
        <Fragment>
            <div className="pt-lg-10 pt-5 footer bg-none">
                <Row className="justify-content-center pb-lg-10 mx-lg-10">
                    <Col className="text-center">
                        <div className="mt-4 mb-0 text-primary">
                            <p>
                                Decentralized Ventures{' '}
                                {`© ${year}. All Rights Reserved.`}
                            </p>
                        </div>
                    </Col>
                </Row>
            </div>
        </Fragment>
    );
};

export default Footer;
