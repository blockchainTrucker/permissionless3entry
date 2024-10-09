import { Fragment, useState } from 'react';
import { useMindContext } from '../../../context/MindContext';
import { Button, Form } from 'react-bootstrap';
import validator from 'validator';
import axios from 'axios';
import { useRouter } from 'next/router';

const Prompt = () => {
    const router = useRouter();
    const {
        prompt,
        address,
        network,
        setRewardType,
        setRewardModal,
        fetchBalance,
    } = useMindContext();
    const [entry, setEntry] = useState(null);

    const complete = async (e) => {
        e.preventDefault();
        if (validator.isLength(entry, { min: 20 })) {
            await axios
                .post('/api/completeEntry', { entry, address, network })
                .then((res) => {
                    console.log(res.data);
                    if (res.data.result) {
                        if (res.data.message.includes('Minted')) {
                            setRewardType('journaling');
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
        }
    };

    return (
        <Fragment>
            <h1 className="my-10 display-6 text-center px-20">{prompt}</h1>
            <Form onSubmit={complete} className="px-20">
                <Form.Control
                    rows={15}
                    as="textarea"
                    onChange={(e) => setEntry(e.target.value)}
                />
                <Button type="submit" className="mt-5">
                    Click Here When Finished
                </Button>
            </Form>
        </Fragment>
    );
};
export default Prompt;
