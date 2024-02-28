import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { CartItem } from "@/models/cart";

const EyeIcon = (props: any) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
    {...props}
  >
    <path
      d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

type Props = {
  cartItem: CartItem;
};

export default function CartItemDetails({ cartItem }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <EyeIcon onClick={onOpen} />
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="lg"
        classNames={{
          body: "py-6",
          backdrop: "bg-[#C70039]/50 backdrop-opacity-40",
          base: "border-[#C70039] bg-[#900C3F] dark:bg-[#900C3F] text-[#a8b0d3]",
          header: "border-b-[1px] border-[#C70039]",
          footer: "border-t-[1px] border-[#C70039]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                {cartItem.product.title}
              </ModalHeader>
              <ModalBody>
                <div className="w-full py-2">
                  <img
                    src={cartItem.product.background_image}
                    alt={cartItem.product.title}
                  />
                </div>
                <p>Game Price : {cartItem.product.price} $</p>
                <p>Quantity : {cartItem.quantity}</p>
                <p>Total Price : {cartItem.total_price} $</p>
                <p>Total Price After Discount: {cartItem.total_price_after_discount} $</p>

              </ModalBody>
              <ModalFooter>
                <Button color="foreground" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20"
                  onPress={onClose}
                >
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
