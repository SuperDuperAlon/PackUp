"use client";

import { packageService } from "@/services/package.service";

function ExportButton() {
    const handleExport = async () => {
        try {
            const blob = await packageService.exportToCSV();
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "data.csv";
            link.click();
        } catch (error) {
            console.error("Export failed:", error);
        }
    };

    return <button onClick={handleExport}>ייצא</button>;
}

export default ExportButton;
