import Head from 'next/head'
import Navbar from '../../components/Shared/Navbar/Navbar'
import Footer from '../../components/Shared/Footer/Footer'
import { AiOutlinePlus } from 'react-icons/ai'
import { useState } from 'react'

export default function Home() {

    return (
        <div>
            <Head>
                <title>E-Commerce</title>
                <meta name="description" content="e-commerce" />
                <link rel="icon" href="https://i.pinimg.com/736x/70/c0/ba/70c0baafea00b9b892d084e7202d0c61.jpg" />
            </Head>
            <main className='h-full lg:h-screen'>
                <Navbar />
                <section className='flex  justify-center py-20'>
                    <div className='flex w-10/12'>
                        <div>
                            <DetailAccordion />
                        </div>
                    </div>

                </section>
                <Footer />
            </main>
        </div>
    )
}








const DetailAccordion = () => {
    const [showAccordion, setShowAccordion] = useState(null)
    let data = [
        {
            id: 0,
            title: 'How to Install Theme',
            description: 'Yes, absolutely. You can accept mailed cheques or money orders, direct bank transfers, or perhaps have an option to pay for an order in-store. Just give your manual payment method a name and an optional set of instructions for your customers, and they can select it like any other payment option.'
        },
        {
            id: 1,
            title: 'How  can i  Install  new  version',
            description: 'Yes, absolutely. You can accept mailed cheques or money orders, direct bank transfers, or perhaps have an option to pay for an order in-store. Just give your manual payment method a name and an optional set of instructions for your customers, and they can select it like any other payment option.'
        },
        {
            id: 2,
            title: 'Review',
            description: 'Yes, absolutely. You can accept mailed cheques or money orders, direct bank transfers, or perhaps have an option to pay for an order in-store. Just give your manual payment method a name and an optional set of instructions for your customers, and they can select it like any other payment option.'
        }
    ]

    return (
        <div>
            {
                Array.isArray(data) &&
                data.map(item => (
                    <div
                        key={item.id}
                        className='flex flex-col justify-center  px-2 py-5'
                        onClick={() => { showAccordion === item.id ? setShowAccordion(null) : setShowAccordion(item.id) }}
                    >
                        <div className='flex justify-between items-center cursor-pointer border-b'>
                            <p className={`${showAccordion === item.id ? 'text-[#80b435]' : ''} py-3 font-semibold duration-200`}>{item.title}</p>
                            <AiOutlinePlus className={`text-2xl ${showAccordion === item.id ? 'rotate-[135deg]' : ''} transition-transform duration-200`} />
                        </div>
                        <p className={`${showAccordion === item.id ? 'h-[5rem] mt-5' : 'h-0'}  transition-all   overflow-hidden duration-200`}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque delectus totam eligendi eos necessitatibus? Harum, vitae? Cumque velit illo similique.</p>
                    </div>
                ))
            }
        </div>
    )
}


