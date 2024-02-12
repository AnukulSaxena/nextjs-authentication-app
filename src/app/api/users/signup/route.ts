import { connect } from "@/dbConfig/dbConfig"
import User from "@/model/user.model"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"





connect()


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { username, password } = reqBody

        if (!username?.trim() || !password?.trim()) {
            return NextResponse.json({ error: "Username and Password required." },
                { status: 400 })
        }
        console.log(reqBody)

        const user = await User.findOne({ username })
        if (user) {
            return NextResponse.json({ error: "User already exists" },
                { status: 400 })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser)

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })







    } catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 })

    }
}