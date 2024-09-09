import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { hash } from "bcrypt"

const prisma = new PrismaClient()

export default async function validateResetCode(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { email, resetCode, newPassword } = req.body
    try {
        if (req.method === "POST") {
            try {
                const resetEntry = await prisma.passwordReset.findFirst({
                    where: { email, resetCode },
                })

                if (!resetEntry || new Date() > resetEntry.expiresAt) {
                    return res
                        .status(400)
                        .json({ error: "Invalid or expired reset code" })
                }
                const hashedPassword = await hash(newPassword, 10)
                await prisma.user.update({
                    where: { email },
                    data: { password: hashedPassword },
                })

                await prisma.passwordReset.deleteMany({
                    where: { email },
                })

                res.status(200).json({ message: "Password reset successful" })
            } catch (error) {
                res.status(500).json({ error: "Internal server error" })
            }
        } else {
            res.status(400).json({
                message: "지원하지 않는 메서드입니다.",
            })
        }
    } catch (e: any) {
        res.status(500).json({
            message: e.message,
        })
    }
}
