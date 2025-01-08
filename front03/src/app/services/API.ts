export const API = {
  LOGIN: 'api/Auth/login',
  LOGOUT: 'api/Account/logout',
  REGISTER: 'api/Account/register',

  //Payment
  PURCHASE_MEMBERSHIP: 'api/Payment/purchase-membership',
  PURCHASE_BOOK: 'api/Payment/purchase-book',

  CHECK_MEMBERSHIP: 'api/Payment/check-membership',
  CHECK_BOOK: 'api/Payment/check-book',

  //membership service
  GET_MEMBERSHIP: 'api/MembershipService',

  //Book
  //get 1 book
  GET_LIMIT_1_BOOK: 'api/Book/limit/1',

  //discount
  //get discount by name
  GET_DISCOUNT_BY_NAME: 'api/Discount/FindByName',
}
