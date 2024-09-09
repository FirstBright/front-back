import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

export default async function validateResetCode(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { email, resetCode } = req.body

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
                res.status(200).json({ message: "Reset code is valid" })
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
