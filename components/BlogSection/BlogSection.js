import React from 'react';
import Blogs from '../Shared/Blogs/Blogs';
import Button from '../Shared/Button';

const BlogSection = ({ classAdd = '' }) => {
    return (
        <div className={`container mb-48 mx-auto bg-white py-20 ${classAdd}`}>
            <div className='container mx-auto'>
                <h1 className='text-4xl text-center'>Lastest From Blog</h1>
                <div className='px-8'>
                    <Blogs />
                </div>
                <div className='flex justify-center mt-16'>
                    <Button withBck={false} classAdd='max-w-fit px-20 uppercase'>
                        See All
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BlogSection;