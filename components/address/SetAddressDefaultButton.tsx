import { useSetDefaultAddress } from "@/hooks";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";
import { Button } from "../ui/button";

const SetAddressDefaultButton = ({ addressId, text='Set as Default' }: { addressId: string; text?: string }) => {
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
      className="rounded-full bg-[#003d29] hover:bg-[#002a1c] hover:text-white text-white h-9 px-4 py-2 text-sm cursor-pointer"
      >
      {text}
    </Button>
  );
};
export default SetAddressDefaultButton;
