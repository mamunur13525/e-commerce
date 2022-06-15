import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../Shared/Button';

const Login = () => {
    const router = useRouter();
    const inputFeilds = [
        {
            id: 0,
            name: 'user_name',
            placeholder: "UserName",
            title: 'User Name',
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
                <div className='py-20'>
                    <div className="w-10/12 mx-auto md:mx-0 md:w-7/12 lg:w-5/12 shadow-lg">
                        <div className='w-full bg-white p-10'>
                            <p className='text-4xl font-thin  text-center mb-10'>
                                <span>Log in </span>

                                <span className='text-base font-normal cursor-pointer' onClick={() => router.push('/signup')}> Sign up</span>
                            </p>
                            <FormBox inputFeilds={inputFeilds} />
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


export const FormBox = ({ inputFeilds = [], submitBtn = 'Sign in' }) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data) => {
       
    }
    return (
        <>{
            inputFeilds.length &&
            <form onSubmit={handleSubmit(onSubmit)}>
                {
                    inputFeilds.map(feild => (
                        <div key={feild.id} className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2" htmlFor={feild.name}>
                                {feild.placeholder}
                            </label>
                            <input
                                {...register(feild.name, { required: true })}
                                className=" appearance-none border  w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name={feild.name}
                                id={feild.name}
                                type={feild.type}
                                placeholder={feild.placeholder}
                            />
                            {errors[feild.name] && <span className='text-red-700 mt-2 text-sm italic'>This field is required</span>}
                        </div>
                    ))
                }

                <div className="flex items-center justify-between mt-10">
                    <input className='border cursor-pointer first-letter:border border-green-500 hover:bg-white bg-green-600  hover:text-green-600 text-white text-xl font-light py-2 w-[10rem] ' type="submit" value={submitBtn} />
                    <a className="inline-block align-baseline font-medium text-sm text-green-600 hover:text-green-800" href="#">
                        Forgot Password?
                    </a>
                </div>
            </form>}
        </>
    )
}