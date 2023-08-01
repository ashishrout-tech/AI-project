import {auth} from "@clerk/nextjs";

import { MAX_FREE_COUNTS } from "@/constants";

let flag = false;

export const increaseAPILimit = async () => {

    const { userId } = auth();

    if(!userId){
        return;
    }
}
