import type React from "react";

export default function Wrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="alignment">
            <div className="wrapper">{children}</div>
        </div>
    );
}