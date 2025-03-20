import React from "react"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import { Box, Tab, useMediaQuery, useTheme } from "@mui/material"
import { LucideIcon } from "lucide-react"
import { PageHeader } from "./app-header"

interface TabItem {
    label: string
    value: string
    component: React.ReactNode
}

interface TabLayoutProps {
    title: string
    tabs: TabItem[]
    description: string,
    icon?: LucideIcon;
}

export const TabLayout: React.FC<TabLayoutProps> = ({ title, tabs, description, icon }) => {
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
    const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"))
    const [value, setValue] = React.useState(tabs[0].value)

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    const getTabVariant = () => {
        if (isSmallScreen) return "scrollable"
        if (isMediumScreen) return "scrollable"
        return "standard"
    }

    return (
        <div className="flex flex-col w-full min-h-screen">
            <div className="flex flex-col w-full">
                <main className="grid items-start flex-1 grid-cols-1 gap-4 md:gap-4">
                    <PageHeader
                        title={title}
                        description={description}
                        icon={icon}
                    />

                    <div className="items-center justify-between block p-4 bg-white border-b border-gray-200 rounded shadow-lg">
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                <TabList
                                    onChange={handleChange}
                                    aria-label="lab API tabs example"
                                    allowScrollButtonsMobile
                                    variant={getTabVariant()}
                                    sx={{
                                        [`& .MuiTab-root`]: {
                                            minWidth: isSmallScreen ? "auto" : 120,
                                            padding: isSmallScreen ? "6px 12px" : "12px 16px",
                                            fontSize: isSmallScreen ? "0.75rem" : "0.875rem",
                                        },
                                    }}
                                >
                                    {tabs.map((tab) => (
                                        <Tab key={tab.value} label={tab.label} value={tab.value} />
                                    ))}
                                </TabList>
                            </Box>

                            {tabs.map((tab) => (
                                <TabPanel key={tab.value} value={tab.value}>
                                    {tab.component}
                                </TabPanel>
                            ))}
                        </TabContext>
                    </div>
                </main>
            </div>
        </div>
    )
}