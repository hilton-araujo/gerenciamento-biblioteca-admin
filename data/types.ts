interface UsePostParams {
    endpoint: string;
    successAction: (data: any) => void;
    errorAction: (error: any) => void;
}

interface UseGetParams {
    endpoint: string;
    dependsOn?: boolean;
    documentarySpecieCode?: string;
}

interface UsePutParams {
    endpoint: string;
    successAction: (data: any) => void;
    errorAction: (error: any) => void;
}

interface UsePatchParams {
    endpoint: string;
    successAction: (data: any) => void;
    errorAction: (error: any) => void;
}

interface UseDeleteParams {
    endpoint: string;
    successAction: (data: any) => void;
    errorAction: (error: any) => void;
}
