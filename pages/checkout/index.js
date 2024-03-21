import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import { useForm, useFormState } from 'react-hook-form'
import { BsCheckCircleFill } from 'react-icons/bs'
import Button from '../../components/Shared/Button'
import CustomModal from '../../components/Shared/CustomModal/CustomModal'
import Footer from '../../components/Shared/Footer/Footer'
import Navbar from '../../components/Shared/Navbar/Navbar'
import PageTitleSection from '../../components/Shared/PageTitleSection/PageTitleSection'
import { UserData, cartStore } from '../../store/createStore'
import SucessFullyGif from '../../images/successful.gif';
import Image from 'next/image'
import { useRouter } from 'next/router'
import ReactToPrint from 'react-to-print';
import React from 'react';
import toast from 'react-hot-toast'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
  
export default function Index() {
    const { register, setValue, handleSubmit, formState: { errors } } = useForm();
    const [openModal, setOpenModal] = useState(false);
    const router = useRouter()
    const clearCart = cartStore((state) => (state.clearCart))
    const userData = UserData((state) => (state.data))
    const cartItems = cartStore((state) => (state.items));
    const [subTotal, setSubTotal] = useState(0)
    const [tax, setTax] = useState(0)
    const [total, setTotal] = useState(0)
    const [country, setCountry] = useState()
    const [loading, setLoading] = useState(false)

    //Form Submission
    const onSubmit = async (data) => {
        localStorage.setItem('checkoutForm', JSON.stringify({...data, country: country || JSON.parse(localStorage?.getItem('checkoutForm')).country || ''}))
        const newData = {...data}
        newData.country = country || JSON.parse(localStorage?.getItem('checkoutForm')).country || ''
        if(cartItems[0]) {
            if(!loading) {
                setLoading(true)
                if(userData.email) {
                    try {
                        const order_data = {user: userData, products: cartItems, contact: newData, subtotal: subTotal, tax: tax, total: total}
                        const stripe = await stripePromise;
                        const response = await fetch('/api/checkout', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({items: cartItems, order: order_data})
                        })
                        const session = await response.json()
                        console.log(session)
                        session.error ? toast.error(session.error) :
                        clearCart()
                        await stripe.redirectToCheckout({
                            sessionId: session.id,
                        });
                        setLoading(false)
                    } catch (error) {
                        toast.error(error.message)
                        setLoading(false)
                    }
                }
                else {
                    setLoading(false)
                    router.push('/login')
                }
            }
        }
    };

    // order
    useEffect(() => {
        let subt = cartItems.length ? cartItems.map(itm => (itm.price - (itm.price / itm.discount)) * itm.ordered_quantity).reduce((prev, curr) => prev + curr) : 0
        setSubTotal(parseFloat(subt).toFixed(2))
        setTax((parseFloat((5 * subt) / 100)).toFixed(2))
        setTotal(parseFloat(subt + ((5 * subt) / 100)).toFixed(2))
    }, [cartItems])

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
                <div className="bg-gray-50 px-10 py-20 rounded-lg relative container mx-auto flex flex-col-reverse md:flex-row justify-between gap-16 mt-10 mb-20 min-h-[30rem]">
                    <div className="w-full lg:w-[50%]">
                        {/* <button onClick={() => setOpenModal(true)}>Open</button> */}
                        <CustomModal
                            customclassName='w-full  h-fit  !rounded-sm lg:max-w-[400px!important] h-fit  pr-4'
                            isOpen={openModal} setIsOpen={setOpenModal}>
                            <p className='text-center text-green-700  text-3xl my-2'>  Payment SuccessFully </p>
                            <div className='flex justify-center'>
                                <Image className='' width={100} height={80} src={SucessFullyGif} alt="my gif" />
                            </div>
                            <div className='mt-16 w-full' >
                                <PrintableArea router={router} />
                            </div>
                        </CustomModal>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <CheckoutForm setValue={setValue} register={register} errors={errors} setCountry={setCountry} />
                            <Button
                                type='submit'
                                classAdd='my-5'>
                                {
                                    loading ? '.....' : 'Place Order & Pay'
                                }
                            </Button>
                        </form>
                    </div>
                    <div className='w-full lg:w-[50%] md:border-l md:pl-5 '>
                        <CheckoutOrderSummery quantity={cartItems.length || 0} total={total || 0} />
                    </div>


                </div>

                <Footer />
            </main>
        </div>
    )
}


