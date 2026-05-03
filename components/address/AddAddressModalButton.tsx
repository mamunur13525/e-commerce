import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Add01Icon } from "hugeicons-react";
import CreateAddressFormDialog from "../dialoge/CreateAddressFormDialog";
import { useState } from "react";

const AddAddressModalButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        render={
          <Button
            type="button"
            className="bg-[#003d29] hover:bg-[#002a1c] text-white"
          >
            <Add01Icon className="size-4 mr-2" />
            Add Address
          </Button>
        }
      />
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Address</DialogTitle>
        </DialogHeader>
        <CreateAddressFormDialog onCancel={() => setIsDialogOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default AddAddressModalButton;
