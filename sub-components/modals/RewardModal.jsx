import { Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import { useMindContext } from '../../context/MindContext';
const RewardModal = () => {
    const { rewardModal, rewardType, network, setRewardModal } =
        useMindContext();
    return (
        <Fragment>
            <Modal
                centered
                show={rewardModal}
                size="lg"
                className="text-center">
                <Modal.Header closeButton onHide={() => setRewardModal(false)}>
                    <h2>Reward Confirmation</h2>
                </Modal.Header>
                <Modal.Body>
                    {rewardType === 'therapy' && (
                        <section>
                            <p className="fs-3">
                                Congratulations for taking the step to speak
                                about how you feel. You have been rewarded with
                                3 {network === 'xrp' ? 'xMIND' : 'rMIND'}{' '}
                                tokens. They should already be in your wallet.
                                Keep up the good work!
                            </p>
                        </section>
                    )}
                    {rewardType === 'journaling' && (
                        <section>
                            <p className="fs-3">
                                Congratulations for taking the step to write
                                about how you feel. You have been rewarded with
                                3 {network === 'xrp' ? 'xMIND' : 'rMIND'}{' '}
                                tokens. They should already be in your wallet.
                                Keep up the good work!
                            </p>
                        </section>
                    )}
                    {rewardType === 'meditation' && (
                        <section>
                            <p className="fs-3">
                                Congratulations for taking the step to meditate
                                and reflect. You have been rewarded with 3{' '}
                                {network === 'xrp' ? 'xMIND' : 'rMIND'} tokens.
                                They should already be in your wallet. Keep up
                                the good work!
                            </p>
                        </section>
                    )}
                    {rewardType === 'emdr' && (
                        <section>
                            <p className="fs-3 fw-bold">
                                You have successfully completed your EMDR
                                Therapy Session.
                            </p>
                            <p className="fs-3">
                                Using the Virtual EMDR Program regularly will
                                change the way your brain responds to your
                                targets.
                            </p>
                            <p className="fs-3">
                                For the best possible results, consider working
                                through multiple EMDR sessions to successfully
                                process any past memories related to your
                                Targets.
                            </p>
                            <p className="fs-3 fw-bold">
                                You can use Virtual EMDR anywhere or anytime you
                                need it.
                            </p>
                        </section>
                    )}
                </Modal.Body>
            </Modal>
        </Fragment>
    );
};
export default RewardModal;
