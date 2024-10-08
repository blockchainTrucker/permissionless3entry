import '../styles/theme.scss';
import 'prettier';
import Head from 'next/head';
import DefaultLayout from '../layouts/DefaultLayout';

function RewardingMindset({ Component, pageProps }) {
    // Identify the layout, which will be applied conditionally
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
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}

export default RewardingMindset;
