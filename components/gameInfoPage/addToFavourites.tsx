"use client";
import React, { useMemo, useState } from "react";
import Cookies from "js-cookie";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { User } from "@/models/user";

type Props = {
  addToFavouriteGames: (gameStatus: string, user : User) => Promise<any>;
};

export default function AddToFavourites({ addToFavouriteGames }: Props) {
  const [show, setShow] = useState<boolean>(true);
  const [selectedKeys, setSelectedKeys] = useState(new Set(["Planned"]));
  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  return (
    <div className="flex flex-wrap gap-4">
      {show ? (
        <Popover showArrow offset={10} placement="bottom" backdrop="blur">
          <PopoverTrigger>
            <Button
              radius="full"
              className="bg-gradient-to-tr from-red-500 to-yellow-500 text-white shadow-lg"
            >
              Add to Favourite
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[240px]">
            <div className="px-1 py-2 w-full">
              <p className="text-small font-bold text-foreground py-2">
                Game Status
              </p>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered" className="w-full capitalize">
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
                  {[
                    "Finshed",
                    "Planned",
                    "Playing",
                    "Dropped",
                    "Postponed",
                  ].map((value: string) => (
                    <DropdownItem key={value}>{value}</DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Button
                color="warning"
                variant="flat"
                className="capitalize my-2"
                onClick={() => {
                  const user : User = JSON.parse(Cookies.get("user") as string)
                  addToFavouriteGames(selectedValue, user);
                  setShow(false);
                }}
              >
                Add
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <></>
      )}
    </div>
  );
}
