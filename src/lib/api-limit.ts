import { auth } from "@clerk/nextjs";

import { connectToDatabase } from "@/middleware/mongodb";
import  Users  from "@/model/users";
import { MAX_FREE_COUNTS } from "@/constants";

export const increaseAPILimit = async () => {
    try {
        const response = await connectToDatabase();
        console.log(response.message)
    } catch (error) {
        console.log((error as Error).message)
    }

    const { userId } = auth();

    if(!userId){
        return;
    }

    try {
        const user = await Users.findOne({userId: userId})
        if(user){
            user.count = user.count + 1;
            user.updatedAt = new Date();
            user.save();
        }
        else{
            await Users.create({
                userId,
                count: 1
            })
        }
    } catch (error) {
        console.log((error as Error).message);
    }
};

export const checkApiLimit = async () => {
    try {
        const response = await connectToDatabase();
        console.log(response.message)
    } catch (error) {
        console.log((error as Error).message)
    }

    const {userId} = auth();

    if(!userId){
        false;
    }

    try {
        const user = await Users.findOne({userId: userId})
        if (!user || user.count < MAX_FREE_COUNTS) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log((error as Error).message);
    }
}

export const getApiLimitCount = async () => {
    const {userId} = auth();

    if(!userId){
        return 0;
    }

    try {
        const user = await Users.findOne({userId: userId});
        if(!user){
            return 0;
        }
        return user.count;

    } catch (error) {
        console.log((error as Error).message);
    }
}
