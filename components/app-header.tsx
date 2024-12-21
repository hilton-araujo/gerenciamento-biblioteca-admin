import { SidebarTrigger } from "./ui/sidebar";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";

export default function AppHeader() {
    return (
        <div className="flex w-full items-center justify-between p-4">
            <SidebarTrigger />
            <div>
                <SelectBranchCombobox />
            </div>
        </div>
    )
}

function SelectBranchCombobox() {
    const navigate = useRouter()

    const logout = () => {
        localStorage.removeItem("all");
        navigate.push("/");
    };

    return (
        <div className="flex gap-2">
            <Button variant="outline" onClick={logout}>
                <LogOutIcon />
            </Button>
        </div>
    )
}