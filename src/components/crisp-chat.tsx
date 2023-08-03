"use client"

import { useEffect } from "react"
import { Crisp } from "crisp-sdk-web"

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("cec5f399-2f2e-4b6c-a942-07be1c11b38f");
    }, []);

    return null;
}