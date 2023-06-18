import User from "./user.model";

const isUserFound = async (id: string): Promise<boolean> => {
  const user = await User.findById(id);
  return !!user;
};

export default isUserFound;
