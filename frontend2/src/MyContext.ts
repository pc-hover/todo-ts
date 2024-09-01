import { createContext } from "react";

interface User {
    id: number,
    username: String
    password: String
    firstName: String
    lastName: String
}
interface UserContextType {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}


export const MyContext = createContext<UserContextType | undefined>(undefined);