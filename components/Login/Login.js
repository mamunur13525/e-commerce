'use client'

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../Shared/Button';
import FlotingInput from '../Shared/InputFeild/FlotingInput';
import { FcGoogle } from "react-icons/fc";
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';

const Login = ({ callbackUrl }) => {
    const router = useRouter();
    const inputFeilds = [
        {
            id: 0,
            name: 'email',
            placeholder: "Email",
            title: 'Email',
            type: 'email'
        },
        {
            id: 1,
            name: 'password',
            placeholder: "Password",
            title: 'Password',
            type: 'password'
        }
    ]
    return (
        <div className='bg-no-repeat bg-cover bg-center bg-[url("https://cdn.shopify.com/s/files/1/0033/7956/0537/files/New_Project_10.jpg?v=1570870679")]'>
            <div className="container mx-auto">
                <div className='py-20 flex justify-center'>
                    <div className="w-[28rem]  rounded-sm mx-auto md:mx-0  shadow-lg">
                        <div className='w-full bg-white p-10'>
                            <p className='text-4xl font-thin  text-center mb-10'>
                                <span>Log in </span>
                                <span className='text-base text-gray-500 font-normal cursor-pointer' onClick={() => router.push('/signup')}> / Sign up</span>
                            </p>
                            <FormBox inputFeilds={inputFeilds} submitBtn="Sign In" apiType="signin" callbackUrl={callbackUrl} />
                            <p className="text-center text-gray-500 text-xs mt-5">
                                &copy;2020 Acme Corp. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;


export const FormBox = ({ inputFeilds = [], submitBtn = 'SUBMIT', apiType, callbackUrl = null }) => {
    const [formData, setFormData] = useState({})
    const [inputData, setInputData] = useState({})
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (inputData && inputData.title) {
            const newData = { ...formData }
            newData[inputData.title] = inputData.value
            delete newData.undefined
            setFormData(newData)
        }
    }, [inputData, formData])

    const getRedirectDestination = () => {
        return callbackUrl && callbackUrl !== '/login' && callbackUrl !== '/signup' ? callbackUrl : '/profile';
    }

    // Email validation pattern
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Get validation rules for each field
    const getValidationRules = (field) => {
        const rules = { required: field?.errMessage || 'This field is required' };

        if (field.type === 'email') {
            rules.pattern = {
                value: emailPattern,
                message: 'Please enter a valid email address'
            };
        }

        // Add password length validation
        if (field.name === 'password' && apiType === 'register') {
            rules.minLength = {
                value: 6,
                message: 'Password must be at least 6 characters long'
            };
        }

        // Add password confirmation validation
        if (field.name === 'confirm_password' && apiType === 'register') {
            rules.validate = (value) => {
                const password = watch('password');
                return value === password || 'Passwords do not match';
            };
        }

        return rules;
    };

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        setLoading(true)
        if (apiType === 'signin') {
            setError('')
            try {
                await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                    .then(res => res.json())
                    .then(result => {
                        if (result.error) {
                            setError(result.error)
                        }
                        else {
                            setError('')
                            signIn(`credentials`, { name: result.name, email: result.email, redirect: false })
                            router.push(getRedirectDestination());
                        }
                    })
            } catch (error) {
                setError(error.message)
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }
        else if (apiType === 'register') {
            if (formData.password === formData.confirm_password) {
                setError('')
                try {
                    await fetch('/api/register', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(formData)
                    })
                        .then(res => res.json())
                        .then(result => {
                            if (result.error) {
                                setError(result.error)
                            }
                            else {
                                setError('')
                                signIn(`credentials`, { name: result.name, email: result.email, redirect: false })
                                router.push(getRedirectDestination());
                            }
                        })
                } catch (error) {
                    setError(error.message)
                    toast.error(error.message)
                } finally {
                    setLoading(false)
                }
            }
            else {
                setError('Password did not match.')
                setLoading(false)
            }
        }
    }

    const handleGoogleSignIn = () => {
        const destination = getRedirectDestination();
        signIn("google", { callbackUrl: destination });
    };
    return (
        <>{
            inputFeilds.length &&
            <form id='input_form' onSubmit={handleSubmit(onSubmit)}>
                {
                    inputFeilds.map(field => (
                        <div key={field.id} className="">
                            <FlotingInput
                                css='py-[2px] rounded-md mb-2'
                                inputCss=''
                                placeholderCss='!text-base !text-gray-500 !peer-focus:top-5'
                                register={register}
                                name={field.name}
                                id={field.name}
                                type={field.type}
                                placeholder={field.placeholder}
                                getValue={setInputData}
                                validation={getValidationRules(field)}
                            />
                            {errors[field.name] && <span className='text-red-700 mt-2 text-sm italic block'>{errors[field.name]?.message || field?.errMessage || 'This field is required'}</span>}
                        </div>
                    ))
                }
                <button
                    className='flex justify-center w-full border border-gray-300 rounded-sm py-2 gap-2 cursor-pointer mt-10'
                    type='button'
                    onClick={handleGoogleSignIn}
                >
                    <FcGoogle className='w-6 h-6 cursor-pointer' />
                    <h1>Sign in with Google</h1>
                </button>
                {
                    error && <p className='text-red-500 font-xs text-center '>{error}</p>
                }
                <div className="flex flex-col gap-2 items-center justify-between pt-2">
                    <Button type="submit" classAdd={`w-full px-7 ${loading && 'cursor-not-allowed opacity-50'}`} >
                        {submitBtn}
                    </Button>
                    {
                        apiType === 'signin' && <a className="inline-block align-baseline font-medium text-sm text-green-600 hover:text-green-800" href="#">
                            Forgot Password?
                        </a>
                    }
                </div>
            </form>}
        </>
    )
}