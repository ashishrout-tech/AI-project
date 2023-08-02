"use client"

import { Card, CardContent } from "@/components/ui/card";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useSetRecoilState } from "recoil";
import { proModalState } from "@/app/recoil-atom/pro-modal";

interface FreeCounterProps {
    apiLimitCount: number;
};

export const FreeCounter = ({apiLimitCount}: FreeCounterProps) => {
    const setOpen = useSetRecoilState(proModalState);
    const onPress = () => {
        setOpen(true);
    }

    return (
        <div className="px-3">
            <Card className="bg-white/10 borrder-0">
                <CardContent className="py-6">
                    <div className="text-center text-sm text-white mb-4 space-y-2">
                        <p>
                            {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
                        </p>
                        <Progress
                            className="h-3"
                            value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
                        />
                    </div>
                    <Button onClick={onPress} className="w-full" variant="premium">
                        Upgrade
                        <Zap className="w-4 h-4 ml-2 fill-white" />
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}