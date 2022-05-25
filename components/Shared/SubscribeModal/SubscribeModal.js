import React, { useEffect, useState } from 'react';
import Modal from 'react-responsive-modal'
import Button from '../Button';

const SubscribeModal = () => {
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setOpenModal(true)
        }, 2500)
    }, [])
    return (
        <Modal classNames={{
            overlay: 'customOverlay',
            modal: 'w-[75%] md:w-[700px] h-[450px] transition-all duration-1000 p-[0px!important]',
        }}
            open={openModal}
            onClose={() => setOpenModal(false)}
            closeOnOverlayClick={false}
            center
        >
            <div className={`w-full h-full flex justify-center items-center bg-[url('https://cdn.shopify.com/s/files/1/2179/9295/t/5/assets/popup_image.jpg?v=179054658127472218721501063172')]`}>
                <div className='text-center'>
                    <div className='mb-8 flex justify-center'>
                        <img src="https://cdn.shopify.com/s/files/1/2179/9295/t/5/assets/icon_popup.png?v=53464895439087604121501063172" alt="logo_image" />
                    </div>
                    <p className='text-[#717171] text-[16px] font-normal mb-8'>
                        Pellentesque de fermentum mollis comodous an loremous
                    </p>
                    <div className='w-full'>
                        <input className='w-[80%] bg-white px-2 py-4 mb-2 text-center font-light shadow-sm focus:outline-none' type="text" placeholder='name' name="" id="" />
                        <input className='w-[80%] bg-white px-2 py-4 mb-2 text-center font-light shadow-sm focus:outline-none' type="email" placeholder='Enter your email address' name="" id="" />
                    </div>
                    <Button
                        classAdd='mt-5 text-green-600 border border-[#80b435]  hover:bg-white bg-[#80b435] hover:text-[#80b435] text-xl font-light py-2 w-[10rem] text-white'
                    >
                        Subscribe
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default SubscribeModal;