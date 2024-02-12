"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";


export default function LoginPage() {
    const router = useRouter()
    const [user, setUser] = useState({
        password: "",
        username: ""
    })
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)


    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user);
            router.push("/profile")
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (user.username.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])
    return (
        <div className="flex h-screen justify-center items-center">
            <div className="h-fit w-96 border border-white rounded-md p-10">
                <h1 className=" text-center py-2 text-lg font-bold">{loading ? "Logging In" : "Log In"}</h1>
                <hr className="mb-10" />
                <label className="block my-2 ps-2" htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    className="text-black w-full rounded-sm p-2"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="Username"
                />
                <label className="block my-2 ps-2" htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    className="text-black w-full rounded-sm p-2"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Password"
                />

                <button
                    className="block my-2 p-2 bg-blue-600 rounded-sm"
                    onClick={onLogin}
                >
                    {buttonDisabled ? "No Login" : "Login"}
                </button>
                <Link className="block text-center mt-10 underline" href="/signup">Don't have an Account ?</Link>
            </div>

        </div>
    )
}