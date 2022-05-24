import React from 'react';
import SectionTitle from '../../Shared/SectionTitle/SectionTitle';
import { IoLogoTwitter } from 'react-icons/io5';
import { IoLogoGoogleplus } from 'react-icons/io';
import { TiSocialFacebook } from 'react-icons/ti';
import { TiSocialSkype } from 'react-icons/ti';

const Farmer = () => {
    const farmers = [
        {
            id: 0,
            name: 'MICHAEL ANDREWS',
            image: 'https://cdn.shopify.com/s/files/1/2179/9295/t/5/assets/our_team_image1.png?v=69435359265580305841500869387',
            description: 'Richard McClintock, a Latin professor at words, consectetur, from a Lorem Ipsum passage, and literature, discovered the',
            socials_link: [
                {
                    id: 0,
                    icon: <TiSocialFacebook />,
                    link: 'https://www.facebook.com/'
                },
                {
                    id: 2,
                    icon: <IoLogoTwitter />,
                    link: 'https://twitter.com/'
                },
                {
                    id: 3,
                    icon: <TiSocialSkype />,
                    link: 'https://www.google.com/'
                },
                {
                    id: 4,
                    icon: <IoLogoGoogleplus />,
                    link: 'https://www.skype.com/en/'
                },
            ]
        },
        {
            id: 1,
            name: 'Alisha Khan',
            image: 'https://cdn.shopify.com/s/files/1/2179/9295/t/5/assets/our_team_image2.png?v=123381587054227630691500869387',
            description: 'Richard McClintock, a Latin professor at words, consectetur, from a Lorem Ipsum passage, and literature, discovered the',
            socials_link: [
                {
                    id: 0,
                    icon: <TiSocialFacebook />,
                    link: 'https://www.facebook.com/'
                },
                {
                    id: 2,
                    icon: <IoLogoTwitter />,
                    link: 'https://twitter.com/'
                },
                {
                    id: 3,
                    icon: <TiSocialSkype />,
                    link: 'https://www.google.com/'
                },
                {
                    id: 4,
                    icon: <IoLogoGoogleplus />,
                    link: 'https://www.skype.com/en/'
                },
            ]
        },
        {
            id: 2,
            name: 'John  Doe',
            image: 'https://cdn.shopify.com/s/files/1/2179/9295/t/5/assets/our_team_image3.png?v=41376404346784476121500869387',
            description: 'Richard McClintock, a Latin professor at words, consectetur, from a Lorem Ipsum passage, and literature, discovered the',
            socials_link: [
                {
                    id: 0,
                    icon: <TiSocialFacebook />,
                    link: 'https://www.facebook.com/'
                },
                {
                    id: 2,
                    icon: <IoLogoTwitter />,
                    link: 'https://twitter.com/'
                },
                {
                    id: 3,
                    icon: <TiSocialSkype />,
                    link: 'https://www.google.com/'
                },
                {
                    id: 4,
                    icon: <IoLogoGoogleplus />,
                    link: 'https://www.skype.com/en/'
                },
            ]
        }
    ]
    return (
        <div className='container mx-auto  py-20'>
            <SectionTitle
                title='FRESH FOOD’S FARMERS'
                subtitle='We Are Family'
            />
            <div className='flex justify-center lg:justify-between flex-wrap px-10 lg:px-0'>

                {
                    farmers.map(farmer => (
                        <div className='w-full sm:w-1/2 lg:w-1/3 my-3' key={farmer.id}>
                            <div className='flex justify-center'>
                                <img className='rounded-full hover:drop-shadow-2xl transition-all duration-300' src={farmer.image} alt="" />
                            </div>
                            <div className='text-center mt-5'>
                                <h1 className='text-3xl font-medium '>
                                    {farmer.name}
                                </h1>
                                <hr className='my-5 w-2/4 mx-auto' />
                                <p className='text-[#666] lg:px-2'>
                                    {
                                        farmer.description
                                    }
                                </p>
                                <div className='mt-5'>
                                    <ul className='list-none flex justify-center gap-3 '>
                                        {
                                            farmer.socials_link.map(social => (
                                                <li className='text-xl' key={social.id}>
                                                    <a rel="noreferrer" className='hover:text-[#80b435]' target='_blank' href={social.link}>
                                                        {social.icon}
                                                    </a>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    );
};

export default Farmer;