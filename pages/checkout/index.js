import Head from 'next/head'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsCheckCircleFill } from 'react-icons/bs'
import OrderDetails from '../../components/Cart/OrderDetails'
import Footer from '../../components/Shared/Footer/Footer'
import Navbar from '../../components/Shared/Navbar/Navbar'
import PageTitleSection from '../../components/Shared/PageTitleSection/PageTitleSection'

export default function Index() {

    return (
        <div>
            <Head>
                <title>Garden Shop</title>
                <meta name="description" content="e-commerce" />
                <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
                <link rel="icon" href="https://i.pinimg.com/736x/70/c0/ba/70c0baafea00b9b892d084e7202d0c61.jpg" />
            </Head>
            <main className=''>
                <Navbar />
                <PageTitleSection
                    img='https://cdn.shopify.com/s/files/1/2179/9295/t/5/assets/breadcrumb_image_3.jpg?v=83084458265994090391500869701'
                    title='Checkout '
                />
                <div className="bg-gray-50 px-10 py-20 rounded-lg relative container mx-auto flex justify-between gap-16 mt-10 mb-20 min-h-[30rem]">
                    <div className="w-[50%]">
                        <CheckoutForm />
                    </div>
                    <div className='w-[50%]'>
                        <OrderDetails />
                    </div>
                </div>

                <Footer />
            </main>
        </div>
    )
}


const CheckoutForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log({ data })
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className=" w-full ">
            <h1 className='mb-5'>Contact information</h1>
            <div className="w-full">
                <div className='flex justify-between gap-4 mb-2'>
                    <FormInput
                        register={register}
                        placeholder={'...'}
                        type={'text'}
                        required={true}
                        name={'first_name'}
                        id={'first_name'}
                        label='First Name'
                        errors={errors}
                    />

                    <FormInput
                        register={register}
                        placeholder={'...'}
                        type={'text'}
                        required={true}
                        name={'last_name'}
                        id={'last_name'}
                        label='Last Name'
                        errors={errors}
                    />
                </div>
            </div>
            <div className="w-full">
                <FormInput
                    register={register}
                    placeholder={'***********'}
                    type={'password'}
                    required={true}
                    name={'password'}
                    id={'password'}
                    label='Password'
                    errors={errors}
                />
                <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
            </div>
            <div className="mb-2 mt-4">
                <FormInput
                    register={register}
                    placeholder={'...'}
                    type={'text'}
                    required={true}
                    name={'company'}
                    id={'company'}
                    label='Company'
                    errors={errors}
                />
                <FormInput
                    register={register}
                    placeholder={'...'}
                    type={'text'}
                    required={true}
                    name={'address'}
                    id={'address'}
                    label='Address'
                    errors={errors}
                />
                <FormInput
                    register={register}
                    placeholder={'...'}
                    type={'text'}
                    required={true}
                    name={'apartment'}
                    id={'apartment'}
                    label='Apartment, suite, etc.'
                    errors={errors}
                />

            </div>
            <div className='flex justify-between gap-4 mb-2'>
                <div className="w-1/2" >
                    <FormInput
                        register={register}
                        placeholder={'...'}
                        type={'text'}
                        required={true}
                        name={'city'}
                        id={'city'}
                        label='City.'
                        errors={errors}
                    />
                </div>
                <div className='w-1/2 flex flex-col'>
                    <p className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 '>Country</p>
                    <select className='w-full py-2 border  px-3 rounded-lg bg-white' name="" id="">
                        <option value="bangladesh">Bangladesh</option>
                        <option value="bangladesh">Bangladesh</option>
                        <option value="bangladesh">Bangladesh</option>
                        <option value="bangladesh">Bangladesh</option>
                        <option value="bangladesh">Bangladesh</option>
                        <option value="bangladesh">Bangladesh</option>
                        <option value="bangladesh">Bangladesh</option>
                        <option value="bangladesh">Bangladesh</option>
                        <option value="bangladesh">Bangladesh</option>
                    </select>
                </div>
            </div>
            <div className='flex justify-between gap-4 mb-2'>
                <FormInput
                    register={register}
                    placeholder={'...'}
                    type={'text'}
                    required={true}
                    name={'state'}
                    id={'state'}
                    label='State / Province'
                    errors={errors}
                />
                <FormInput
                    register={register}
                    placeholder={'...'}
                    type={'text'}
                    required={true}
                    name={'postal_code'}
                    id={'postal_code'}
                    label='Postal Code'
                    errors={errors}
                />
            </div>
            <div className='flex justify-between gap-4 mb-2'>
                <FormInput
                    register={register}
                    placeholder={'...'}
                    type={'text'}
                    required={true}
                    name={'phone'}
                    id={'phone'}
                    label='Phone'
                    errors={errors}
                />
            </div>
            <hr className='my-8' />
            <DeliveryMethod />
            <hr className='my-8' />
            <PaymentOptions />
        </form>
    )
}

