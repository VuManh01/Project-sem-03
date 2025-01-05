export interface BookPurchaseDTO {
  bookId: number;
  email: string;
  phoneNumber: string;
  fullName: string;
  deliveryAddress: string;
  discountId: number;
  totalPrice?: number;
}
