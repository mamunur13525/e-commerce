import LabelInput from "../InputFeild/LabelInput";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Account({ css, userData, setUserData }) {
    const [formData, setFormData] = useState({ ...userData });
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        setFormData({ ...userData });
    }, [userData]);

    const fieldValue = ({ name, value }) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            fullName: name === "firstName" || name === "lastName" 
                ? `${name === "firstName" ? value : prev.firstName} ${name === "lastName" ? value : prev.lastName}` 
                : prev.fullName,
        }));
    };

    const userDetails = [
        { id: 0, name: "firstName", placeholder: "First Name", title: "First Name", type: "text", required: true },
        { id: 2, name: "lastName", placeholder: "Last Name", title: "Last Name", type: "text", required: true },
        { id: 10, name: "fullName", placeholder: "Full Name", title: "Full Name", type: "text", required: true, disabled: true },
        { id: 3, name: "email", placeholder: "Email", title: "Email", type: "email", required: true, disabled: true },
        { id: 4, name: "phone", placeholder: "XXX-XXX-XXX", title: "Phone Number", type: "number" },
        { id: 5, name: "company", placeholder: "Company", title: "Company", type: "text" },
    ];

    const updateHandler = async () => {
        setUpdating(true);
        try {
            const response = await fetch("/api/modify-user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (result?.email) {
                toast.success("Profile updated.");
                setUserData(result);
            } else {
                throw new Error(result.message || "Failed to update profile.");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div className={`mt-5 ${css}`}>
            <h1 className="text-2xl font-semibold">Account Details</h1>
            <div className="flex justify-between flex-wrap">
                {userDetails.map((field) => (
                    <LabelInput
                        key={field.id}
                        css="lg:w-[48%] w-full"
                        inputCss="w-full text-slate-600"
                        labelCss="mt-2"
                        {...field}
                        value={formData[field.name] || ""}
                        onChange={fieldValue}
                    />
                ))}
            </div>
            <label className="mt-2 block text-md" htmlFor="bio">Bio</label>
            <textarea
                name="bio"
                id="bio"
                cols="30"
                rows="4"
                value={formData.bio || ""}
                onChange={(e) => fieldValue({ name: "bio", value: e.target.value })}
                className="border w-full text-slate-600 rounded-sm px-3 py-2 outline-none"
                placeholder="Bio"
            />
            <div className="mt-2">
                <button
                    onClick={updateHandler}
                    disabled={updating || JSON.stringify(userData) === JSON.stringify(formData)}
                    className={`${
                        updating || JSON.stringify(userData) === JSON.stringify(formData)
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-[#80b435]"
                    } text-white rounded-sm px-6 py-2`}
                >
                    {updating ? "Updating..." : "Update"}
                </button>
                {JSON.stringify(userData) !== JSON.stringify(formData) && (
                    <button
                        onClick={() => setFormData(userData)}
                        className="border border-[#80b435] text-[#80b435] rounded-sm px-6 py-2 ml-3"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </div>
    );
}
