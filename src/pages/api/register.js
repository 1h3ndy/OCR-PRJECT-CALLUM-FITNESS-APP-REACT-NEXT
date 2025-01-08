import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

//Export to make function available to application, default allows calling without args, and async allows use of asynchronous functions for qerying DS
export default async function register(req, res) {
  if (req.method === "POST") {
    //new prisma client to query and insert to DB
    const prisma = new PrismaClient();

    // First lets grab the data from the req body
    const {email, password, username} = req.body;

    //Lets log the data
    console.log(req.body);

    //now lets see if the user already exists by querying email in database table users
    const userIsInTableBool = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    //if user is in table lets tell the client they have already registered
    if (userIsInTableBool) {
      return res
        .status(400)
        .json({ message: "You already exist in the table!" });
    }

    //else lets register them and tell them it was successful
    else {
      try {
        
        const newMember = await prisma.user.create(
            {
          data: {
            email,
            username,
            password, // you should hash the password before saving it. add in future
          },
        });

        return res.status(201).json({
          message: "You have successfully registered",
          user: newMember ,
        });
      } catch (error) {
        console.log(error.message);

        return res              // response

          .status(400)
          .json({ message: "Could not register, please try again later" });
      }
    }
  } else {
    
    return res.status(400).json({ message: "Post only API route" });
  }
}
