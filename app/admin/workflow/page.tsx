'use client'
import React, { useState } from "react";
import { Box, Tab, useMediaQuery, useTheme } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Header from "@/components/header";
import WorkflowComp from "@/components/workflowComp/workflow/workflow";

interface Column {
    id: string;
    label: string;
    minWidth: number;
    align?: 'right' | 'left' | 'center';
    format?: (value: number | Date) => string;
}

export default function Workflow() {
    const [value, setValue] = useState("1");
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const getTabVariant = () => {
        if (isSmallScreen) return "scrollable";
        if (isMediumScreen) return "scrollable";
        return "standard";
    };

    return (
        <div className="mx-4 flex flex-col space-y-4">
            <Header
                title={"Criar Fluxo de Trabalho"}
                description={"Aqui vocês pode criar um fluxo de trabalho."}
                addButton={false}
                buttons={false}
            />

            <div className="bg-white p-4 rounded shadow-lg mt-2">
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                        <TabList
                            onChange={handleChange}
                            aria-label="workflow tabs"
                            variant={getTabVariant()}
                            scrollButtons="auto"
                            allowScrollButtonsMobile
                            sx={{
                                [`& .MuiTab-root`]: {
                                    minWidth: isSmallScreen ? 'auto' : 120,
                                    padding: isSmallScreen ? '6px 12px' : '12px 16px',
                                    fontSize: isSmallScreen ? '0.75rem' : '0.875rem',
                                },
                            }}
                        >
                            <Tab label="Fluxo trabalho" value="1" />
                            <Tab label="Etapa" value="2" />
                            <Tab label="Tarefa" value="3" />
                        </TabList>
                    </Box>

                    <TabPanel value="1">
                        <WorkflowComp />
                    </TabPanel>
                </TabContext>
            </div>
        </div>
    );
}

