import { create } from "zustand";
import { IUser } from "@interfaces/user.interface";
import userService from "@services/user.service";
import { handleHttpError } from "@utils/errors/handle-http.error";

interface IUseUserStore {
  users: IUser[];
  isLoading: boolean;
  error: null | unknown;
  fetchUsers: () => void;
  fetchUserById: (id: string) => Promise<IUser | null>;
  fetchUserByUsername: (username: string) => Promise<IUser | null>;
  fetchUserByEmail: (email: string) => Promise<IUser | null>;
  fetchUserByPhone: (phone: string) => Promise<IUser | null>;
  createUser: (user: Partial<IUser>) => Promise<IUser>;
  updateUser: (id: string, user: Partial<IUser>) => Promise<IUser>;
  deleteUser: (id: string) => void;
}

const useUserStore = create<IUseUserStore>((set) => ({
  users: [],
  isLoading: false,
  error: null,

  fetchUsers: () => {
    set({ isLoading: true, error: null });
    userService
      .findAll()
      .then((users) => set({ users }))
      .catch((error) => {
        handleHttpError(error, "Ошибка при загрузке списка пользователей");
        set({ error });
      })
      .finally(() => set({ isLoading: false }));
  },

  fetchUserById: (id: string) => {
    set({ isLoading: true, error: null });
    return userService
      .findById(id)
      .then((user) => user)
      .catch((error) => {
        handleHttpError(error, "Ошибка при загрузке пользователя");
        set({ error });
        return null;
      })
      .finally(() => set({ isLoading: false }));
  },

  fetchUserByUsername: (username: string) => {
    set({ isLoading: true, error: null });
    return userService
      .findByUsername(username)
      .then((user) => user)
      .catch((error) => {
        handleHttpError(error, "Ошибка при поиске пользователя по имени");
        set({ error });
        return null;
      })
      .finally(() => set({ isLoading: false }));
  },

  fetchUserByEmail: (email: string) => {
    set({ isLoading: true, error: null });
    return userService
      .findByEmail(email)
      .then((user) => user)
      .catch((error) => {
        handleHttpError(error, "Ошибка при поиске пользователя по email");
        set({ error });
        return null;
      })
      .finally(() => set({ isLoading: false }));
  },

  fetchUserByPhone: (phone: string) => {
    set({ isLoading: true, error: null });
    return userService
      .findByPhone(phone)
      .then((user) => user)
      .catch((error) => {
        handleHttpError(error, "Ошибка при поиске пользователя по телефону");
        set({ error });
        return null;
      })
      .finally(() => set({ isLoading: false }));
  },

  createUser: (user: Partial<IUser>) => {
    set({ isLoading: true, error: null });
    return userService
      .create(user)
      .then((newUser) => {
        set((state) => ({ users: [...state.users, newUser] }));
        return newUser;
      })
      .catch((error) => {
        handleHttpError(error, "Ошибка при создании пользователя");
        set({ error });
        return null;
      })
      .finally(() => set({ isLoading: false }));
  },

  updateUser: (id: string, user: Partial<IUser>) => {
    set({ isLoading: true, error: null });
    return userService
      .update(id, user)
      .then((updatedUser) => {
        set((state) => ({
          users: state.users.map((u) => (u.id === id ? updatedUser : u))
        }));
        return updatedUser;
      })
      .catch((error) => {
        handleHttpError(error, "Ошибка при обновлении пользователя");
        set({ error });
        return null;
      })
      .finally(() => set({ isLoading: false }));
  },

  deleteUser: (id: string) => {
    set({ isLoading: true, error: null });
    userService
      .remove(id)
      .then(() => {
        set((state) => ({
          users: state.users.filter((u) => u.id !== id)
        }));
      })
      .catch((error) => {
        handleHttpError(error, "Ошибка при удалении пользователя");
        set({ error });
      })
      .finally(() => set({ isLoading: false }));
  }
}));

export default useUserStore;
