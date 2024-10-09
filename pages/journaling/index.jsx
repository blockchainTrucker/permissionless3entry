import Link from 'next/link';
import { Fragment } from 'react';
import { Image, Row } from 'react-bootstrap';

const Journaling = () => {
    return (
        <Fragment>
            <section>
                <h1 className="text-center my-10">Journaling</h1>
                <Row className="d-flex justify-content-center text-center gap-5">
                    <div style={{ width: '305px' }}>
                        <p className="fs-3 mt-1 text-primary">
                            Emotional Check-in
                        </p>
                        <Link
                            href="/journaling/emotional-check-in"
                            className="text-center curser-pointer">
                            <Image
                                fluid
                                className="rounded"
                                src="images/journaling/1.png"
                            />
                        </Link>
                    </div>
                    <div style={{ width: '305px' }}>
                        <p className="fs-3 mt-1 ms-n2 text-primary text-nowrap">
                            Personal Growth and Reflection
                        </p>
                        <Link
                            className="text-center"
                            href="/journaling/growth-and-relection">
                            <Image
                                fluid
                                className="rounded"
                                src="images/journaling/2.png"
                            />
                        </Link>
                    </div>
                    <div style={{ width: '305px' }}>
                        <p className="fs-3 mt-1 text-primary">
                            Gratitude and Positivity
                        </p>
                        <Link
                            className="text-center"
                            href="/journaling/gratitude-positivity">
                            <Image
                                fluid
                                className="rounded"
                                src="images/journaling/3.png"
                            />
                        </Link>
                    </div>
                </Row>
            </section>
        </Fragment>
    );
};

export default Journaling;
