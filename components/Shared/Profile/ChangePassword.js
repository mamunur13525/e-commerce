import { useState } from "react";
import LabelInput from "../InputFeild/LabelInput";
import toast from "react-hot-toast";

export default function ChangePassword({ css, email }) {
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });
    const [updating, setUpdating] = useState(false);

    const userDetails = [
        {
            id: 0,
            name: "oldPassword",
            placeholder: "Old Password (leave empty if signed in with Google)",
            title: "Old Password",
            type: "password",
            required: false,
        },
        {
            id: 1,
            name: "newPassword",
            placeholder: "New Password",
            title: "New Password",
            type: "password",
            required: true,
        },
        {
            id: 2,
            name: "confirmNewPassword",
            placeholder: "Confirm Password",
            title: "Confirm Password",
            type: "password",
            required: true,
        },
    ];

    const handleInputChange = ({ name, value }) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { oldPassword, newPassword, confirmNewPassword } = formData;

        // Check if new password and confirm password are not empty
        if (!newPassword || !confirmNewPassword) {
            return toast.error("Both New Password and Confirm Password are required.");
        }

        // Check if new passwords match
        if (newPassword !== confirmNewPassword) {
            return toast.error("New passwords do not match.");
        }

        setUpdating(true);
        try {
            const response = await fetch("/api/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password: oldPassword, newPassword }),
            });
            const result = await response.json();

            if (!result?.error) {
                toast.success(result.message);
                setFormData({
                    oldPassword: "",
                    newPassword: "",
                    confirmNewPassword: "",
                });
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            toast.error("An error occurred while updating the password.");
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div className={`mt-5 ${css}`}>
            <h1 className="text-2xl font-semibold">Change Password</h1>
            <p className="md:mb-3 text-sm text-secondary text-gray-500">
                If you signed in with Google or don't have a password, leave the old password field empty.
            </p>
            <form onSubmit={handleSubmit} className="">
                {userDetails.map((userDetail) => (
                    <LabelInput
                        key={userDetail.id}
                        css="lg:w-[48%]"
                        inputCss="w-full text-slate-600"
                        labelCss="mt-2"
                        id={userDetail.id}
                        name={userDetail.name}
                        placeholder={userDetail.placeholder}
                        title={userDetail.title}
                        type={userDetail.type}
                        value={formData[userDetail.name]}
                        onChange={handleInputChange}
                    />
                ))}
                <button
                    type="submit"
                    disabled={updating}
                    className={`${updating ? "bg-gray-400 cursor-not-allowed" : "bg-[#80b435]"
                        } text-white rounded-sm px-6 py-2 cursor-pointer mt-3`}
                >
                    {updating ? "Updating..." : "Update"}
                </button>
            </form>
        </div>
    );
}