class ComponentToPrint extends React.Component {
    render() {
        return (
            <table>
                <tr>
                    <th>column 1</th>
                    <th>column 2</th>
                    <th>column 3</th>
                </tr>
                <tbody>
                    <tr>
                        <td>data 1</td>
                        <td>data 2</td>
                        <td>data 3</td>
                    </tr>
                    <tr>
                        <td>data 1</td>
                        <td>data 2</td>
                        <td>data 3</td>
                    </tr>
                    <tr>
                        <td>data 1</td>
                        <td>data 2</td>
                        <td>data 3</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

class PrintableArea extends React.Component {
    render() {
        return (
            <div>
                <ComponentToPrint ref={el => (this.componentRef = el)} />
                <ReactToPrint
                    trigger={() => <Button>Download</Button>}
                    content={() => this.componentRef}
                />
            </div>
        );
    }
}


const CheckoutOrderSummery = ({quantity, total}) => {
    return (
        <div>
            <div className='md:px-5'>
                <h1 className='mb-5 text-2xl'>Order Summary</h1>
                <p className='italic'>Shipping and additionnal costs are calculated based on values you have entered</p>
            </div>
            <p className='py-5 px-5 bg-white border-b mt-10 flex justify-between items-center'>
                <span className='font-medium'>Total Products:</span>
                <span>
                    {quantity} Items
                </span>
            </p>
            <div className="w-full py-5 flex justify-between items-center bg-white px-5">
                <span className='font-medium'>
                    Total Price
                </span>
                <span>
                    {total}
                </span>
            </div>
        </div>
    )
}

const CheckoutForm = ({ setValue, register, errors, setCountry }) => {
    const [formData, setFormData] = useState({})

    useEffect(() => {
        setFormData(JSON.parse(localStorage.getItem('checkoutForm')))
    }, [])

    return (
        <div className=" w-full ">
            <h1 className='mb-5 text-2xl'>Contact information</h1>
            <div className="w-full">
                <div className='flex justify-between gap-4 mb-2'>
                    <FormInput
                        setValue={setValue}
                        register={register}
                        placeholder={'...'}
                        type={'text'}
                        required={true}
                        name={'first_name'}
                        id={'first_name'}
                        label='First Name'
                        errors={errors}
                        value={formData?.first_name}
                    />

                    <FormInput
                        setValue={setValue}
                        register={register}
                        placeholder={'...'}
                        type={'text'}
                        required={true}
                        name={'last_name'}
                        id={'last_name'}
                        label='Last Name'
                        errors={errors}
                        value={formData?.last_name}
                    />
                </div>
            </div>
            <div className="mb-2">
                <FormInput
                    setValue={setValue}
                    register={register}
                    placeholder={'...'}
                    type={'email'}
                    required={true}
                    name={'email'}
                    id={'email'}
                    label='email'
                    errors={errors}
                    value={formData?.email}
                />
                <FormInput
                    setValue={setValue}
                    register={register}
                    placeholder={'...'}
                    type={'text'}
                    required={true}
                    name={'company'}
                    id={'company'}
                    label='Company'
                    errors={errors}
                    value={formData?.company}
                />
                <FormInput
                    setValue={setValue}
                    register={register}
                    placeholder={'...'}
                    type={'text'}
                    required={true}
                    name={'address'}
                    id={'address'}
                    label='Address'
                    errors={errors}
                    value={formData?.address}
                />
                <FormInput
                    setValue={setValue}
                    register={register}
                    placeholder={'...'}
                    type={'text'}
                    required={true}
                    name={'apartment'}
                    id={'apartment'}
                    label='Apartment, suite, etc.'
                    errors={errors}
                    value={formData?.apartment}
                />
                <div className='flex flex-col pb-2'>
                    <p className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 '>Country</p>
                    <select onChange={(e) => setCountry(e.target.value || formData?.country || null)} className={`w-full py-2 border  px-3 rounded-lg bg-white ${errors['country'] ? 'border-red-300' : 'border-gray-200'}`} name="country" id="country" required>
                        <option value="">Select Country</option>
                        <option selected={formData?.country === 'bangladesh' && true} value="bangladesh">Bangladesh</option>
                        <option selected={formData?.country === 'pakistan' && true} value="pakistan">Pakistan</option>
                        <option selected={formData?.country === 'india' && true} value="india">India</option>
                        <option selected={formData?.country === 'afganistan' && true} value="afganistan">Afganistan</option>
                        <option selected={formData?.country === 'malasia' && true} value="malasia">Malasia</option>
                        <option selected={formData?.country === 'usa' && true} value="usa">United State of America</option>
                        <option selected={formData?.country === 'uk' && true} value="uk">UK</option>
                        <option selected={formData?.country === 'singapur' && true} value="singapur">Singapur</option>
                    </select>
                    {
                        errors.country &&
                        <p className="text-red-500 text-xs italic mb-4">{errors?.message || 'this field is required'}</p>
                    }
                </div>
            </div>
            <div className='flex justify-between gap-4 mb-2'>
                <FormInput
                    setValue={setValue}
                    register={register}
                    placeholder={'...'}
                    type={'text'}
                    required={true}
                    name={'city'}
                    id={'city'}
                    label='City.'
                    errors={errors}
                    value={formData?.city}
                />
                <FormInput
                    setValue={setValue}
                    register={register}
                    placeholder={'...'}
                    type={'number'}
                    required={true}
                    name={'postal_code'}
                    id={'postal_code'}
                    label='Postal Code'
                    errors={errors}
                    value={formData?.postal_code}
                />
            </div>
            <div className='flex justify-between gap-4 mb-2'>
                <FormInput
                    setValue={setValue}
                    register={register}
                    placeholder={'...'}
                    type={'number'}
                    required={true}
                    name={'phone'}
                    id={'phone'}
                    label='Phone'
                    errors={errors}
                    value={formData?.phone}
                />
            </div>
            {/* <hr className='my-8' />
            <DeliveryMethod setValue={setValue} register={register} />
            <hr className='my-8' />
            <PaymentOptions /> */}
        </div >
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

const DeliveryMethod = ({ setValue, register }) => {
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
    useEffect(() => {
        register('delivery_method')
    }, [])

    useEffect(() => {
        setValue('delivery_method', methods[activeMethod])
    }, [activeMethod])
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

const FormInput = ({ errors = {}, labelCss = '', register, placeholder = '', type = '', required = false, name = '', id = '', label = '', value = '', setValue }) => {
    return (
        <div className='w-full'>
            <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${labelCss}`} htmlFor={name}>
                {label}
            </label>
            <Input
                register={register}
                placeholder={placeholder}
                type={type}
                // required={required}
                name={name}
                id={id}
                isErr={errors[name] || false}
                value={value}
                setValue={setValue}
            />
            {
                errors[name] &&
                <p className="text-red-500 text-xs italic mb-4">{errors[name].message || 'this field is required'}</p>
            }
        </div>
    )
}

const Input = ({ register = () => { }, inputCss = '', placeholder = '', type = '', required = false, name = '', isErr = false, value = '', setValue }) => {
    useEffect(() => {
        setValue(name, value)
    }, [value])
    return (
        <input
            {...register(name)}
            className={`appearance-none block w-full bg-white text-gray-700 border ${isErr ? 'border-red-300' : 'border-gray-200'} rounded-lg py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${inputCss}`}
            placeholder={placeholder}
            type={type}
            name={name}
            id={name}
            // defaultValue={value}
            required
        />
    )
}