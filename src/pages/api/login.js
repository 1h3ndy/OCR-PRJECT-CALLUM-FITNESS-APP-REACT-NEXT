import { PrismaClient } from "@prisma/client";
//  how to do  link <Link href="/login" className="nav-link">Login</Link>
import Link from "next/link";
export default async function login(req, res) {
    if (req.method === "POST") {
        const prisma = new PrismaClient();
        const { email, password } = req.body;

        try {
            const userexisting = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });

            if (!userexisting) {
                return res
                    .status(400)
                    .json({ message: "user not found" });
            }

            const password_matching_tf = password === userexisting.password;
            if (!password_matching_tf) { //ik this is confusing
                return res
                    .status(400)
                    .json({ message: "wrong password" });
            }

            return res.status(200).json({
                message: "success",
                user: { id: userexisting.id, email: userexisting.email },
            });
        } catch (error) {
            console.log(error.message);
            return res
                .status(500)
                .json({ message: "err" });
        }

    } else {
        return res
            .status(400)
            .json({ message: "some other error" });
    }
}
