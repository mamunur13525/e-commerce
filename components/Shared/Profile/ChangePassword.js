import LabelInput from "../InputFeild/LabelInput"

export default function ChangePassword({ css }) {
    const userDetails = [
        {
            id: 0,
            name: 'oldPassword',
            placeholder: "Old Password",
            title: 'Old Password',
            type: 'password',
            value: ''
        },
        {
            id: 2,
            name: 'newPassword',
            placeholder: "New Password",
            title: 'New Password',
            type: 'password',
            value: ''
        }
    ]
    return (
        <>
            <div className={`mt-5 ${css}`}>
                <h1 className="text-2xl font-semibold md:mb-3">Change Password</h1>
                <div className="">
                    {
                        userDetails.map(userDetail => <LabelInput css="lg:w-[48%]" inputCss="w-full text-slate-600" labelCss="mt-2" id={userDetail.id} key={userDetail.id} name={userDetail.name} placeholder={userDetail.placeholder} title={userDetail.title} type={userDetail.type} value={userDetail.value} />)
                    }
                </div>
                <button className="bg-[#80b435] text-white rounded-sm px-6 py-2 cursor-pointer mt-3">Update</button>
            </div>
        </>
    )
}