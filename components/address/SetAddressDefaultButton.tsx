import { useSetDefaultAddress } from "@/hooks";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";
import { Button } from "../ui/button";

const SetAddressDefaultButton = ({ addressId }: { addressId: string }) => {
  const { token } = useAuthStore();

  const setDefaultAddressMutation = useSetDefaultAddress(token);

  const handleSetDefault = async (addressId: string) => {
    try {
      await setDefaultAddressMutation.mutateAsync(addressId);
      toast.success("Default address updated!");
    } catch (error: any) {
      toast.error(error.message || "Failed to set default address");
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => handleSetDefault(addressId)}
      disabled={setDefaultAddressMutation.isPending}
      className="text-gray-500 hover:text-[#003d29] cursor-pointer"
    >
      Set as Default
    </Button>
  );
};
export default SetAddressDefaultButton;
