import { connect } from "@/dbConfig/dbConfig"
import User from "@/model/user.model"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { username, password } = reqBody;

        const user = await User.findOne({ username })
        if (!user) {
            return NextResponse.json({ error: "User does not exists" },
                { status: 400 })
        }
        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) {
            return NextResponse.json({ error: "Invalid Password" }, { status: 400 })
        }
        const tokenData = {
            id: user._id,
            username: user.username
        }

        const token = await jwt.sign(tokenData, process.
            env.TOKEN_SECRET!, { expiresIn: "1h" })

        const response = NextResponse.json({
            message: "Login successfull",
            success: true
        })
        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;



    } catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 })
    }

}