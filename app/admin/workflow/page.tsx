'use client'
import React from "react";
import WorkflowComp from "@/components/features/workflow/workflow";
import { Plus } from "lucide-react";
import { TabLayout } from "@/components/common/tabl-layout";
import StageComp from "@/components/features/workflow/stage/stage";

export default function Workflow() {

    const tabs = [
        { label: "FLUXO DE TRABALHO", value: "1", component: <WorkflowComp /> },
        { label: "ETAPA", value: "2", component: <StageComp /> },
        { label: "TAREFA", value: "3", component: <WorkflowComp /> },
    ]

    return <TabLayout title={"Criar Fluxo de Trabalho"} tabs={tabs || []} description={"Aqui vocês pode criar um fluxo de trabalho."} icon={Plus} />;
}

