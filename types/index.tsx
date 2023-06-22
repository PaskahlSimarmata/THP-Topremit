export interface KursAPIResponse {
  base_code: string;
  conversion_rates: any;
  documentation: string;
  result: string;
  terms_of_use: string;
  time_last_update_unix: string;
  time_last_update_utc: string;
  time_next_update_unix: string;
  time_next_update_utc: string;
}

export interface FormValuesType {
  username: string;
  email: string;
  channel: string;
}

export interface AlertDialogRespone {
  cancelRef: any;
  isOpen: any;
  onClose: any;
  voucher:string;
  fromAmount:number;
  toAmount:any;
  via: string;
  toCurrency:string;
}

export interface FormResponse {
  currencyOptions: string[];
  selectedCurrency: string;
  onChangeCurrency: any;
  amount: number;
  onChangeAmount: any;
  disabled: boolean
}
