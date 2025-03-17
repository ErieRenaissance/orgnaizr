export interface Address {
  street: string;
  unit?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface AddressFormData extends Address {
  label?: string;
  isDefault?: boolean;
}