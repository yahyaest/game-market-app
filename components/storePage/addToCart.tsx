"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Chip,
} from "@nextui-org/react";

import { FaCartPlus } from "react-icons/fa6";

type Props = {
  postOrUpdateCart: (quantity: number) => Promise<any>;
  gameInventory: number;
  gamePrice: number;
};

export default function AddToCart({
  postOrUpdateCart,
  gameInventory,
  gamePrice,
}: Props) {
  const [quantity, setQuantity] = useState(1);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="text-center w-full">
      <Button
        className=" my-1 w-full"
        color="danger"
        endContent={<FaCartPlus />}
        onPress={onOpen}
      >
        Add to Cart
      </Button>

      <Modal
        backdrop="opaque"
        radius="lg"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
        className="w-80 sm:w-full"
        style={{ minHeight: "0px" }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Game To Cart
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Quantity"
                  placeholder="Choose quantity"
                  type="number"
                  variant="bordered"
                  min="1"
                  max={gameInventory}
                  className="my-1"
                  onChange={(e) => setQuantity(+e.target.value)}
                />

                <p>Price : {gamePrice * quantity} $ </p>
                {quantity > gameInventory ? (
                  <Chip color="danger" variant="flat">
                    There is only {gameInventory} games in stock
                  </Chip>
                ) : null}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  onClick={() => postOrUpdateCart(quantity)}
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}