"use client";
import { FormResponse } from "@/types";
import { Select, Input, Flex } from "@chakra-ui/react";
import React, { Suspense } from "react";

export default function Form(props: FormResponse) {
  const {
    disabled,
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    amount,
    onChangeAmount,
  } = props;
  const currency = selectedCurrency || "";
  return (
    <div>
      <Flex>
        <Input
          value={amount}
          size={'lg'}
          onChange={onChangeAmount}
          placeholder="you send in IDR"
          border={"1px"}
          borderColor={"gray.200"}
          type="number"
          color={"gray.500"}
          _placeholder={{
            color: "gray.500",
          }}
        />
        <Select
          size={"lg"}
          maxWidth={"100px"}
          value={currency}
          disabled={disabled}
          onChange={onChangeCurrency}
        >
          {currencyOptions.map((options, index: number) => {
            if (options == null) {
              options = "";
            } else {
              return (
                <Suspense key={index} fallback={<p>Loading...</p>}>
                  <option value={options} key={index}>
                    {options}
                  </option>
                </Suspense>
              );
            }
          })}
        </Select>
      </Flex>
    </div>
  );
}
