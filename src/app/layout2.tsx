"use client"

import { useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';

import { ModalProvider } from '@/components/modal-provider'
import { ToastProvider } from '@/components/toaster-provider';

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
                <ToastProvider />
                {children}
            </RecoilRoot>
        </>
    )
}

export default Layout2;