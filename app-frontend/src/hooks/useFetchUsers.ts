import axios from "axios";
import { useEffect, useState } from "react";

export type Users = {
    id: number;
    name: string;
    email: string;
    role: string;
    location: string;
};

type Status = {
    results: Users[] | null;
    message: string;
};

const useFetchUsers = () => {
    const [users, setUsers] = useState<Users[]>([]);
    const [error, setError] = useState<string | null>(null);

    // turn this into generics
    const fetchUsers = async (): Promise<Status> => {
        try {
            const res: Users[] = [];
            const response = await axios.get("http://localhost:3000/users");

            response.data.forEach((user: Users) => {
                res.push({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    location: user.location,
                });
            });

            return { results: res, message: "success" };
        } catch (err) {
            return { results: null, message: "failed" };
        }
    };

    useEffect(() => {
        const getAndSetUsers = async (): Promise<void> => {
            const res = await fetchUsers();

            if (res.results && res.message === "success") {
                setUsers([...res.results]);
            } else {
                setError(res.message);
            }
        };

        getAndSetUsers();
    }, []);

    return [users, error];
};

export default useFetchUsers;