const PaymentOptions = () => {
    const [pamentOption, setpamentOption] = useState(1);

    const options = [
        {
            id: 1,
            name: 'standard',
            days: '4-10',
            price: '5.00'
        },
        {
            id: 2,
            name: 'express',
            days: '2-5',
            price: '16.00'
        },
    ]
    return (
        <>
            <h1 className='mb-5'>Payment options</h1>

            <div className='flex justify-between gap-5'>
                {
                    options.map(option => (
                        <div onClick={() => setpamentOption(option.id)} key={option.id} className={`relative cursor-pointer flex flex-col justify-between gap-5 w-1/2  border rounded-lg bg-white p-5 ${option.id === pamentOption ? 'border-blue-700 border-2' : ''}`}>
                            <div>
                                <p className='capitalize text-sm'>{option.name}</p>
                                <p className='text-xs'>{option.days} bussiness days</p>
                            </div>
                            {
                                option.id === pamentOption &&
                                <BsCheckCircleFill className='absolute top-4 text-blue-600 right-4' />
                            }
                            <p className='text-sm'>${option.price}</p>
                        </div>
                    ))
                }
            </div>
        </>

    )
}

const DeliveryMethod = () => {
    const [activeMethod, setActiveMethod] = useState(1);

    const methods = [
        {
            id: 1,
            name: 'standard',
            days: '4-10',
            price: '5.00'
        },
        {
            id: 2,
            name: 'express',
            days: '2-5',
            price: '16.00'
        },
    ]
    return (
        <>
            <h1 className='mb-5'>Delivery methods</h1>

            <div className='flex justify-between gap-5'>
                {
                    methods.map(method => (
                        <div onClick={() => setActiveMethod(method.id)} key={method.id} className={`relative cursor-pointer flex flex-col justify-between gap-5 w-1/2  border rounded-lg bg-white p-5 ${method.id === activeMethod ? 'border-blue-700 border-2' : ''}`}>
                            <div>
                                <p className='capitalize text-sm'>{method.name}</p>
                                <p className='text-xs'>{method.days} bussiness days</p>
                            </div>
                            {
                                method.id === activeMethod &&
                                <BsCheckCircleFill className='absolute top-4 text-blue-600 right-4' />
                            }
                            <p className='text-sm'>${method.price}</p>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

const FormInput = ({ errors = {}, labelCss = '', register, placeholder = '', type = '', required = false, name = '', id = '', label = '' }) => {
    return (
        <div className='w-full'>
            <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${labelCss}`} htmlFor={name}>
                {label}
            </label>
            <Input
                register={register}
                placeholder={placeholder}
                type={type}
                required={required}
                name={name}
                id={id}
                isErr={errors[name] || false}
            />
            {
                errors[name] &&
                <p className="text-red-500 text-xs italic">{errors?.message}</p>
            }
        </div>
    )
}

const Input = ({ register = () => { }, inputCss = '', placeholder = '', type = '', required = false, name = '', isErr = false }) => {
    return (
        <input
            {...register(name, { required, message: `${name} is required!` })}
            className={`appearance-none block w-full bg-white text-gray-700 border ${isErr ? 'border-red-300' : 'border-gray-200'} rounded-lg py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${inputCss}`}
            placeholder={placeholder}
            required={required}
            type={type}
            name={name}
            id={name}
        />
    )
}