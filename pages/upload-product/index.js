import { useEffect, useState } from "react";
import Footer from "../../components/Shared/Footer/Footer";
import FlotingInput from '../../components/Shared/InputFeild/FlotingInput'
import ManualSelect from "../../components/Shared/SelectList/ManualSelect";
import ImageUpload from "../../components/Shared/ImageUpload/ImageUpload";


const selectData = [
    {
        id: 1,
        title: "Product Category",
        name: 'category',
        options: ['fruits', 'vegetables', 'nuts']
    },
    {
        id: 2,
        title: "Product Weight Category",
        name: 'weight_category',
        options: ['kg', 'ton']
    },
    {
        id: 3,
        title: "Product Rating",
        name: 'rating',
        options: [1, 2, 3, 4, 5]
    },
    {
        id: 4,
        title: "Currency",
        name: 'currency',
        options: ['usd', 'taka']
    }
]

export default function UploadProduct() {
    const [inputData, setInputData] = useState({})
    const [formData, setFormData] = useState({})
    
    useEffect(() => {
        if(inputData) {
            const newData = {...formData}
            newData[inputData.title] = inputData.value
            delete newData.undefined
            setFormData(newData)
        }
    }, [inputData])


    const [imageData, setImageData] = useState('')
    const [mainImage, setMainImage] = useState(null)
    const [nestedImage, setNestedImage] = useState([])

    useEffect(() => {
        if(imageData) {
            const newData = [...nestedImage, imageData]
            setNestedImage(newData)
        }
    }, [imageData])


    const productUploadHandler = async (e) => {
        e.preventDefault()
        if(formData.item_name && formData.description && formData.base_price && formData.quantity && formData.weight_category && formData.rating && formData.category && formData.discount && formData.currency) {
            if(mainImage && nestedImage) {
                const newCollectedData = {...formData, item_img: mainImage, nestedImages: nestedImage}
                await fetch('api/product-upload', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newCollectedData)
                })
                .then(res => res.json())
                .then(result => {
                    console.log(result)
                    alert('Check Console')
                })
            }
            else {
                alert('Please select Images')
            }
        }
        else {
            alert('All field must be filled')
        }
    }
    return (
        <>  
            <div className="max-w-[1200px] m-auto pt-24 px-5 flex items-start">
                <form onSubmit={productUploadHandler} className="w-1/2 h-auto flex flex-wrap justify-between">
                    <FlotingInput getValue={setInputData} name="item_name" id={Math.random()} type={'text'} placeholder="Product Name" css="w-[49%]" />
                    <FlotingInput getValue={setInputData} name="base_price" id={Math.random()} type={'number'} placeholder="Product Main Price" css="w-[49%]" />
                    <FlotingInput getValue={setInputData} name="discount" id={Math.random()} type={'number'} placeholder="Product Discount" css="w-[49%]" />
                    <FlotingInput getValue={setInputData} name="quantity" id={Math.random()} type={'number'} placeholder="Product Quantity" css="w-[49%]" />
                    <FlotingInput getValue={setInputData} name="description" id={Math.random()} type={'text'} placeholder="Product Description" css="w-[49%] flex" />
                    {
                        selectData.map(data => <ManualSelect key={data.id} getValue={setInputData} css="w-[49%]" title={data.title} name={data.name} options={data.options} />)
                    }
                    {
                    mainImage &&
                        <ImageUpload btnClass="w-[49%] mt-5" multiple={{value: true}} setImageData={setImageData} btnName="Upload Nested Images (multiple)" />
                    
                    }
                    {
                        mainImage === null && <ImageUpload btnClass="w-[49%] mt-5" multiple={{value: false}} setImageData={setMainImage} btnName="Upload Main Image" />
                    }
                    <button className="btn text-white bg-blue-500 w-48 text-center py-3 rounded-sm mt-4" type="submit">Upload Product</button>
                </form>
                <div className="w-1/2 pl-10 flex">
                    {
                        mainImage && <div className="w-1/2"><img className="w-full h-auto" src={mainImage} alt="" /></div>
                    }
                    {
                        nestedImage && <div className="w-1/2 flex flex-wrap items-center pl-5">
                            {
                                nestedImage.map(image => <img className="w-1/2 h-auto border border-slate-200" src={image} alt="" />)
                            }
                        </div>
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}