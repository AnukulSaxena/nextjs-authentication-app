"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { axios } from "axios";


export default function SignupPage() {
    const [user, setUser] = useState({
        password: "",
        username: ""
    })

    const onSignup = async () => {

    }
    return (
        <div>
            <h1>Sign Up</h1>
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
                onClick={onSignup}
            >
                Signup
            </button>
            <Link className="block" href="/login">Already have an Account</Link>
        </div>
    )
}