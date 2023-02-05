import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../Shared/Button';
import FlotingInput from '../Shared/InputFeild/FlotingInput';

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
                    <div className="w-[28rem]  rounded-sm mx-auto md:mx-0  shadow-lg">
                        <div className='w-full bg-white p-10'>
                            <p className='text-4xl font-thin  text-center mb-10'>
                                <span>Log in </span>
                                <span className='text-base text-gray-500 font-normal cursor-pointer' onClick={() => router.push('/signup')}> / Sign up</span>
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
                    inputFeilds.map(field => (
                        <div key={field.id} className="mb-8">
                            <FlotingInput
                                css='border py-[2px] rounded-md '
                                inputCss=''
                                placeholderCss='!text-base !text-gray-500 !peer-focus:top-5'
                                register={register}
                                name={field.name}
                                id={field.name}
                                type={field.type}
                                placeholder={field.placeholder}
                            />
                            {errors[field.name] && <span className='text-red-700 mt-2 text-sm italic'>{field?.errMessage || 'this field is required'}</span>}
                        </div>
                    ))
                }
                <div className="flex items-center justify-between mt-10">
                    <Button type="submit" classAdd='w-fit px-7' >
                        {submitBtn}
                    </Button>
                    <a className="inline-block align-baseline font-medium text-sm text-green-600 hover:text-green-800" href="#">
                        Forgot Password?
                    </a>
                </div>
            </form>}
        </>
    )
}