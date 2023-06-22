"use client";
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  Spacer,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Icon,
  Select,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { Blur } from "./blur";
import React, { useEffect, useState } from "react";
import { KursAPIResponse } from "../types/index";
import Form from "./Form";
import DialogSend from "./dialogSend";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
const BASE_API =
  "https://v6.exchangerate-api.com/v6/21ddb6efc4a44cc28f1e8e03/latest/IDR";

interface FormData {
  voucher: string;
}

export default function JoinOurTeam() {
  const form = useForm<FormData>();
  const { register, control, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<any>();
  const [voucher, setVoucher] = useState<string>("");
  const [voucherAmount, setVoucherAmount] = useState<number>(0)
  const [currencyOption, setcurrencyOption] = useState<any>([]);
  const [fromCurrency, setFromCurrency] = useState<any>(null);
  const [toCurrency, setToCurrency] = useState<any>(null);
  const [amount, setAmount] = useState<number>(1);
  const [exchangeRate, setExchangerRate] = useState<number>(0);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [via, setVia] = useState<string>("");
  let toAmount, fromAmount, danaAfterAdmin;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }
  const getRates = async () => {
    const response = await fetch(BASE_API);
    const data: KursAPIResponse = await response.json();
    const firstCurency = Object.keys(data.conversion_rates)[0];
    setcurrencyOption([data.base_code, ...Object.keys(data.conversion_rates)]);
    setFromCurrency(data.base_code);
    setToCurrency(firstCurency);
    setExchangerRate(data.conversion_rates[firstCurency]);
  };

  const handleFromAmountChanges = (e:any) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  };
  const handleToAmountChanges = (e:any) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  };

  const handleOptionChange = (e:any) => {
    setVia(e.target.value);
  };

  const toastError = () => {
    toast.error("Please fill all the data", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

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
  const onSubmit = () => {
    if (voucher == "Hari Baik") {
      toast.success("Voucher berhasil digunakan!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setVoucherAmount(parseFloat(fromAmount)+20000)
    } else {
      toast.error("Voucher Salah!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const onChange = (e) => {
    setVoucher(e.target.value);
    console.log(voucher);
  };
  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(
        `https://v6.exchangerate-api.com/v6/21ddb6efc4a44cc28f1e8e03/latest/${fromCurrency}`
      )
        .then((res) => res.json())
        .then((data) => setExchangerRate(data.conversion_rates[toCurrency]));
    } else {
      getRates();
    }
    console.log(via);
  }, [fromCurrency, via, toCurrency]);
  return (
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          >
            <Text
              as={"span"}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
            ></Text>
            Transfer money abroad from Indonesia cheaper & faster
          </Heading>
        </Stack>
        <Stack
          bg={"white"}
          boxShadow={"2xl"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
        >
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              Transfer
              <Text
                as={"span"}
                marginLeft={"10px"}
                bgGradient="linear(to-r, blue.400,blue.200)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
          </Stack>

          {"if you want to transfer via Bank Account ! "}
          <Box as={"form"} mt={3}>
            <Stack spacing={4}>
              <Form
                selectedCurrency={fromCurrency}
                amount={fromAmount}
                currencyOptions={currencyOption}
                disabled={true}
                onChangeCurrency={(e: any) => setFromCurrency(e.target.value)}
                onChangeAmount={handleFromAmountChanges}
              />
              <Form
                selectedCurrency={toCurrency}
                amount={toAmount}
                currencyOptions={currencyOption}
                disabled={false}
                onChangeAmount={handleToAmountChanges}
                onChangeCurrency={(e: any) => setToCurrency(e.target.value)}
              />
              <Box
                boxShadow={"md"}
                px={{ base: "5px", md: "20px" }}
                py={3}
                rounded={"full"}
              >
                {toAmount !== 0 && (
                  <Flex>
                    <Text>Rate</Text>
                    <Spacer />
                    <Text>
                      {toAmount / toAmount} {toCurrency} = {1 / exchangeRate}{" "}
                      {fromCurrency}
                    </Text>
                  </Flex>
                )}
              </Box>
              <Flex marginTop={3}>
                <RadioGroup>
                  <Stack direction="row">
                    <Radio
                      checked={via === "Bank Account"}
                      onChange={handleOptionChange}
                      value="Bank Account"
                    >
                      Bank Account
                    </Radio>
                    <Radio
                      checked={via === "Cash Pickup"}
                      onChange={handleOptionChange}
                      value="Cash Pickup"
                    >
                      Cash PickUp
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Flex>
              <Flex justifyContent={"space-between"}>
                <Box>
                  <Text>Biaya Admin </Text>
                  <Text>Rp 25.000 </Text>
                </Box>
                <Box>
                  <Text>Biaya Total </Text>
                  <Text>
                    {fromCurrency}{" "}
                    {formatNumber(parseFloat(fromAmount) + 25000)}
                  </Text>
                </Box>
              </Flex>
              <Box>
                <Flex>
                  <Text>Voucher</Text>
                  <Text color={"red.300"}> *optional</Text>
                </Flex>
                <form>
                  <Flex>
                    <Input
                      onChange={onChange}
                      placeholder="vouchernya = hari baik"
                    />
                    <Button onClick={onSubmit} marginLeft={1}>
                      Check
                    </Button>
                  </Flex>
                </form>
              </Box>
            </Stack>
            {via !== "" ? (
              <Button
                onClick={onOpen}
                fontFamily={"heading"}
                mt={8}
                w={"full"}
                bgGradient="linear(to-r, blue.200,blue.500)"
                color={"white"}
                _hover={{
                  bgGradient: "linear(to-r, blue.400,blue.400)",
                  boxShadow: "xs",
                }}
              >
                Continue
              </Button>
            ) : (
              <Button
                onClick={toastError}
                fontFamily={"heading"}
                mt={8}
                w={"full"}
                bgGradient="linear(to-r, blue.200,blue.500)"
                color={"white"}
                _hover={{
                  bgGradient: "linear(to-r, blue.400,blue.400)",
                  boxShadow: "xs",
                }}
              >
                Continue
              </Button>
            )}
          </Box>
        </Stack>
      </Container>
      <Blur
        position={"absolute"}
        zIndex={-1}
        top={-5}
        left={-5}
        style={{ filter: "blur(50px)" }}
      />
      <DialogSend
        toCurrency={toCurrency}
        via={via}
        fromAmount={fromAmount}
        voucher = {voucherAmount}
        toAmount={toAmount}
        cancelRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
      />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Box>
  );
}
