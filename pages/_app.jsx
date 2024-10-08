import '../styles/theme.scss';
import 'prettier';
import Head from 'next/head';
import DefaultLayout from '../layouts/DefaultLayout';
import { MindProvider } from '../context/MindContext';

function RewardingMindset({ Component, pageProps }) {
    const MIND_TOKEN_CONTRACT_ADDRESS =
        '0xfe1efa33372089f2741ae4b5a30c2428adc78823';
    const Layout = DefaultLayout;
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                    title="Rewarding Mindset"
                />
                <base href="/" />
            </Head>
            <MindProvider contractAddress={MIND_TOKEN_CONTRACT_ADDRESS}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </MindProvider>
        </>
    );
}

export default RewardingMindset;
