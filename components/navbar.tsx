"use client";
import React, { ReactNode } from "react";
import Topremitlogo from "../assets/topRemitLogo.png";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import HistoryPayment from "./historyPayment";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<any>();

  return (
    <>
      <Box
        bg={useColorModeValue("white", "gray.900")}
        px={{ base: "10px", xl: "200px" }}
      >
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Button backgroundColor={"white"} fontSize={{base:"10px", md:"15px"}} rounded={"lg"} color={"blue.300"}>
              Paskahl Herbert simarmata
            </Button>
            <Button
              backgroundColor={"white"}
              fontSize={"10px"}
              rounded={"lg"}
              color={"gray.600"}
              onClick={onOpen}
            >
              History Payment
            </Button>
        </Flex>
      </Box>
      <Box backgroundColor={"blue.900"} py={1}>
        <Text textAlign={"center"} color={"white"} fontSize={"xs"}>
          China & Hong Kong will be on holiday from the 22nd - 24th of June
          2023. We'll continue to process your transactions to these countries
          on the next banking day
        </Text>
      </Box>
      <HistoryPayment cancelRef={cancelRef} onClose={onClose} isOpen={isOpen} />
    </>
  );
}
