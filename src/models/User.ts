export default interface User {
  user?: UserType;
  jwt: string;
}

export type UserType = {
  username: string;
  email: string;
  password: string;
};
