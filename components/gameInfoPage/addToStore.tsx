"use client";
import React, { useMemo, useState } from "react";
import { Game } from "@/models/game";
import { Collection } from "@/models/collection";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import Datepicker from "tailwind-datepicker-react";

const datePickerOptions = {
  title: "Expiration Date",
  autoHide: true,
  todayBtn: false,
  clearBtn: true,
  clearBtnText: "Clear",
  maxDate: new Date("2030-01-01"),
  minDate: new Date("1950-01-01"),
  theme: {
    background: "bg-gray-700 dark:bg-gray-800",
    todayBtn: "",
    clearBtn: "",
    icons: "",
    text: "",
    disabledText: "bg-red-700",
    input: "",
    inputIcon: "",
    selected: "",
  },
  icons: {
    // () => ReactElement | JSX.Element
    prev: () => <span className="text-xs">Previous</span>,
    next: () => <span className="text-xs">Next</span>,
  },
  datepickerClassNames: "top-12",
  defaultDate: new Date(),
  language: "en",
  disabledDates: [],
  weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  inputNameProp: "date",
  inputIdProp: "date",
  inputPlaceholderProp: "Select Date",
  inputDateFormatProp: {
    day: "numeric",
    month: "long",
    year: "numeric",
  },
};

type Props = {
  addGameToStore: (
    gameInfo: Game,
    productInfo: any,
    promotions: any
  ) => Promise<any>;
  gameInfo: Game;
  storeCollection: any[];
};

export default function AddToStore({
  addGameToStore,
  gameInfo,
  storeCollection,
}: Props) {
  const [productPrice, setProductPrice] = useState(0);
  const [productInventory, setProductInventory] = useState(1);
  const [productPromotion, setProductPromotion] = useState(0);
  const [productPromotionExpirationDate, setProductPromotionExpirationDate] =
    useState(new Date());
  const [productCollectionId, setProductCollectionId] = useState(1);
  const [selectedKeys, setSelectedKeys] = useState(new Set(["Games"]));
  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  const [promotionSelectedKeys, setPromotionSelectedKeys] = useState(
    new Set(["0"])
  );
  const promotionSelectedValue = useMemo(
    () => Array.from(promotionSelectedKeys).join(", ").replaceAll("_", " "),
    [promotionSelectedKeys]
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [show, setShow] = useState<boolean>(false);
  const handleChange = (selectedDate: Date) => {
    setProductPromotionExpirationDate(selectedDate);
  };
  const handleClose = (state: boolean) => {
    setShow(state);
  };

  const postProduct = (gameInfo: Game) => {
    const productInfo: {
      price: number;
      inventory: number;
      collection: number;
    } = {
      price: productPrice,
      inventory: productInventory,
      collection: productCollectionId,
    };

    const promotions = [
      {
        discount: productPromotion,
        description: `Discount of ${productPromotion} % for game ${gameInfo.title}`,
        expire_at: productPromotionExpirationDate,
      },
    ];
    addGameToStore(gameInfo as Game, productInfo, promotions);
  };
  return (
    <div className="text-center my-2">
      <Button
        radius="full"
        className="bg-gradient-to-tr from-blue-500 to-green-500 text-white shadow-lg"
        onPress={onOpen}
      >
        Add to Store
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
        style={{ minHeight: "0px" }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Game To Store
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Price"
                  placeholder="Enter game price"
                  type="number"
                  variant="bordered"
                  min="1"
                  className="my-1"
                  onChange={(e) => setProductPrice(+e.target.value)}
                />
                <Input
                  label="Inventory"
                  placeholder="Enter game inventory"
                  type="number"
                  variant="bordered"
                  min="1"
                  className="my-1"
                  onChange={(e) => setProductInventory(+e.target.value)}
                />
                <h1>Collection</h1>
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="bordered" className="capitalize">
                      {selectedValue}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Single selection example"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedKeys}
                    onSelectionChange={setSelectedKeys}
                  >
                    {storeCollection.map((collection: Collection) => (
                      <DropdownItem
                        key={collection.title}
                        onClick={() => setProductCollectionId(collection.id)}
                      >
                        {collection.title}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                <h1>Promotion Discount</h1>
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="bordered" className="capitalize">
                      {promotionSelectedValue} %
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Single selection example"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={promotionSelectedKeys}
                    onSelectionChange={setPromotionSelectedKeys}
                  >
                    {[0, 5, 10, 20, 30, 40, 50, 60, 70].map((value: number) => (
                      <DropdownItem
                        key={value}
                        onClick={() => setProductPromotion(value)}
                      >
                        {value} %
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                <h1>Promotion Expiration Date</h1>
                <Datepicker
                  options={datePickerOptions}
                  onChange={handleChange}
                  show={show}
                  setShow={handleClose}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  onClick={() => postProduct(gameInfo as Game)}
                >
                  Post
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
