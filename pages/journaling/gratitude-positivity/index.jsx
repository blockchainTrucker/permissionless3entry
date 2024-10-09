import Link from 'next/link';
import { Fragment } from 'react';
import { useMindContext } from '../../../context/MindContext';

const GP = () => {
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
                                    'What are three things I am grateful for today, and why?'
                                )
                            }>
                            What are three things I am grateful for today, and
                            why?
                        </Link>
                    </p>
                    <p>
                        <Link
                            href="/journaling/prompt"
                            onClick={() =>
                                setPrompt(
                                    'Who has had a positive influence on my life lately? How can I show my appreciation?'
                                )
                            }>
                            Who has had a positive influence on my life lately?
                            How can I show my appreciation?
                        </Link>
                    </p>
                    <p>
                        <Link
                            href="/journaling/prompt"
                            onClick={() =>
                                setPrompt(
                                    'What is one small victory I’ve had today, and how does it make me feel?'
                                )
                            }>
                            What is one small victory I’ve had today, and how
                            does it make me feel?
                        </Link>
                    </p>
                    <p>
                        <Link
                            href="/journaling/prompt"
                            onClick={() =>
                                setPrompt(
                                    'What is something that made me smile recently, and how can I carry that feeling forward?'
                                )
                            }>
                            What is something that made me smile recently, and
                            how can I carry that feeling forward?
                        </Link>
                    </p>
                    <p>
                        <Link
                            href="/journaling/prompt"
                            onClick={() =>
                                setPrompt(
                                    'How can I bring more joy into my daily life?'
                                )
                            }>
                            How can I bring more joy into my daily life?
                        </Link>
                    </p>
                </div>
            </div>
        </Fragment>
    );
};
export default GP;
