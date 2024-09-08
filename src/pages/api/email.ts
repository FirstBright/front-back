import { NextApiRequest, NextApiResponse } from "next"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "smtp.naver.com",
    port: 465,
    secure: true,
    auth: {
        user: "boom_tuhon",
        pass: process.env.NAVER_PW,
    },
})

export default async function emailApi(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const random_code = Math.floor(Math.random() * 1000000)
    const info = await transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: String(random_code), // plain text body
        html: "<b>Hello world?</b>", // html body
    })
    console.log("Message sent: %s", info.messageId)
}
