import { useRouter } from 'next/router';
import React from 'react';
import Footer from '../../components/Shared/Footer/Footer';
import Navbar from '../../components/Shared/Navbar/Navbar';
import PageTitleSection from '../../components/Shared/PageTitleSection/PageTitleSection';
import SingleBlogPost from '../../components/blog/SingleBlogPost';

const SingleBlog = () => {
    const {query:{slug}} = useRouter();
    return (
        <main className='h-full lg:h-screen'>
        <Navbar />
        <PageTitleSection
    img='https://cdn.shopify.com/s/files/1/2179/9295/t/5/assets/breadcrumb_image_5.jpg?v=26308687731726529481500869779'
            title='Blogs'
            customPathname={`Home/blog/${slug}`}
        />
        <section className='bg-gray-50'>
         <SingleBlogPost slug={slug} />
        </section>
        
        <Footer />
    </main>
    );
};

export default SingleBlog;