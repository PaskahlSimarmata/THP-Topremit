import { AlertDialogRespone } from "@/types";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
  fullName: string;
  bankAccount: string;
  country: string;
  norek: string;
  email: string;
  phone: string;
}

export default function DialogSend(props: AlertDialogRespone) {
  const form = useForm<FormData>();
  const {
    voucher,
    toCurrency,
    via,
    fromAmount,
    toAmount,
    cancelRef,
    isOpen,
    onClose,
  } = props;
  const { register, control, handleSubmit, formState, reset } = form;
  const { errors } = formState;
  const onSubmit = (data: FormData) => {
    const amountAfterAdmin = parseFloat(fromAmount) + 25000;
    const amount = {
      Exchange: toAmount,
      IDR: parseFloat(fromAmount),
      via: via,
      currency: toCurrency,
      afterAdmin: amountAfterAdmin,
    };
    const mergedObject = { ...data, amount };

    if (!localStorage.getItem("myData")) {
      localStorage.setItem("myData", "[]");
    }
    const old_data = JSON.parse(localStorage.getItem("myData") || "{}");
    old_data?.push(mergedObject);
    localStorage.setItem("myData", JSON.stringify(old_data));
    reset();
    onClose();
    // window.location.reload();
    toast.success("Berhasil Menambah Data!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Stack spacing={4}>
              <Heading
                marginBottom={4}
                color={"gray.800"}
                lineHeight={1.1}
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
              >
                Isi data penerima
                <Text
                  as={"span"}
                  marginLeft={"10px"}
                  bgGradient="linear(to-r, blue.400,blue.200)"
                  bgClip="text"
                >
                  !
                </Text>
              </Heading>
              <Box>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <Stack spacing={3}>
                    <Flex>
                      <Box paddingX={1}>
                        <Text>Full Name</Text>
                        <Input
                          placeholder="Full Name"
                          {...register("fullName", {
                            required: "Username is required",
                          })}
                        />
                        <Text color={"red.300"}>
                          {errors.fullName?.message}
                        </Text>
                      </Box>
                      <Box paddingX={1}>
                        <Text>Bank Penerima</Text>
                        {via == "Bank Account" ? (
                          <div>
                            <Input
                              placeholder="Bank Account"
                              {...register("bankAccount", {
                                required: "Bank Account is required",
                              })}
                            />
                            <Text color={"red.300"}>
                              {errors.bankAccount?.message}
                            </Text>
                          </div>
                        ) : (
                          <div>
                            <Input
                              placeholder="pengambilan uang"
                              {...register("bankAccount", {
                                required: "Lokasi Pengambilan Uang is required",
                              })}
                            />
                            <Text color={"red.300"}>
                              {errors.bankAccount?.message}
                            </Text>
                          </div>
                        )}
                      </Box>
                    </Flex>
                    <Flex>
                      <Box paddingX={1}>
                        <Text>No rekening</Text>
                        <Input
                          type="number"
                          placeholder="No Rekening"
                          {...register("norek", {
                            required: "Norek is required",
                          })}
                        />
                        <Text color={"red.300"}>{errors.norek?.message}</Text>
                      </Box>
                      <Box paddingX={1}>
                        <Text>Country</Text>
                        <Input
                          placeholder="Country"
                          {...register("country", {
                            required: "Country is required",
                          })}
                        />
                        <Text color={"red.300"}>{errors.country?.message}</Text>
                      </Box>
                    </Flex>
                    <Flex>
                      <Box paddingX={1}>
                        <Text>Email Penerima</Text>
                        <Input
                          placeholder="email"
                          {...register("email", {
                            required: "email is required",
                            pattern: {
                              value:
                                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                              message: "Invalid email address",
                            },
                          })}
                        />
                        <Text color={"red.300"}>{errors.email?.message}</Text>
                      </Box>
                      <Box paddingX={1}>
                        <Text>Phone Number penerima</Text>
                        <Input
                          type="number"
                          placeholder="Phone Number"
                          {...register("phone", {
                            required: "Phone Number is required",
                          })}
                        />
                        <Text color={"red.300"}>{errors.phone?.message}</Text>
                      </Box>
                    </Flex>

                    <Text>Total dana Sebelum Admin</Text>
                    <Input
                      type="text"
                      name="dana"
                      disabled
                      value={`IDR ${fromAmount}`}
                      placeholder="Bank Account"
                    />
                    <Text>Total dana Currency</Text>
                    <Input
                      type="text"
                      name="dana"
                      disabled
                      value={`${toCurrency} ${toAmount}`}
                      placeholder="Bank Account"
                    />
                    <Text>Total dana Dengan Admin</Text>
                    <Input
                      type="text"
                      name="dana"
                      disabled
                      value={`IDR ${parseFloat(fromAmount) + 25000}`}
                      placeholder="Bank Account"
                    />
                    {voucher ? (
                      <>
                        <Text>Total dana Setelah Voucher</Text>
                        <Input
                          type="text"
                          name="dana"
                          disabled
                          value={`IDR ${voucher}`}
                          placeholder="Bank Account"
                        />
                      </>
                    ) : (
                      <></>
                    )}
                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onClose}>
                        No
                      </Button>
                      <Button type="submit" colorScheme="blue" ml={3}>
                        Continue
                      </Button>
                    </AlertDialogFooter>
                  </Stack>
                </form>
              </Box>
            </Stack>
          </AlertDialogBody>
        </AlertDialogContent>
        <DevTool control={control} />
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
        {/* Same as */}
        <ToastContainer />
      </AlertDialog>
    </div>
  );
}
