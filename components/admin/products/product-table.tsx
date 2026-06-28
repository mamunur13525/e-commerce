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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((product) => (
            <TableRow
              key={product._id}
              className="cursor-pointer"
              onClick={() => onViewDetails?.(product)}
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="bg-[#f7f7f7] w-10 h-10 rounded-md flex items-center justify-center overflow-hidden shrink-0">
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
              </TableCell>
              <TableCell className="text-gray-600">{product.category}</TableCell>
              <TableCell>
                <span className="font-medium">
                  ৳{product.final_price?.toFixed(2)}
                </span>
                {product.price > product.final_price && (
                  <span className="text-gray-400 line-through ml-2 text-xs">
                    ৳{product.price.toFixed(2)}
                  </span>
                )}
              </TableCell>
              <TableCell>
                <span
                  className={`font-medium ${
                    product.quantity <= 5 ? "text-red-500" : "text-gray-900"
                  }`}
                >
                  {product.quantity}
                </span>
              </TableCell>
              <TableCell>
                {product.discount > 0 ? (
                  <span className="text-green-600 font-medium">
                    {product.discount}%
                  </span>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(product);
                    }}
                  >
                    <Edit01Icon className="size-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger
                      render={
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={(e) => e.stopPropagation()}
                        >
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        page={page}
        totalPages={data.pagination.pages}
        total={data.pagination.total}
        onPageChange={onPageChange}
      />
    </div>
  );
}
