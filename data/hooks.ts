import { useMutation, useQuery } from "@tanstack/react-query";
import { HttpClient } from "./client/http-client";

export function usePost({
    endpoint,
    successAction,
    errorAction,
}: UsePostParams) {
    const { isPending, isError, mutate, data, isSuccess } = useMutation({
        mutationFn: (data: any) => {
            return HttpClient.post<any>(endpoint, data);
        },
        onSuccess: (data: any) => {
            successAction(data);
        },
        onError: (error: any) => {
            errorAction(error);
        },
    });
    return {
        isPending,
        isSuccess,
        isError,
        data,
        post: mutate,
    };
}

export function useGet({ endpoint, dependsOn }: UseGetParams) {
    const { isLoading, error, data, refetch } = useQuery({
        queryKey: [endpoint],
        queryFn: () => HttpClient.get<any>(endpoint, null),
        enabled: dependsOn != undefined ? dependsOn : true,
        retry: false,
    });
    return {
        data,
        isLoading,
        error,
        refetch
    };
}

export function usePut({ endpoint, successAction, errorAction }: UsePutParams) {
    const { isPending, isError, mutate, data, isSuccess } = useMutation({
        mutationFn: (data: any) => {
            return HttpClient.put<any>(endpoint, data);
        },
        onSuccess: (data: any) => {
            successAction(data);
        },
        onError: (error: any) => {
            errorAction(error);
        },
    });
    return {
        isPending,
        isSuccess,
        isError,
        data,
        put: mutate,
    };
}

// export function usePatch({ endpoint, successAction, errorAction }: UsePatchParams) {
//   const { isPending, isError, mutate, data, isSuccess } = useMutation({
//     mutationFn: (data: any) => {
//       return HttpClient.patch<any>(endpoint, data);
//     },
//     onSuccess: (data: any) => {
//       successAction(data);
//     },
//     onError: (error: any) => {
//       errorAction(error);
//     },
//   });
//   return {
//     isPending,
//     isSuccess,
//     isError,
//     data,
//     patch: mutate,
//   };
// }

export function useDelete({
    endpoint,
    successAction,
    errorAction,
}: UseDeleteParams) {
    const { isPending, isError, mutate, data, isSuccess } = useMutation({
        mutationFn: () => {
            return HttpClient.delete<any>(endpoint);
        },
        onSuccess: (data: any) => {
            successAction(data);
        },
        onError: (error: any) => {
            errorAction(error);
        },
    });
    return {
        isPending,
        isSuccess,
        isError,
        data,
        delete: mutate,
    };
}
