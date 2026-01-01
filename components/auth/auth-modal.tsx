"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuthModalStore } from "@/store/auth-modal-store";
import LoginPage from "@/app/(auth)/login/page";

export function AuthModal() {
  const { isOpen, closeAuthModal } = useAuthModalStore();

  return (
    <Dialog open={isOpen} onOpenChange={closeAuthModal}>
      <DialogContent className="sm:max-w-md p-0! border-none!">
        <LoginPage onClose={() => closeAuthModal()}/>
      </DialogContent>
    </Dialog>
  );
}
