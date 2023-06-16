import { IUser } from "./user.interface";
import User from "./user.model";

const signup = async (payload: IUser): Promise<IUser | null> => {
  const data = await User.create(payload);
  return data;
};

const getAllUsers = async (): Promise<IUser[] | null> => {
  const data = await User.find();
  return data;
};

const getUser = async (id: string): Promise<IUser | null> => {
  const data = await User.findById(id);
  return data;
};

const updateUser = async (_id: string, payload: IUser): Promise<IUser | null> => {
  const data = await User.findOneAndUpdate({ _id }, payload, {
    new: true,
    runValidators: true,
  });
    
  return data;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  const data = await User.findByIdAndDelete(id);
  return data;
};

export const UserService = {
  signup,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};