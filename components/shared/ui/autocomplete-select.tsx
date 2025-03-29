"use client"
import { useState, useEffect, JSX } from "react"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import { Button } from "./button"

interface MuiAutocompleteSelectProps {
    options: any[]
    value: string
    onChange: (value: string) => void
    onChangeFormik?: (field: string, value: string) => void
    fieldName?: string
    label: string
    placeholder?: string
    emptyMessage?: string
    buttonLabel?: string
    onButtonClick?: () => void
    className?: string
    Icon: JSX.Element
}

export function MuiAutocompleteSelect({
    options,
    value,
    onChange,
    onChangeFormik,
    fieldName,
    label,
    placeholder = "Selecionar opção...",
    emptyMessage = "Nenhuma opção encontrada.",
    buttonLabel = "CRIAR NOVO",
    onButtonClick,
    className,
    Icon
}: MuiAutocompleteSelectProps) {
    const [selectedOption, setSelectedOption] = useState<any | null>(null)

    useEffect(() => {
        const selected = options?.find(option => option?.code === value);
        setSelectedOption(selected || null);
    }, [value, options]);

    const handleChange = (_event: React.SyntheticEvent, newValue: any | null) => {
        if (newValue) {
            onChange(newValue.code);
            if (onChangeFormik && fieldName) {
                onChangeFormik(fieldName, newValue.code);
            }
        } else {
            onChange("");
            if (onChangeFormik && fieldName) {
                onChangeFormik(fieldName, "");
            }
        }
    }

    return (
        <Paper
            elevation={0}
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 1,
                p: 1,
                bgcolor: 'grey.100',
                borderRadius: 1
            }}
            className={className}
        >
            <Box sx={{ flex: 1 }}>
                <Autocomplete
                    options={options}
                    value={selectedOption}
                    onChange={handleChange}
                    getOptionLabel={(option) => option.designation}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={label}
                            variant="standard"
                            placeholder={placeholder}
                            fullWidth
                        />
                    )}
                    noOptionsText={emptyMessage}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                />
            </Box>
            {onButtonClick && (
                <Button
                    onClick={onButtonClick}
                >
                    {Icon}
                    {buttonLabel}
                </Button>
            )}
        </Paper>
    )
}