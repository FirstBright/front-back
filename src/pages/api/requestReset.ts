import { NextApiRequest, NextApiResponse } from "next"
import nodemailer from "nodemailer"
import { PrismaClient } from "@prisma/client"
import { addMinutes } from "date-fns"

const prisma = new PrismaClient()

const transporter = nodemailer.createTransport({
    host: "smtp.naver.com",
    port: 465,
    secure: true,
    auth: {
        user: "boom_tuhon",
        pass: process.env.NAVER_PW,
    },
})

export default async function requestReset(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { email } = req.body
    const randomCode = String(Math.floor(Math.random() * 1000000))
    const expiresAt = addMinutes(new Date(), 15)
    try {
        if (req.method === "POST") {
            try {
                const user = await prisma.user.findUnique({ where: { email } })
                if (!user) {
                    return res.status(404).json({ error: "User not found" })
                }

                await prisma.passwordReset.create({
                    data: {
                        email,
                        resetCode: randomCode,
                        expiresAt,
                    },
                })
                console.log("Reset code created:", randomCode)
                await transporter.sendMail({
                    from: "boom_tuhon@naver.com",
                    to: email,
                    subject: "Password Reset Code",
                    text: `Your reset code is: ${randomCode}`,
                    html: `<b>Your reset code is: ${randomCode}</b>`,
                })
                console.log("Email sent to:", email)
                res.status(200).json({ message: "Reset code sent" })
            } catch (error) {
                res.status(500).json({ error: "Internal server error" })
            }
        } else {
            res.status(400).json({
                message: "지원하지 않는 메서드입니다.",
            })
        }
    } catch (e: any) {
        res.status(501).json({
            message: e.message,
        })
    }
}
