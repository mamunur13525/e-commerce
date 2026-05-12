"use client";

import { useState } from "react";
import { StarIcon, Loading03Icon } from "hugeicons-react";
import { Button } from "@/components/ui/button";
import { useAddReview } from "@/hooks";
import { useAuthStore } from "@/store/auth-store";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProductReviewModalProps {
  productId: string;
  productName: string;
}

export function ProductReviewModal({ productId, productName }: ProductReviewModalProps) {
  const { token } = useAuthStore();
  const addReviewMutation = useAddReview(token);

  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addReviewMutation.mutateAsync({
        productId,
        rating,
        comment,
      });
      toast.success("Review submitted successfully!");
      setIsOpen(false);
      setComment("");
      setRating(5);
    } catch (error: any) {
      toast.error(error.message || "Failed to submit review");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="rounded-full text-xs h-8">
          Review Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Review {productName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <StarIcon
                    className={cn(
                      "size-8 transition-all",
                      star <= rating ? "text-yellow-400 fill-yellow-400 scale-110" : "text-gray-200"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Your Experience</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What did you like or dislike about this product?"
              className="w-full min-h-[120px] p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#003d29] focus:border-transparent outline-none resize-none text-sm"
              required
            />
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={() => setIsOpen(false)}
              className="rounded-full"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={addReviewMutation.isPending}
              className="bg-[#003d29] hover:bg-[#003d29] text-white rounded-full px-8"
            >
              {addReviewMutation.isPending ? <Loading03Icon className="animate-spin" /> : "Submit Review"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
