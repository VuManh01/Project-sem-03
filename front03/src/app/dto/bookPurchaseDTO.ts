export interface BookPurchaseDTO {
  bookId: number;
  email: string;
  phone_number: string;
  full_name: string;
  delivery_address: string;
  discountId: number;
  total_price?: number;
}
