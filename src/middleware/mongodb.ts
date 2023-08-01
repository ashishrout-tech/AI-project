import { NextApiRequest, NextApiResponse } from 'next';

import mongoose from 'mongoose';

let dbConnection: typeof mongoose | null = null;

type handlerType = (req:NextApiRequest, res:NextApiResponse) => void;

export const connectToDatabase = async (handler: handlerType): Promise<handlerType> => {
    if(!dbConnection){
        try {
            const newConnection = await mongoose.connect(process.env.MONGO_URI!);
            dbConnection = newConnection;
        } catch (error) {
            throw new Error("DATABASE CONNECTION FAILED", {cause: error})
        }
    }
    
    return handler;
};