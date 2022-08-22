
import Button from '../../Shared/Button';

const SalesOffer = () => {
    return (
        <div className={`h-fit lg:h-[30rem] pb-5  bg-[url('https://cdn.shopify.com/s/files/1/2179/9295/files/home1-banner1_ca7416b4-4dd7-40d9-9f74-2071b228dba0.jpg?v=1501465964')]`} >
            <div className='container mx-auto my-20 h-full '>
                <div className='relative h-full flex flex-col lg:flex-row justify-end  gap-10 z-20'>
                    <div className=' lg:absolute lg:-bottom-20 left-0 pt-10 px-10'>
                        <img src="https://cdn.shopify.com/s/files/1/2179/9295/files/home1-images-banner1_f2d91e57-11a6-4875-9a36-bd8d2a0b2161_grande.png?v=1501466193" alt="offer_image" />
                    </div>
                    <div className='relative w-2/3 self-center'>
                        <div className='3/4 ml-auto'>
                            <div className='flex gap-5 items-end mb-5 '>
                                <img className="" src="https://cdn.shopify.com/s/files/1/2179/9295/files/icon-shipping-5_small.png?v=1500447203" alt="Big sale today" />
                                <h3 className='text-[#80b435] text-5xl font-extralight'>BIG SALE TODAY</h3>
                            </div>
                            <p className='font-extralight text-2xl  uppercase'>Get 30% off your order of $100 or more...</p>
                        </div>
                        <div>
                            <p className="w-full text-center py-10 bg-white font-light font-sans"><span> Expired</span></p>
                            <div className='flex justify-end mt-5'>
                                <Button withBck={true} classAdd='max-w-fit px-14 uppercase'>
                                    Shop Now
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default SalesOffer;