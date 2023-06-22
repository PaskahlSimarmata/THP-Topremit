import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
} from "@chakra-ui/react";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

import React, { Suspense, useEffect, useState } from "react";

export default function HistoryPayment(props: any) {
  const { cancelRef, isOpen, onClose } = props;
  const [localData, setLocalData] = useState<any>([]);
  useEffect(() => {
    // setLocalData(JSON.parse(localStorage.getItem('myData')||"[]"))
    // console.log(localData);
    const fetchData = async () => {
      const response = await JSON.parse(localStorage.getItem("myData") || "[]");
      setLocalData(response);
    };
    fetchData();
  }, [localStorage.getItem("myData")]);
  const formatNumber = (number: number) => {
    const numberStr = number.toString();
    const reversedStr = numberStr.split("").reverse().join("");
    let formattedStr = "";
    for (var i = 0; i < reversedStr.length; i++) {
      formattedStr += reversedStr[i];
      if ((i + 1) % 3 === 0 && i + 1 !== reversedStr.length) {
        formattedStr += ",";
      }
    }
    formattedStr = formattedStr.split("").reverse().join("");
    return formattedStr;
  };
  return (
    <div>
      <AlertDialog
        size={"4xl"}
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              History Payment
            </AlertDialogHeader>

            <AlertDialogBody>
              <TableContainer>
                <Table variant="simple">
                  <TableCaption>
                    Imperial to metric conversion factors
                  </TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Name</Th>
                      <Th>Email</Th>
                      <Th>Phone</Th>
                      <Th>Exchange</Th>
                      <Th>Rupiah</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {localData.map((data: any, index: number) => {
                      return (
                        <Suspense key={index} fallback={<p>Loading...</p>} >
                          <Tr key={index}>
                            <Td key={index}>{data.fullName}</Td>
                            <Td key={index}>{data.email}</Td>
                            <Td key={index}>{data.phone}</Td>
                            <Td key={index}> {data.amount.currency} { formatNumber(data.amount.Exchange.toFixed(0))}</Td>
                            <Td key={index}>IDR { formatNumber(data.amount.IDR)}</Td>
                          </Tr>
                        </Suspense>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
}
