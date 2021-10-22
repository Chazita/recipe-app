import React, { createContext, useState } from "react";
import { User } from "../types/User";

interface UserContext {
	user: User | undefined;
	setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export const UserContext = createContext<UserContext>({
	user: undefined,
	setUser: () => {},
});
