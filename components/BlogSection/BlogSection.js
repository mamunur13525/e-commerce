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
                    <Button classAdd='text-green-600 border border-[#80b435]  bg-white hover:bg-[#80b435] hover:text-white text-xl font-light py-2 w-[10rem] '>
                        See All
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BlogSection;