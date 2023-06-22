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

  return (
    <div>
      <Flex>
        <Input
          value={amount}
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
          value={selectedCurrency}
          disabled={disabled}
          onChange={onChangeCurrency}
        >
          {currencyOptions.map((options, index: number) => {
            if (options == null) {
              options = "";
            } else {
              return (
                <Suspense fallback={<p>Loading...</p>}>
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
