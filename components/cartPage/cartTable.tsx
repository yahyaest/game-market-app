"use client";
import React, { Key } from "react";
import { useRouter } from 'next/navigation';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Avatar,
} from "@nextui-org/react";
import { Cart, CartItem } from "@/models/cart";
import CartItemDetails from "./cartItemDetails";
import CartItemEdit from "./cartItemEdit";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "UNIT PRICE", uid: "unit price" },
  { name: "QUANTITY", uid: "quantity" },
  { name: "TOTAL PRICE", uid: "total price" },
  { name: "TOTAL PRICE AFTER DISCOUNT", uid: "total price after discount" },
  { name: "ACTIONS", uid: "actions" },
];

const DeleteIcon = () => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
  >
    <path
      d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M8.60834 13.75H11.3833"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M7.91669 10.4167H12.0834"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

type Props = {
  updateProductsCartItem: (cartItemId: string, payload:{quantity:number}) => Promise<any>;
  deleteProductsCartItem: (cartItemId: string) => Promise<any>;
  cart: Cart;
};

export default function CartTable({ cart, updateProductsCartItem, deleteProductsCartItem }: Props) {
  const router = useRouter();

  const renderCell = (cartItem: CartItem, columnKey: Key) => {
    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-row space-x-3">
            <Avatar
              src={cartItem.product.background_image}
              alt={cartItem.product.title}
            />
            <h1 className="mt-2">{cartItem.product.title} </h1>
          </div>
        );
      case "unit price":
        return <div>{cartItem.product.price.toFixed(1)} $</div>;
      case "quantity":
        return <div>{cartItem.quantity}</div>;
      case "total price":
        return <div>{cartItem.total_price.toFixed(1)} $</div>;
      case "total price after discount":
        return <div>{cartItem.total_price_after_discount.toFixed(1)} $</div>;
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <CartItemDetails cartItem={cartItem}/>
              </span>
            </Tooltip>
            <Tooltip content="Edit cart item">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <CartItemEdit cartItem={cartItem} updateProductsCartItem={updateProductsCartItem}/>
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete cart item">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => {
                  deleteProductsCartItem(cartItem?.id as string);
                  router.refresh()
                }}
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return <div></div>;
    }
  };

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={cart.items}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
