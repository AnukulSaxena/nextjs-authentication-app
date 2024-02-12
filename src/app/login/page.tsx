"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { axios } from "axios";


export default function LoginPage() {
    const [user, setUser] = useState({
        password: "",
        username: ""
    })

    const onLogin = async () => {

    }
    return (
        <div>
            <h1>Log In</h1>
            <hr />
            <label className="block" htmlFor="username">Username</label>
            <input
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="Username"
            />
            <label className="block" htmlFor="password">Password</label>
            <input
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Password"
            />

            <button
                className="block"
                onClick={onLogin}
            >
                Login
            </button>
            <Link className="block" href="/signup">Create new Account</Link>
        </div>
    )
}