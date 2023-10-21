import { useState } from "react";
import Footer from "../../components/Shared/Footer/Footer";
import FlotingInput from '../../components/Shared/InputFeild/FlotingInput'
import ManualSelect from "../../components/Shared/SelectList/ManualSelect";
import ImageUpload from "../../components/Shared/ImageUpload/ImageUpload";


const selectData = [
    {
        title: "Product Category",
        name: 'category',
        options: ['fruits', 'vegetables', 'nuts']
    },
    {
        title: "Product Weight Category",
        name: 'weight_category',
        options: ['kg', 'ton']
    },
    {
        title: "Product Rating",
        name: 'rating',
        options: [1, 2, 3, 4, 5]
    },
    {
        title: "Currency",
        name: 'currency',
        options: ['usd', 'taka']
    }
]

export default function UploadProduct() {
    const [fieldValue, setFieldValue] = useState({})
    console.log(fieldValue)

    return (
        <>  
            <div className="max-w-[1200px] m-auto pt-24 px-5">
                <form action="submit" className="w-1/2 flex flex-wrap justify-between">
                    <FlotingInput getValue={setFieldValue} name="item_name" id={Math.random()} type={'text'} placeholder="Product Name" css="w-[49%]" />
                    <FlotingInput getValue={setFieldValue} name="base_price" id={Math.random()} type={'number'} placeholder="Product Main Price" css="w-[49%]" />
                    <FlotingInput getValue={setFieldValue} name="discount" id={Math.random()} type={'number'} placeholder="Product Discount" css="w-[49%]" />
                    <FlotingInput getValue={setFieldValue} name="quantity" id={Math.random()} type={'number'} placeholder="Product Quantity" css="w-[49%]" />
                    <FlotingInput getValue={setFieldValue} name="description" id={Math.random()} type={'text'} placeholder="Product Description" css="w-[49%] flex" />
                    {
                        selectData.map(data => <ManualSelect key={Math.random()} getValue={setFieldValue} css="w-[49%]" title={data.title} name={data.name} options={data.options} />)
                    }
                </form>
                {/* <ImageUpload /> */}
            </div>
            <Footer />
        </>
    )
}