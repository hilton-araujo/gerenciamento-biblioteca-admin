import { Employee } from "./employee";

export interface Task {
    code: string;
    designation: string;
    stage: string;
    stageCode: string;
    employee: Employee[];
}