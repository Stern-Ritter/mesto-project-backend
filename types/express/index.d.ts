type TUser = {
  _id: String;
};

declare namespace Express {
  interface Request {
    user: TUser;
  }
}
