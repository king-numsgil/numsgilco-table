import {state} from "@bit-about/state";
import {useState} from "react";

export type UserInfo = {
    id: number;
    email: string;
}

export const [StoreProvider, useStore, store] = state(() => {
    const [user, setUser] = useState<UserInfo | null>(null);

    return {
        user,
        setUser,
    };
});
