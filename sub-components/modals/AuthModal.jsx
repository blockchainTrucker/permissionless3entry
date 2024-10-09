import { Form, Modal, Button } from 'react-bootstrap';
import { useMindContext } from '../../context/MindContext';
import { Fragment, useState } from 'react';

const AuthModal = () => {
    const { modal, connectWallet, walletConnected } = useMindContext(); // Use the modal state from the hook
    const [userName, setUserName] = useState('');
    const [rewardOption, setRewardOption] = useState(null); // To track selected option

    return (
        <Fragment>
            <Modal centered show={modal}>
                <Modal.Body>
                    <h2 className="text-center">
                        Welcome to Rewarding Mindset
                    </h2>
                    <p>
                        Complete the registration and connect your wallet to use
                        the app.
                    </p>
                    <Form>
                        {/* User's Name */}
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                id="name"
                                type="text"
                                placeholder="Enter your name"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        {/* Reward Option Selection */}
                        <Form.Group className="mb-3">
                            <Form.Label>Choose your reward currency</Form.Label>
                            <div className="d-flex gap-7">
                                <Form.Check
                                    id="net1"
                                    type="radio"
                                    label="Bitcoin with Rootstock"
                                    name="rewardOption"
                                    value="rootstock"
                                    onChange={(e) =>
                                        setRewardOption(e.target.value)
                                    }
                                    required
                                />
                                <Form.Check
                                    id="net2"
                                    type="radio"
                                    label="XRP on the EVM Sidechain"
                                    name="rewardOption"
                                    value="xrp"
                                    onChange={(e) =>
                                        setRewardOption(e.target.value)
                                    }
                                    required
                                />
                            </div>
                        </Form.Group>

                        {/* Wallet Connection */}
                        <Form.Group className="mb-3">
                            <Button
                                variant={
                                    walletConnected ? 'success' : 'primary'
                                }
                                onClick={() => {
                                    if (
                                        userName !== '' &&
                                        rewardOption !== null
                                    ) {
                                        connectWallet(userName, rewardOption);
                                    } else {
                                        if (userName === '') {
                                            document.getElementById(
                                                'name'
                                            ).className =
                                                'form-control is-invalid';
                                        } else {
                                            document.getElementById(
                                                'name'
                                            ).className = 'form-contol';
                                        }
                                        if (rewardOption === null) {
                                            document
                                                .getElementById('net1')
                                                .classList.add('is-invalid');
                                            document
                                                .getElementById('net2')
                                                .classList.add('is-invalid');
                                        } else {
                                            document
                                                .getElementById('net1')
                                                .classList.remove('is-invalid');
                                            document
                                                .getElementById('net2')
                                                .classList.remove('is-invalid');
                                        }
                                    }
                                }}
                                disabled={walletConnected}>
                                {walletConnected
                                    ? 'Wallet Connected'
                                    : 'Connect Wallet'}
                            </Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </Fragment>
    );
};

export default AuthModal;
