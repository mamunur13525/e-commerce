import Head from 'next/head';
import Footer from '../../components/Shared/Footer/Footer';
import Navbar from '../../components/Shared/Navbar/Navbar';
import PageTitleSection from '../../components/Shared/PageTitleSection/PageTitleSection';
import ShopContent from '../../components/Shared/Shop/MainContent/ShopContent';

// API Base URL (can be moved to environment variables)
const API_BASE_URL = 'http://localhost:3000/api/filter-data';

export async function getServerSideProps({ query }) {
    const { cat, search, rate, price } = query;


    // Fetch filtered data
    let result = [];
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ offset: 0, limit: 10, searchFilter: !!search, rate, price, cat, search }),
        });
        result = await response.json();
    } catch (error) {
        console.error('Error fetching filter data:', error);
    }

    return {
        props: {
            data: result,
            queries: query,
        },
    };
}

export default function ShopPage({ data, queries }) {
    return (
        <div>
            <Head>
                <title>E-Commerce</title>
                <meta name="description" content="e-commerce" />
                <link rel="icon" href="https://i.pinimg.com/736x/70/c0/ba/70c0baafea00b9b892d084e7202d0c61.jpg" />
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
                />
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
                />
            </Head>
            <main className="h-full lg:h-screen">
                <Navbar />
                <PageTitleSection
                    img="https://cdn.shopify.com/s/files/1/2179/9295/t/5/assets/breadcrumb_image_5.jpg?v=26308687731726529481500869779"
                    title="Shop"
                />
                <div className="bg-gray-50">
                    <div className="container mx-auto py-20">
                        <ShopContent
                            data={data}
                            queries={queries}
                            title="Why Choose Us"
                            image="https://cdn.shopify.com/s/files/1/2179/9295/t/5/assets/choose_us_image.png?v=170831453923618876001500869385"
                        />
                    </div>
                </div>
                <Footer />
            </main>
        </div>
    );
}
