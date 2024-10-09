import { Fragment, useEffect, useState } from 'react';
import { Row, Image } from 'react-bootstrap';
import Link from 'next/link';
import AuthModal from '../sub-components/modals/AuthModal';
import { useMindContext } from '../context/MindContext';

const Landing = () => {
    const { network, setModal } = useMindContext();

    useEffect(() => {
        if (network === false) {
            setModal(true);
        }
    }, [network]);
    return (
        <Fragment>
            <section>
                <Row>
                    <div className="p-10">
                        <Image
                            fluid
                            src="/images/landing/header.png"
                            className="rounded"
                        />
                    </div>
                </Row>
            </section>
            <section>
                <Row className="d-flex justify-content-center gap-8">
                    <div style={{ width: '305px' }}>
                        <Link href="/virtual-therapist" className="text-center">
                            <Image
                                fluid
                                className="rounded"
                                src="images/landing/ai-therapy.png"
                            />
                            <p className="fs-3 mt-1 text-primary">
                                Virtual Therapist
                            </p>
                        </Link>
                    </div>
                    <div style={{ width: '305px' }}>
                        <Link href="/meditation" className="text-center">
                            <Image
                                fluid
                                className="rounded"
                                src="images/landing/guided-meditations.png"
                            />
                            <p className="fs-3 mt-1 text-primary">Meditation</p>
                        </Link>
                    </div>
                    <div style={{ width: '305px' }}>
                        <Link href="/journaling" className="text-center">
                            <Image
                                fluid
                                className="rounded"
                                src="images/landing/journaling.png"
                            />
                            <p className="fs-3 mt-1 text-primary">Journaling</p>
                        </Link>
                    </div>
                    <div style={{ width: '305px' }}>
                        <Link href="/emdr-therapy" className="text-center">
                            <Image
                                fluid
                                className="rounded"
                                src="images/landing/emdr.png"
                            />
                            <p className="fs-3 mt-1 text-primary">
                                Virtual EMDR Therapy
                            </p>
                        </Link>
                    </div>
                </Row>
            </section>
        </Fragment>
    );
};
export default Landing;
