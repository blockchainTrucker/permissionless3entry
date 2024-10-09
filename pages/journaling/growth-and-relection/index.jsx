import Link from 'next/link';
import { Fragment } from 'react';
import { useMindContext } from '../../../context/MindContext';

const GR = () => {
    const { setPrompt } = useMindContext();

    return (
        <Fragment>
            <div>
                <div style={{ maxWidth: '800px' }} className="mx-auto">
                    <h1 className="text-center my-10">
                        Choose a Journal Prompt
                    </h1>
                    <p>
                        <Link
                            href="/journaling/prompt"
                            onClick={() =>
                                setPrompt(
                                    'What is one lesson I’ve learned recently, and how has it impacted my perspective?'
                                )
                            }>
                            What is one lesson I’ve learned recently, and how
                            has it impacted my perspective?
                        </Link>
                    </p>
                    <p>
                        <Link
                            href="/journaling/prompt"
                            onClick={() =>
                                setPrompt(
                                    'What personal strengths did I use today? How did they help me?'
                                )
                            }>
                            What personal strengths did I use today? How did
                            they help me?
                        </Link>
                    </p>
                    <p>
                        <Link
                            href="/journaling/prompt"
                            onClick={() =>
                                setPrompt(
                                    'What is one thing I can let go of to grow into the person I want to be?'
                                )
                            }>
                            What is one thing I can let go of to grow into the
                            person I want to be?
                        </Link>
                    </p>
                    <p>
                        <Link
                            href="/journaling/prompt"
                            onClick={() =>
                                setPrompt(
                                    'What is one habit I want to develop, and why?'
                                )
                            }>
                            What is one habit I want to develop, and why?
                        </Link>
                    </p>
                    <p>
                        <Link
                            href="/journaling/prompt"
                            onClick={() =>
                                setPrompt(
                                    'How have I changed over the past year? What am I proud of?'
                                )
                            }>
                            How have I changed over the past year? What am I
                            proud of?
                        </Link>
                    </p>
                </div>
            </div>
        </Fragment>
    );
};
export default GR;
