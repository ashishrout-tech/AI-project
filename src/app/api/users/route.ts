import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "@clerk/nextjs";

import { connectToDatabase } from "@/middleware/mongodb";
import  Users  from "@/model/users";
import { MAX_FREE_COUNTS } from "@/constants";

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
    const { userId } = auth();

    if(!userId){
        res.status(400).json({error: "NOT AUTHENTICATED"})
    }

    try {
        const user = await Users.findOne({userId: userId})
        if(user){
            user.count = user.count + 1;
            user.updatedAt = new Date();
            user.save();
        }
        else{
            Users.create({
                userId,
                count: 1
            })
        }
    } catch (error) {
        res.status(400).json({error: error})
    }
}

export default connectToDatabase(handler);