import { FormikProps } from "formik";

export function generateFieldProps(
    formik: FormikProps<any>,
    name: string,
    label: string,
    placeholder: string,
    type: 'text' | 'number' | 'password' | 'email' = 'text'
) {
    return {
        id: name,
        name,
        label,
        placeholder,
        type,
        size: 'small' as const,
        fullWidth: true,
        variant: 'outlined' as const,
        value: formik.values[name],
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        error: formik.touched[name] && Boolean(formik.errors[name]),
        helperText: formik.touched[name] && typeof formik.errors[name] === 'string'
            ? formik.errors[name]
            : undefined,
    };
}