import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteAddress } from "@/hooks";
import { useAuthStore } from "@/store/auth-store";
import { Delete01Icon, Loading03Icon } from "hugeicons-react";
import { toast } from "sonner";

const DeleteAddressAlertWithButton = ({ addressId }: { addressId: string }) => {
  const { token } = useAuthStore();

  const deleteAddressMutation = useDeleteAddress(token);

  const handleDeleteAddress = async (addressId: string) => {
    try {
      await deleteAddressMutation.mutateAsync(addressId);
      toast.success("Address deleted successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete address");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700 cursor-pointer"
          >
            <Delete01Icon className="size-4" />
          </Button>
        }
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Address?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this address? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDeleteAddress(addressId)}
            className="bg-red-600 hover:bg-red-700"
            disabled={deleteAddressMutation.isPending}
          >
            {deleteAddressMutation.isPending ? (
              <span className="flex items-center gap-1">
                <Loading03Icon className="animate-spin" />
                Deleting...
              </span>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAddressAlertWithButton;
