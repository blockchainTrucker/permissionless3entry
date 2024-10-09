import axios from 'axios';
import Link from 'next/link';
import { Fragment, useState, useEffect, useRef } from 'react';
import { Card, Form, Image } from 'react-bootstrap';
import { ReactTyped } from 'react-typed';
import { useMindContext } from '../../context/MindContext';
import { useRouter } from 'next/router';
const VirtualTherapist = () => {
    const router = useRouter();
    const { network, address, setRewardModal, setRewardType, fetchBalance } =
        useMindContext();
    const [message, setMessage] = useState(''); // For the current message being typed
    const [messages, setMessages] = useState([]); // Array to store all the messages
    const messagesContainerRef = useRef(null); // Ref to track the messages container

    // Scroll to the bottom of the messages container
    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight;
        }
    };

    // Scroll to bottom whenever messages array is updated
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const submitHandler = async (e) => {
        e.preventDefault(); // Prevent form from refreshing the page
        if (message.trim()) {
            const options = {
                year: 'numeric',
                month: 'short', // "MMM"
                day: '2-digit', // "DD"
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false, // Use 24-hour format
                timeZoneName: 'short', // Add time zone abbreviation
            };
            const formattedDate = new Intl.DateTimeFormat(
                'en-US',
                options
            ).format(new Date());

            // Add the user's message to the messages array
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    from: 'User',
                    message,
                    time: formattedDate,
                },
            ]);
            setMessage(''); // Clear the input field

            let first = null;
            if (messages.length < 2) {
                first = true;
            }

            try {
                const res = await axios.post('/api/therapyMessage', {
                    first,
                    message,
                });
                const therapistMessage = res.data.completion;

                // Add the therapist's message to the messages array
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        from: 'Virtual Therapist',
                        message: therapistMessage,
                        time: formattedDate,
                    },
                ]);
            } catch (err) {
                console.error(err);
                // Handle any error (e.g., show an error message)
            }
        }
    };

    const endSession = async () => {
        await axios
            .post('/api/endSession', { messages, network, address })
            .then((res) => {
                console.log(res.data);
                if (res.data.result) {
                    if (res.data.message.includes('Minted')) {
                        setRewardType('therapy');
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
                <Card
                    style={{
                        height: '80vh', // Set height for the card
                        width: '95vw',
                        maxWidth: '1000px',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                    className="mx-auto mt-5">
                    <Card.Header className="d-flex justify-content-between">
                        <span className="display-7">Virtual Therapist</span>
                        <Link
                            href=""
                            onClick={endSession}
                            className="btn-link text-decoration-none">
                            End Session
                        </Link>
                    </Card.Header>
                    <div
                        ref={messagesContainerRef} // Attach ref to the div
                        style={{
                            flex: '1 1 auto', // Let the body grow and fill available space
                            overflowY: 'auto', // Enable scrolling in body when content overflows
                            padding: '20px',
                        }}>
                        {/* Map over messages and display them */}
                        {messages.map((msg, index) => (
                            <div key={index} className="mb-3">
                                {msg.from === 'User' ? (
                                    <strong>{`You said on ${msg.time}: `}</strong>
                                ) : (
                                    <strong>{`Virtual Therapist said on ${msg.time}: `}</strong>
                                )}
                                {index === messages.length - 1 ? (
                                    <p>
                                        <ReactTyped
                                            strings={[msg.message]}
                                            typeSpeed={5}
                                            showCursor={false}
                                        />
                                    </p>
                                ) : (
                                    <p>{msg.message}</p>
                                )}
                            </div>
                        ))}
                    </div>
                    <Card.Footer
                        style={{
                            height: '100px', // Fixed height for footer
                            flexShrink: '0', // Prevent footer from shrinking
                            padding: '10px',
                        }}>
                        <Form
                            onSubmit={submitHandler}
                            style={{ position: 'relative' }}>
                            <Form.Control
                                value={message} // Controlled input bound to state
                                onChange={(e) => setMessage(e.target.value)}
                                style={{ resize: 'none', paddingRight: '80px' }}
                                as="textarea"
                                rows={2} // Limit the number of rows to fit
                                className="bg-gray-200"
                                placeholder="Type your message..."
                            />
                            <div
                                onClick={submitHandler}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    bottom: '15px',
                                    cursor: 'pointer',
                                }}>
                                <Image
                                    height={35}
                                    src="images/icons/snd-btn.png"
                                />
                            </div>
                        </Form>
                    </Card.Footer>
                </Card>
            </section>
        </Fragment>
    );
};

export default VirtualTherapist;
