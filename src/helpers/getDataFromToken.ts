import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const cookieData = request.cookies.get("token")?.value || ""
        const decodedData: any = jwt.verify(cookieData, process.env.TOKEN_SECRET!)
        return decodedData.id
    } catch (error) {
        console.log(error)
    }
}