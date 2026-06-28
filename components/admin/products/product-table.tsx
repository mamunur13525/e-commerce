"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit01Icon, Delete01Icon } from "hugeicons-react";
import { AdminProduct, PaginatedResponse } from "@/hooks/api/admin";
import Image from "next/image";

interface ProductTableProps {
  data: PaginatedResponse<AdminProduct> | undefined;
  isLoading: boolean;
  page: number;
  onPageChange: (page: number) => void;
  onEdit: (product: AdminProduct) => void;
  onDelete: (id: string) => void;
  onViewDetails?: (product: AdminProduct) => void;
}

export function ProductTable({
  data,
  isLoading,
  page,
  onPageChange,
  onEdit,
  onDelete,
  onViewDetails,
}: ProductTableProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-6 space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-12 text-center">
          <p className="text-gray-500">No products found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left py-3 px-4 font-medium text-gray-500">
                Name
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">
                Category
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">
                Price
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">
                Stock
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">
                Discount
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((product) => (
              <tr
                key={product._id}
                className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer"
              >
                <td onClick={() => onViewDetails?.(product)} className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#f7f7f7] w-10 h-10 rounded-md flex items-center justify-center overflow-hidden">
                      {product.image?.url && (
                        <Image
                          src={product.image.url}
                          alt={product.name}
                          className="w-10 h-10 rounded-md object-cover"
                          width={40}
                          height={40}
                        />
                      )}
                    </div>
                    <span className="font-medium text-gray-900">
                      {product.name}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-600">{product.category}</td>
                <td className="py-3 px-4">
                  <span className="font-medium">
                    ৳{product.final_price?.toFixed(2)}
                  </span>
                  {product.price > product.final_price && (
                    <span className="text-gray-400 line-through ml-2 text-xs">
                      ৳{product.price.toFixed(2)}
                    </span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`font-medium ${product.quantity <= 5 ? "text-red-500" : "text-gray-900"
                      }`}
                  >
                    {product.quantity}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {product.discount > 0 ? (
                    <span className="text-green-600 font-medium">
                      {product.discount}%
                    </span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => onEdit(product)}
                    >
                      <Edit01Icon className="size-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger
                        render={
                          <Button variant="ghost" size="icon-sm">
                            <Delete01Icon className="size-4 text-red-500" />
                          </Button>
                        }
                      />
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Product</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete{" "}
                            <span className="font-bold text-black">
                              &ldquo;{product.name}&rdquo;
                            </span>
                            ? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onDelete(product._id)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data.pagination.pages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Page {data.pagination.page} of {data.pagination.pages} (
            {data.pagination.total} total)
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => onPageChange(Math.max(1, page - 1))}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={!data.pagination.hasMore}
              onClick={() => onPageChange(page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
