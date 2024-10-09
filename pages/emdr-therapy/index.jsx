import { Fragment, useState } from 'react';
import { Button, Col, Form, Image, Modal, Row } from 'react-bootstrap';
import { useMindContext } from '../../context/MindContext';
import { useRouter } from 'next/router';
import axios from 'axios';

const EMDR = () => {
    const router = useRouter();
    const {
        address,
        network,
        setRewardType,
        setRewardModal,
        fetchBalance,
        name,
    } = useMindContext();
    const [show, setShow] = useState(false);
    const [part, setPart] = useState(0);

    const handleVideoEnded = async () => {
        console.log('Video has ended!');
        await axios
            .post('/api/completeMeditation', { address, network })
            .then((res) => {
                console.log(res.data);
                if (res.data.result) {
                    if (res.data.message.includes('Minted')) {
                        setRewardType('emdr');
                        setRewardModal(true);
                        fetchBalance();
                        router.push('/');
                    } else {
                        router.push('/');
                        fetchBalance();
                    }
                } else {
                    router.push('/');
                    fetchBalance();
                }
            });
    };

    return (
        <Fragment>
            <h1 className="mt-10 text-center">Virtual EMDR</h1>
            <p className="fs-4 text-lead text-center">Choose you treatment:</p>
            <Row className="my-10 d-flex justify-content-center px-20 gap-7">
                <Col>
                    <Image
                        fluid
                        src="images/icons/1.png"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setShow(true)}
                    />
                </Col>
                <Col>
                    <Image
                        fluid
                        src="images/icons/2.png"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setShow(true)}
                    />
                </Col>
            </Row>
            <Row className="d-flex justify-content-center px-20 gap-7">
                <Col>
                    <Image
                        fluid
                        src="images/icons/3.png"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setShow(true)}
                    />
                </Col>
                <Col>
                    <Image
                        fluid
                        src="images/icons/4.png"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setShow(true)}
                    />
                </Col>
            </Row>
            <Modal centered show={show} size="xl">
                <Modal.Body>
                    {part === 0 && (
                        <section>
                            <h2 className="text-center mb-5">Preperation</h2>
                            <Form>
                                <Col>
                                    <Form.Label>
                                        How are you feeling today?
                                    </Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control
                                        className="mb-5"
                                        as="textarea"
                                    />
                                </Col>
                                <Row className="d-flex gap-5">
                                    <Col>
                                        <Form.Label>
                                            What issues are you experiencing?
                                        </Form.Label>
                                    </Col>
                                </Row>
                                <Row className="d-flex gap-5">
                                    <Col>
                                        <Form.Check label="Intrusive and negative thoughts" />
                                    </Col>
                                    <Col>
                                        <Form.Check label="Feelings of anxiety and fear" />
                                    </Col>{' '}
                                </Row>
                                <Row className="d-flex gap-5">
                                    <Col>
                                        <Form.Check label="Trauma and PSD flashbacks" />
                                    </Col>
                                    <Col>
                                        <Form.Check label="Feeling triggered" />
                                    </Col>{' '}
                                </Row>
                                <Row className="d-flex gap-5">
                                    <Col>
                                        <Form.Check label="Feeling depressed, sad, or hopeless" />
                                    </Col>
                                    <Col>
                                        <Form.Check label="Feelings of shame or self blame" />
                                    </Col>{' '}
                                </Row>
                                <Row className="d-flex gap-5">
                                    <Col>
                                        <Form.Check label="Fear of a future event" />
                                    </Col>
                                    <Col>
                                        <Form.Check label="Difficulty sleeping" />
                                    </Col>{' '}
                                </Row>
                                <Row className="d-flex gap-5">
                                    <Col>
                                        <Form.Check label="Emotional pain and upset" />
                                    </Col>
                                    <Col>
                                        <Form.Check label="Unmotivated" />
                                    </Col>
                                </Row>
                                <Button
                                    className="mt-5 px-7"
                                    onClick={() => {
                                        console.log(true);
                                        setPart(1);
                                    }}>
                                    Next
                                </Button>
                            </Form>
                        </section>
                    )}{' '}
                    {part === 1 && (
                        <section>
                            <h2 className="text-center mb-5">Preperation</h2>
                            <Form>
                                <Form.Label>
                                    What situation or experience led you to seek
                                    help?
                                </Form.Label>
                                <Form.Control className="mb-5" as="textarea" />
                                <Form.Label>
                                    What aspect of that experience is the most
                                    difficult for you?
                                </Form.Label>
                                <Form.Control className="mb-5" as="textarea" />
                                <Form.Label>
                                    What feeling or emotions arise when you
                                    reflect on this experience?{' '}
                                </Form.Label>
                                <Form.Control className="mb-5" as="textarea" />

                                <Button
                                    className="mt-5 px-7"
                                    onClick={() => setPart(2)}>
                                    Next
                                </Button>
                            </Form>
                        </section>
                    )}
                    {part === 2 && (
                        <section>
                            <h2 className="text-center mb-5">Hi, {name}!</h2>
                            <Form>
                                <p>
                                    While using the EMDR Tool, recall your
                                    Target and hold these in your mind while
                                    following the moving object with your eyes.
                                    Use the Eye Movement Tool as many times as
                                    necessary, starting slowly. Experienced
                                    users may use it for longer periods as
                                    desired.
                                </p>
                                <Button
                                    className="mt-5 px-7"
                                    onClick={() => setPart(3)}>
                                    Begin Session
                                </Button>
                            </Form>
                        </section>
                    )}
                    {part === 3 && (
                        <section>
                            <video
                                width="100%"
                                controls
                                autoPlay
                                onEnded={handleVideoEnded}>
                                <source
                                    src={'videos/emdr.mp4'}
                                    type="video/mp4"
                                />
                                Your browser does not support the video tag.
                            </video>
                        </section>
                    )}
                </Modal.Body>
            </Modal>
        </Fragment>
    );
};
export default EMDR;
