import React from 'react';

const ProductLists = () => {
    let itemLists = [
        {
            id: 0,
            item_name: 'Stayberry',
            item_img: 'https://cdn.shopify.com/s/files/1/2179/9295/products/11_bfd2aa7c-4b01-448f-adcd-d621336fdea5_grande.jpg?v=1500460099',
            base_price: 400.00,
            weight_category: 'kg',
            category: 'fruits',
            discount: 10,
            currency: 'usd',
        },
        {
            id: 1,
            item_name: 'union bed',
            item_img: 'https://cdn.shopify.com/s/files/1/2179/9295/products/14_c2b85c63-76e4-441b-9cf4-6af58ef57974_grande.jpg?v=1500460080',
            base_price: 183.00,
            weight_category: 'kg',
            category: 'fruits',
            discount: 8,
            currency: 'usd',
        },
        {
            id: 2,
            item_name: 'Cucombar',
            item_img: 'https://cdn.shopify.com/s/files/1/2179/9295/products/7_131028d3-ab5d-4f57-9720-f4409cff4ded_grande.jpg?v=1500459572',
            base_price: 354.00,
            weight_category: 'kg',
            category: 'fruits',
            discount: 10,
            currency: 'usd',
        },
        {
            id: 3,
            item_name: 'Stayberry',
            item_img: 'https://cdn.shopify.com/s/files/1/2179/9295/products/3_c0fc88de-95cd-4402-b483-296adbe228cc_grande.jpg?v=1500459194',
            base_price: 368.00,
            weight_category: 'kg',
            category: 'fruits',
            discount: 10,
            currency: 'usd',
        },

        {
            id: 3,
            item_name: 'Stayberry',
            item_img: 'https://cdn.shopify.com/s/files/1/2179/9295/products/5_046d7508-fd6e-4f9b-a120-e58ff5802198_grande.jpg?v=1500459460',
            base_price: 305.00,
            weight_category: 'kg',
            category: 'fruits',
            discount: 10,
            currency: 'usd',
        },
        {
            id: 4,
            item_name: 'Stayberry',
            item_img: 'https://cdn.shopify.com/s/files/1/2179/9295/products/15_8fdea367-f778-4836-b1cb-54ef3e0c6f3b_grande.jpg?v=1500460099',
            base_price: 72.00,
            weight_category: 'kg',
            category: 'fruits',
            discount: 10,
            currency: 'usd',
        },
        {
            id: 5,
            item_name: 'Stayberry',
            item_img: 'https://cdn.shopify.com/s/files/1/2179/9295/products/6_1857190a-3408-40aa-8fe2-9ff6668f62a7_grande.jpg?v=1500459515',
            base_price: 95.00,
            weight_category: 'kg',
            category: 'fruits',
            discount: 10,
            currency: 'usd',
        },
        {
            id: 6,
            item_name: 'Stayberry',
            item_img: 'https://cdn.shopify.com/s/files/1/2179/9295/products/8_6214bb22-7161-4a44-9868-c76b88b1ff16_grande.jpg?v=1500459621',
            base_price: 195.00,
            weight_category: 'kg',
            category: 'fruits',
            discount: 10,
            currency: 'usd',
        },
        {
            id: 7,
            item_name: 'Stayberry',
            item_img: 'https://cdn.shopify.com/s/files/1/2179/9295/products/16_grande.jpg?v=1500459950',
            base_price: 208.00,
            weight_category: 'kg',
            category: 'fruits',
            discount: 10,
            currency: 'usd',
        },
        {
            id: 8,
            item_name: 'Stayberry',
            item_img: 'https://cdn.shopify.com/s/files/1/2179/9295/products/10_a909a839-7e86-43e2-a8e0-40ba8cb04496_grande.jpg?v=1500459734',
            base_price: 75.00,
            weight_category: 'kg',
            category: 'fruits',
            discount: 10,
            currency: 'usd',
        },
        {
            id: 9,
            item_name: 'Stayberry',
            item_img: 'https://cdn.shopify.com/s/files/1/2179/9295/products/4_f313a82a-af68-47fa-873d-36c8c94a3de5_grande.jpg?v=1500459484',
            base_price: 105.00,
            weight_category: 'kg',
            category: 'fruits',
            discount: 10,
            currency: 'usd',
        },
        {
            id: 10,
            item_name: 'Stayberry',
            item_img: 'https://cdn.shopify.com/s/files/1/2179/9295/products/15_8fdea367-f778-4836-b1cb-54ef3e0c6f3b_grande.jpg?v=1500460099',
            base_price: 65.00,
            weight_category: 'kg',
            category: 'fruits',
            discount: 10,
            currency: 'usd',
        },
    ]
    return (
        <div className='flex flex-wrap justify-between mt-8'>
            {
                itemLists && itemLists.map(item => (
                    <div key={item?.id} className='w-[251px] h-[268px] my-2 relative group overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer'>
                        <img className='w-full group-hover:scale-110 transition-transform duration-300' src={item?.item_img} alt="prduct_image" />
                        <div className='absolute bottom-4 h-12  w-full px-4'>
                            <h1 className='text-lg font-medium'>{item?.item_name}</h1>
                            <div className='flex gap-1 items-end'>
                                <span className='text-gray-500 line-through tracking-tighter'>{item?.currency === 'usd' && '$'}{item?.base_price}.00</span>
                                <span className='text-green-600 text-xl font-medium tracking-tight'>{item?.currency === 'usd' && '$'}{item?.base_price - (item?.base_price / item?.discount)}.00</span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default ProductLists;