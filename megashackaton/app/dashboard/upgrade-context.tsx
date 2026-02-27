"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface Plan {
    id: string;
    name: string;
    price: string;
    period: string | null;
}

interface UpgradeContextValue {
    openUpgrade: () => void;
    closeUpgrade: () => void;
    isOpen: boolean;
    selectedPlan: Plan | null;
    setSelectedPlan: (plan: Plan | null) => void;
}

const UpgradeContext = createContext<UpgradeContextValue>({
    openUpgrade: () => { },
    closeUpgrade: () => { },
    isOpen: false,
    selectedPlan: null,
    setSelectedPlan: () => { },
});

export function useUpgrade() {
    return useContext(UpgradeContext);
}

export function UpgradeProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

    const openUpgrade = useCallback(() => setIsOpen(true), []);
    const closeUpgrade = useCallback(() => {
        setIsOpen(false);
        setSelectedPlan(null);
    }, []);

    return (
        <UpgradeContext.Provider value={{ openUpgrade, closeUpgrade, isOpen, selectedPlan, setSelectedPlan }}>
            {children}
        </UpgradeContext.Provider>
    );
}
