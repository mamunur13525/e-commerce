"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ui/floating-input";
import { Separator } from "@/components/ui/separator";

import { toast } from "sonner";
import {
  UserIcon,
  Mail01Icon,
  SmartPhone01Icon,
  SecurityCheckIcon,
  Edit02Icon,
  Cancel01Icon,
  Loading03Icon,
} from "hugeicons-react";
import { useAuthStore } from "@/store/auth-store";
import {
  useProfile,
  useUpdateProfile,
  useUpdatePassword,
} from "@/hooks/api/queries";
import { ProfileSkeleton } from "@/components/skeleton";
import AddressCard from "@/components/address/AddressCard";
import AddAddressModalButton from "@/components/address/AddAddressModalButton";

interface ProfileFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

interface PasswordFormData {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, token, updateUser, isAuthenticated } = useAuthStore();
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication on mount
  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, user, router]);

  // React Query hooks
  const {
    data: profileData,
    isLoading: isLoadingProfile,
    error: profileError,
  } = useProfile(token);
  const updateProfileMutation = useUpdateProfile(token);
  const updatePasswordMutation = useUpdatePassword(token);

  // Profile form
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    reset: resetProfile,
    formState: { errors: profileErrors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
    },
  });

  // Update form when profile data changes
  useEffect(() => {
    if (profileData) {
      resetProfile({
        first_name: profileData.first_name || "",
        last_name: profileData.last_name || "",
        email: profileData.email || "",
        phone: profileData.phone || "",
      });
      updateUser(profileData);
    } else if (user && !token) {
      // Fallback to cached user data if no token
      resetProfile({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [profileData, token, resetProfile, updateUser]);

  // Password form
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
    formState: { errors: passwordErrors },
    watch,
  } = useForm<PasswordFormData>({
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const newPassword = watch("new_password");

  const onProfileSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfileMutation.mutateAsync({
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
      });
      setIsEditProfile(false);
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    }
  };

  const onPasswordSubmit = async (data: PasswordFormData) => {
    if (!token) {
      toast.error("Please log in to update your password");
      return;
    }
    if (!profileData?.isPasswordLogin) {
      toast.error("You'v no password yet!");
      return;
    }
    try {
      await updatePasswordMutation.mutateAsync({
        current_password: data.current_password,
        new_password: data.new_password,
      });
      setIsEditPassword(false);
      resetPassword();
      toast.success("Password updated successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to update password");
    }
  };

  const handleCancelProfile = () => {
    // Reset to original values
    const currentUser = profileData || user;
    if (currentUser) {
      resetProfile({
        first_name: currentUser.first_name || "",
        last_name: currentUser.last_name || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
      });
    }
    setIsEditProfile(false);
  };

  const handleCancelPassword = () => {
    resetPassword();
    setIsEditPassword(false);
  };

  if (isLoading) {
    return null;
  }

  if (isLoadingProfile) {
    return <ProfileSkeleton />;
  }
  if (isLoadingProfile && !user && !token) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#003d29]">My Profile</h1>
          <p className="text-gray-500">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#003d29]">My Profile</h1>
        <p className="text-gray-500">
          Manage your personal information and addresses.
        </p>
      </div>

      <div className="space-y-8">
        {/* Personal Information */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#003d29]">
              Personal Information
            </h2>
            {!isEditProfile ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsEditProfile(true)}
                className="text-[#003d29] hover:text-[#002a1c]"
              >
                <Edit02Icon className="size-4 mr-2" />
                Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleCancelProfile}
                  disabled={updateProfileMutation.isPending}
                >
                  <Cancel01Icon className="size-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
          <Separator />
          <form onSubmit={handleSubmitProfile(onProfileSubmit)}>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <FloatingInput
                  id="first-name"
                  label="First Name"
                  {...registerProfile("first_name", {
                    required: "First name is required",
                  })}
                  disabled={!isEditProfile}
                  startIcon={<UserIcon className="size-5" />}
                />
                {profileErrors.first_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {profileErrors.first_name.message}
                  </p>
                )}
              </div>
              <div>
                <FloatingInput
                  id="last-name"
                  label="Last Name"
                  {...registerProfile("last_name", {
                    required: "Last name is required",
                  })}
                  disabled={!isEditProfile}
                  startIcon={<UserIcon className="size-5" />}
                />
                {profileErrors.last_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {profileErrors.last_name.message}
                  </p>
                )}
              </div>
              <div>
                <FloatingInput
                  id="email"
                  label="Email Address"
                  {...registerProfile("email")}
                  disabled
                  className="bg-gray-50 text-gray-500"
                  startIcon={<Mail01Icon className="size-5" />}
                />
              </div>
              <div>
                <FloatingInput
                  id="phone"
                  label="Phone Number"
                  {...registerProfile("phone")}
                  disabled={!isEditProfile}
                  startIcon={<SmartPhone01Icon className="size-5" />}
                />
              </div>
            </div>
            {isEditProfile && (
              <div className="mt-6">
                <Button
                  type="submit"
                  disabled={updateProfileMutation.isPending}
                  className="bg-[#003d29] hover:bg-[#002a1c] text-white "
                >
                  {updateProfileMutation.isPending ? (
                    <span className="flex items-center gap-1">
                      <Loading03Icon className="animate-spin size-4" />
                      Saving...
                    </span>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            )}
          </form>
        </div>

        {/* Addresses */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#003d29]">Addresses</h2>
            <AddAddressModalButton />
          </div>
          <Separator />
          {isLoadingProfile ? (
            <p className="text-gray-500 text-center py-8">
              Loading addresses...
            </p>
          ) : !profileData?.addresses || profileData.addresses.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No addresses added yet.
            </p>
          ) : (
            <div className="space-y-4">
              {profileData.addresses.map((address) => (
                <AddressCard key={address._id!} address={address || {}} />
              ))}
            </div>
          )}
        </div>

        {/* Security */}
        {profileData?.isPasswordLogin && (
          <div className="bg-white p-6 rounded-xl border border-gray-100 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#003d29]">Security</h2>
              {!isEditPassword ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditPassword(true)}
                  className="text-[#003d29] hover:text-[#002a1c]"
                >
                  <Edit02Icon className="size-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleCancelPassword}
                  disabled={false}
                >
                  <Cancel01Icon className="size-4 mr-2" />
                  Cancel
                </Button>
              )}
            </div>
            <Separator />
            <form onSubmit={handleSubmitPassword(onPasswordSubmit)}>
              <div className="grid gap-6 max-w-md">
                <div>
                  <FloatingInput
                    id="current-password"
                    type="password"
                    label="Current Password"
                    {...registerPassword("current_password", {
                      required: isEditPassword
                        ? "Current password is required"
                        : false,
                    })}
                    disabled={!isEditPassword}
                    startIcon={<SecurityCheckIcon className="size-5" />}
                  />
                  {passwordErrors.current_password && (
                    <p className="text-red-500 text-sm mt-1">
                      {passwordErrors.current_password.message}
                    </p>
                  )}
                </div>
                <div>
                  <FloatingInput
                    id="new-password"
                    type="password"
                    label="New Password"
                    {...registerPassword("new_password", {
                      required: isEditPassword
                        ? "New password is required"
                        : false,
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    disabled={!isEditPassword}
                    startIcon={<SecurityCheckIcon className="size-5" />}
                  />
                  {passwordErrors.new_password && (
                    <p className="text-red-500 text-sm mt-1">
                      {passwordErrors.new_password.message}
                    </p>
                  )}
                </div>
                <div>
                  <FloatingInput
                    id="confirm-password"
                    type="password"
                    label="Confirm New Password"
                    {...registerPassword("confirm_password", {
                      required: isEditPassword
                        ? "Please confirm your password"
                        : false,
                      validate: (value) =>
                        value === newPassword || "Passwords do not match",
                    })}
                    disabled={!isEditPassword}
                    startIcon={<SecurityCheckIcon className="size-5" />}
                  />
                  {passwordErrors.confirm_password && (
                    <p className="text-red-500 text-sm mt-1">
                      {passwordErrors.confirm_password.message}
                    </p>
                  )}
                </div>
              </div>
              {isEditPassword && (
                <div className="mt-6">
                  <Button
                    type="submit"
                    disabled={updatePasswordMutation.isPending}
                    className="bg-[#003d29] hover:bg-[#002a1c] text-white"
                  >
                    {updatePasswordMutation.isPending ? (
                      <span className="flex items-center gap-1">
                        <Loading03Icon className="animate-spin size-4" />
                        Saving...
                      </span>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
