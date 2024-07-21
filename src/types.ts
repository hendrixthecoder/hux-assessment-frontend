export interface User {
  email: string;
  lastName: string;
  firstName: string;
  phoneNumber: string;
  _id: string;
}

export interface Contact extends User {}
