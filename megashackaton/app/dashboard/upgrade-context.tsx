"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface UpgradeContextValue {
    openUpgrade: () => void;
    closeUpgrade: () => void;
    isOpen: boolean;
}

const UpgradeContext = createContext<UpgradeContextValue>({
    openUpgrade: () => { },
    closeUpgrade: () => { },
    isOpen: false,
});

export function useUpgrade() {
    return useContext(UpgradeContext);
}

export function UpgradeProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const openUpgrade = useCallback(() => setIsOpen(true), []);
    const closeUpgrade = useCallback(() => setIsOpen(false), []);

    return (
        <UpgradeContext.Provider value={{ openUpgrade, closeUpgrade, isOpen }}>
            {children}
        </UpgradeContext.Provider>
    );
}
