/* eslint-disable prettier/prettier */
import bcrypt from "bcrypt";
import prisma from "../models/prismaClient.js";

async function userCreate(lastName,firstName,email,password,phone){
    const hashedPassword=await bcrypt.hash(password,5);
    const newUser =await prisma.user.create({
        data:{lastName,
            firstName,
            email,
            phone,
            password:hashedPassword,
            role:"user"
        }
    });
return newUser;
}

export default {userCreate};