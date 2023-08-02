"use client"

import { useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';

import { ModalProvider } from '@/components/modal-provider'

const Layout2 = ({ children }: { children: React.ReactNode }) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if(!isMounted){
        return <>
        </>
    }

    return (
        <>
            <RecoilRoot>
                <ModalProvider />
                {children}
            </RecoilRoot>
        </>
    )
}

export default Layout2;