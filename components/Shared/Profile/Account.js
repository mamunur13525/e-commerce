import LabelInput from "../InputFeild/LabelInput"

export default function Account({ css }) {
    const userDetails = [
        {
            id: 0,
            name: 'firstName',
            placeholder: "First Name",
            title: 'First Name',
            type: 'text',
            value: 'Maruf'
        },
        {
            id: 2,
            name: 'lastName',
            placeholder: "LastName",
            title: 'Last Name',
            type: 'text',
            value: 'Hossain'
        },
        {
            id: 3,
            name: 'email',
            placeholder: "Email",
            title: 'Email',
            type: 'email',
            value: 'hossain815265@gmail.com'
        },
        {
            id: 4,
            name: 'number',
            placeholder: "Phone Number",
            title: 'Phone Number',
            type: 'number',
            value: '01993980666'
        },
        {
            id: 5,
            name: 'company',
            placeholder: "Company",
            title: 'Company',
            type: 'text',
            value: 'Company'
        }
    ]
    return (
        <>
            <div className={`mt-5 ${css}`}>
                <h1 className="text-2xl font-semibold">Account Details</h1>
                <div className="flex justify-between flex-wrap">
                    {
                        userDetails.map(userDetail => <LabelInput css="lg:w-[48%] w-full" inputCss="w-full text-slate-600" labelCss="mt-2" id={userDetail.id} key={userDetail.id} name={userDetail.name} placeholder={userDetail.placeholder} title={userDetail.title} type={userDetail.type} value={userDetail.value} />)
                    }
                </div>
                <label className="mt-2 block text-md" htmlFor="bio">Bio</label>
                <textarea className="border w-full text-slate-600 rounded-sm px-3 py-2 outline-none" name="bio" id="bio" cols="30" rows="4" defaultValue={'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus similique qui labore officia quo enim inventore fugiat. Nemo modi eius sapiente magnam ab deleniti. Possimus autem earum dolorem.'} placeholder="Bio" />
                <div className="mt-2">
                    <button className="bg-[#80b435] text-white rounded-sm px-6 py-2 cursor-pointer">Update</button>
                    <button className="border border-[#80b435] text-[#80b435] rounded-sm px-6 py-2 ml-3 cursor-pointer">Cancel</button>
                </div>
            </div>
        </>
    )
}