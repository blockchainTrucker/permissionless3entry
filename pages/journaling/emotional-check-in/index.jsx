import Link from 'next/link';
import { Fragment } from 'react';
import { useMindContext } from '../../../context/MindContext';

const ECI = () => {
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
                                    'How am I feeling today, and what contributed to this emotion?'
                                )
                            }>
                            How am I feeling today, and what contributed to this
                            emotion?
                        </Link>
                    </p>
                    <p>
                        <Link
                            href="/journaling/prompt"
                            onClick={() =>
                                setPrompt(
                                    'What are my most frequent emotions lately, and what might be causing them?'
                                )
                            }>
                            What are my most frequent emotions lately, and what
                            might be causing them?
                        </Link>
                    </p>
                    <p>
                        <Link
                            href="/journaling/prompt"
                            onClick={() =>
                                setPrompt(
                                    'Is there a specific event or situation weighing on me today? How did I handle it, and how could I have handled it differently?'
                                )
                            }>
                            Is there a specific event or situation weighing on
                            me today? How did I handle it, and how could I have
                            handled it differently?
                        </Link>
                    </p>
                    <p>
                        <Link
                            href="/journaling/prompt"
                            onClick={() =>
                                setPrompt(
                                    'Are there any unresolved feelings I’ve been avoiding? How can I begin to address them?'
                                )
                            }>
                            Are there any unresolved feelings I’ve been
                            avoiding? How can I begin to address them?
                        </Link>
                    </p>
                    <p>
                        <Link
                            href="/journaling/prompt"
                            onClick={() =>
                                setPrompt(
                                    'What is one thing I can do today to improve my emotional well-being?'
                                )
                            }>
                            What is one thing I can do today to improve my
                            emotional well-being?
                        </Link>
                    </p>
                </div>
            </div>
        </Fragment>
    );
};
export default ECI;
