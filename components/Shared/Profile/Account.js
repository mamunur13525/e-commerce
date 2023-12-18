import LabelInput from "../InputFeild/LabelInput"
import { UserData } from "../../../store/createStore"
import { useEffect, useState } from "react"

export default function Account({ css }) {
    const userData = UserData((state) => (state.data))
    const [formData, setFormData] = useState({...userData} || {})
    
    useEffect(() => {
        setFormData({...userData})
    }, [userData])

    const fieldValue = (data) => {
        const newData = {...formData}
        newData[data.name] = data.value
        setFormData(newData)
    }
    const userDetails = [
        {
            id: 0,
            name: 'firstName',
            placeholder: "First Name",
            title: 'First Name',
            type: 'text',
            required: true
        },
        {
            id: 2,
            name: 'lastName',
            placeholder: "LastName",
            title: 'Last Name',
            type: 'text',
            required: true
        },
        {
            id: 10,
            name: 'fullName',
            placeholder: "Full Name",
            title: 'Full Name',
            type: 'text',
            required: true,
            disabled: true
        },
        {
            id: 3,
            name: 'email',
            placeholder: "Email",
            title: 'Email',
            type: 'email',
            required: true
        },
        {
            id: 4,
            name: 'number',
            placeholder: "XXX-XXX-XXX",
            title: 'Phone Number',
            type: 'number',
        },
        {
            id: 5,
            name: 'company',
            placeholder: "Company",
            title: 'Company',
            type: 'text',
        }
    ]

    const updateHandler = (e) => {
        e.preventDefault()
        try {
            fetch('api/modify-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
        } catch (error) {
            alert('Something went wrong.')
        }
    }
    return (
        <>
            <div className={`mt-5 ${css}`}>
                <h1 className="text-2xl font-semibold">Account Details</h1>
                <div className="flex justify-between flex-wrap">
                    {
                        userDetails.map(userDetail => <LabelInput css="lg:w-[48%] w-full" inputCss="w-full text-slate-600" labelCss="mt-2" id={userDetail.id} key={userDetail.id} name={userDetail.name} placeholder={userDetail.placeholder} title={userDetail.title} type={userDetail.type} value={formData[userDetail.name]} onChange={fieldValue} />)
                    }
                </div>
                <label className="mt-2 block text-md" htmlFor="bio">Bio</label>
                <textarea onChange={(e) => fieldValue({name: 'bio', value: e.target.value})} className="border w-full text-slate-600 rounded-sm px-3 py-2 outline-none" name="bio" id="bio" cols="30" rows="4" value={formData.bio || ''} placeholder="Bio" />
                <div className="mt-2">
                    <button onClick={updateHandler} disabled={JSON.stringify(userData) === JSON.stringify(formData) && true} className={`${JSON.stringify(userData) === JSON.stringify(formData) ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#80b435]'} text-white rounded-sm px-6 py-2 cursor-pointer`}>Update</button>
                    {
                        JSON.stringify(userData) !== JSON.stringify(formData) && <button onClick={() => setFormData(userData)} className="border border-[#80b435] text-[#80b435] rounded-sm px-6 py-2 ml-3 cursor-pointer">Cancel</button>
                    }
                </div>
            </div>
        </>
    )
}