export default interface User {
  user?: UserType;
  jwt: string;
}

type UserType = {
  username: string;
  email: string;
  password: string;
};
