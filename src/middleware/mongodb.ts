import mongoose from 'mongoose';

let dbConnection: typeof mongoose | null = null;

export const connectToDatabase = async (): Promise<{message: string}> => {
    if(!dbConnection){
        try {
            const newConnection = await mongoose.connect(process.env.MONGO_URI!);
            dbConnection = newConnection;
        } catch (error) {
            console.log("DATABASE CONNECTION NOT SUCCEDED", (error as Error).message)
        }
    }
    return {message: "DATABASE CONNECTION SUCCESSFUL"}
};