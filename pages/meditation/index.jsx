import axios from 'axios';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { Image, Modal, Row } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useMindContext } from '../../context/MindContext';

const Meditations = () => {
    const router = useRouter();
    const { address, network, setRewardType, setRewardModal, fetchBalance } =
        useMindContext();
    const [videoModal, setVideoModal] = useState(false); // Control modal visibility
    const [video, setVideo] = useState(''); // Store the video source
    const [videoEnded, setVideoEnded] = useState(false); // Track if video has ended

    const handleModalClose = () => {
        setVideoModal(false);
        setVideo(''); // Reset the video when the modal closes
        setVideoEnded(false); // Reset video ended state
    };

    const handleVideoEnded = async () => {
        console.log('Video has ended!');
        setVideoEnded(true); // Set the state to indicate video has ended
        await axios
            .post('/api/completeMeditation', { address, network })
            .then((res) => {
                console.log(res.data);
                if (res.data.result) {
                    if (res.data.message.includes('Minted')) {
                        setRewardType('meditation');
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
            <section>
                <h1 className="text-center my-10">Guided Meditations</h1>
                <Row className="d-flex justify-content-center text-center gap-5">
                    {/* Work/Life Balance */}
                    <div style={{ width: '305px' }}>
                        <p className="fs-3 mt-1 text-primary">
                            Work/Life Balance
                        </p>
                        <Link
                            href="#"
                            className="text-center cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                setVideo('videos/wlb.mp4'); // Set video source
                                setVideoModal(true); // Open the modal
                            }}>
                            <Image
                                fluid
                                className="rounded"
                                src="images/meditation/1.png"
                            />
                        </Link>
                    </div>

                    {/* Motivation */}
                    <div style={{ width: '305px' }}>
                        <p className="fs-3 mt-1 ms-n2 text-primary text-nowrap">
                            Motivation
                        </p>
                        <Link
                            href="#"
                            className="text-center"
                            onClick={(e) => {
                                e.preventDefault();
                                setVideo('videos/motivation.mp4');
                                setVideoModal(true);
                            }}>
                            <Image
                                fluid
                                className="rounded"
                                src="images/meditation/2.png"
                            />
                        </Link>
                    </div>

                    {/* Managing Stress */}
                    <div style={{ width: '305px' }}>
                        <p className="fs-3 mt-1 text-primary">
                            Managing Stress
                        </p>
                        <Link
                            href="#"
                            className="text-center"
                            onClick={(e) => {
                                e.preventDefault();
                                setVideo('videos/stress.mp4');
                                setVideoModal(true);
                            }}>
                            <Image
                                fluid
                                className="rounded"
                                src="images/meditation/3.png"
                            />
                        </Link>
                    </div>
                </Row>
            </section>

            {/* Modal to show the video */}
            <Modal show={videoModal} onHide={handleModalClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Guided Meditation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Video element for playing the video */}
                    {video && (
                        <video
                            width="100%"
                            controls
                            autoPlay
                            onEnded={handleVideoEnded}>
                            <source src={video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}
                    {videoEnded && <p>The video has finished playing.</p>}
                </Modal.Body>
            </Modal>
        </Fragment>
    );
};

export default Meditations;
