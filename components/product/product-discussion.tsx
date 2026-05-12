"use client";

import { useState, useMemo } from "react";
import { Message01Icon, Loading03Icon, ArrowUp01Icon, ArrowDown01Icon } from "hugeicons-react";
import { Button } from "@/components/ui/button";
import { useComments, useAddComment } from "@/hooks";
import { useAuthStore } from "@/store/auth-store";
import { useAuthModalStore } from "@/store/auth-modal-store";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Image from "next/image";

interface ProductDiscussionProps {
  productId: string;
}

export function ProductDiscussion({ productId }: ProductDiscussionProps) {
  const { isAuthenticated, token, user: currentUser } = useAuthStore();
  const { openAuthModal } = useAuthModalStore();

  const [page, setPage] = useState(1);
  const limit = 5;
  const { data: commentsData, isLoading } = useComments(productId, page, limit);
  const comments = commentsData?.data || [];
  const pagination = commentsData?.pagination;
  const addCommentMutation = useAddComment(token);

  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());

  const mainComments = useMemo(() => {
    return comments.filter(c => !c.parentId);
  }, [comments]);

  const getReplies = (parentId: string) => {
    return comments.filter(c => c.parentId === parentId).sort((a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  };

  const toggleReplies = (commentId: string) => {
    const newExpanded = new Set(expandedComments);
    if (newExpanded.has(commentId)) {
      newExpanded.delete(commentId);
    } else {
      newExpanded.add(commentId);
    }
    setExpandedComments(newExpanded);
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      openAuthModal();
      return;
    }

    try {
      await addCommentMutation.mutateAsync({
        productId,
        text: newComment,
      });
      toast.success("Comment posted!");
      setNewComment("");
    } catch (error: any) {
      toast.error(error.message || "Failed to post comment");
    }
  };

  const handleSubmitReply = async (commentId: string) => {
    if (!isAuthenticated) {
      openAuthModal();
      return;
    }

    try {
      await addCommentMutation.mutateAsync({
        productId,
        text: replyText,
        parentId: commentId,
      });
      toast.success("Reply posted!");
      setReplyText("");
      setReplyTo(null);
      // Auto expand to show the new reply
      const newExpanded = new Set(expandedComments);
      newExpanded.add(commentId);
      setExpandedComments(newExpanded);
    } catch (error: any) {
      toast.error(error.message || "Failed to post reply");
    }
  };

  return (
    <div className="space-y-8 py-8 border-t">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="flex-1 space-y-6 w-full">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Questions about this product</h2>
            <p className="text-gray-500">Ask questions  about this product.</p>
          </div>

          {/* Comments List */}
          <div className="space-y-6">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loading03Icon className="size-8 animate-spin text-[#003d29]" />
              </div>
            ) : mainComments.length > 0 ? (
              mainComments.map((comment) => {
                const replies = getReplies(comment._id);
                const isExpanded = expandedComments.has(comment._id);

                return (
                  <div key={comment._id} className="space-y-4">
                    <div className="bg-white rounded-xl border p-5 shadow-xs">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="size-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                          {comment?.user?.image ? (
                            <Image
                              src={comment.user.image}
                              alt={comment.user.first_name}
                              width={32}
                              height={32}
                              className="object-cover"
                            />
                          ) : (
                            <span className="text-gray-400 text-xs font-bold">
                              {comment?.user?.first_name?.[0]}
                            </span>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-sm text-gray-900">
                              {comment?.user?.first_name} {comment?.user?.last_name}
                            </h4>
                            {comment.isVendor && (
                              <span className="bg-[#003d29] text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                                OWNER
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-gray-400">
                            {new Date(comment.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {comment.text}
                      </p>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setReplyTo(replyTo === comment._id ? null : comment._id)}
                          className="text-xs font-medium text-[#003d29] hover:underline"
                        >
                          Reply
                        </button>
                        {replies.length > 0 && (
                          <button
                            onClick={() => toggleReplies(comment._id)}
                            className="text-xs font-medium text-gray-500 hover:text-gray-700 flex items-center gap-1 cursor-pointer"
                          >
                            {isExpanded ? <ArrowUp01Icon className="size-3" /> : <ArrowDown01Icon className="size-3" />}
                            {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
                          </button>
                        )}
                      </div>

                      {/* Reply Input */}
                      {replyTo === comment._id && (
                        <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-2">
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write your reply..."
                            className="w-full min-h-[80px] p-3 rounded-lg border border-gray-200 focus:ring-1 focus:ring-[#003d29] outline-none text-sm"
                            autoFocus
                          />
                          <div className="flex gap-2 justify-end">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setReplyTo(null)}
                              className="text-xs rounded-full"
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleSubmitReply(comment._id)}
                              disabled={addCommentMutation.isPending}
                              className="bg-[#003d29] hover:bg-[#002d1f] text-white text-xs rounded-full px-4"
                            >
                              {addCommentMutation.isPending ? <Loading03Icon className="size-3 animate-spin" /> : "Post Reply"}
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Replies */}
                    {isExpanded && replies.length > 0 && (
                      <div className="ml-8 space-y-4 border-l-2 border-gray-100 pl-4">
                        {replies.map((reply) => (
                          <div key={reply._id} className="bg-gray-50 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="size-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                {reply.user.image ? (
                                  <Image
                                    src={reply.user.image}
                                    alt={reply.user.first_name}
                                    width={24}
                                    height={24}
                                    className="object-cover"
                                  />
                                ) : (
                                  <span className="text-gray-500 text-[10px] font-bold">
                                    {reply.user.first_name[0]}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <h5 className="font-semibold text-xs text-gray-900">
                                  {reply.user.first_name} {reply.user.last_name}
                                </h5>
                                {reply.isVendor && (
                                  <span className="bg-[#003d29] text-white text-[8px] px-1.5 py-0.5 rounded-full font-medium">
                                    OWNER
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-gray-400">
                                {new Date(reply.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-gray-600 text-xs leading-relaxed">
                              {reply.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <Message01Icon className="size-12 mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">No discussions yet. Be the first to ask!</p>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {pagination && pagination.pages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-8 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-full px-4 border-gray-200 text-[#003d29] font-semibold disabled:opacity-50"
              >
                Previous
              </Button>
              
              <div className="flex items-center gap-1">
                {[...Array(pagination.pages)].map((_, i) => (
                  <Button
                    key={i + 1}
                    variant={page === i + 1 ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setPage(i + 1)}
                    className={cn(
                      "size-8 rounded-full p-0 text-sm font-bold",
                      page === i + 1 ? "bg-[#003d29] text-white hover:bg-[#003d29]" : "text-gray-500 hover:text-[#003d29]"
                    )}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
                disabled={page === pagination.pages}
                className="rounded-full px-4 border-gray-200 text-[#003d29] font-semibold disabled:opacity-50"
              >
                Next
              </Button>
            </div>
          )}
        </div>

        {/* Main Comment Form - Moved to Right */}
        <div className="w-full md:w-80 shrink-0 sticky top-24">
          <div className="bg-gray-50 p-6 rounded-xl space-y-4 border">
            <h3 className="font-bold text-gray-900">Post a comment</h3>
            <p className="text-xs text-gray-500">Your email address will not be published. Required fields are marked *</p>
            <form onSubmit={handleSubmitComment} className="space-y-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your question or comment...*"
                className="w-full min-h-[120px] p-4 rounded-lg bg-white border border-gray-200 focus:ring-2 focus:ring-[#003d29] focus:border-transparent outline-none resize-none text-sm"
                required
              />
              <Button
                type="submit"
                disabled={addCommentMutation.isPending}
                className="w-full bg-[#003d29] hover:bg-[#002d1f] text-white rounded-full py-6 font-semibold"
              >
                {addCommentMutation.isPending && !replyTo ? <Loading03Icon className="animate-spin" /> : "Post Comment"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
