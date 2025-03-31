"use client"
import { useState, useEffect, type JSX } from "react"
import type React from "react"

import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import { Button } from "./button"

interface Option {
    [key: string]: any
    name?: string
    value?: string
    code?: string
    designation?: string
}

interface MuiAutocompleteSelectProps {
    options: Option[]
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
    valueField?: string
    labelField?: string
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
    Icon,
    valueField = "code",
    labelField = "designation",
}: MuiAutocompleteSelectProps) {
    const [selectedOption, setSelectedOption] = useState<Option | null>(null)

    const actualValueField = options?.[0]?.value !== undefined ? "value" : valueField
    const actualLabelField = options?.[0]?.name !== undefined ? "name" : labelField

    useEffect(() => {
        const selected = options?.find((option) => option[actualValueField] === value)
        setSelectedOption(selected || null)
    }, [value, options, actualValueField])

    const handleChange = (_event: React.SyntheticEvent, newValue: Option | null) => {
        if (newValue) {
            onChange(newValue[actualValueField])
            if (onChangeFormik && fieldName) {
                onChangeFormik(fieldName, newValue[actualValueField])
            }
        } else {
            onChange("")
            if (onChangeFormik && fieldName) {
                onChangeFormik(fieldName, "")
            }
        }
    }

    return (
        <Paper
            elevation={0}
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
                p: 1,
                bgcolor: "grey.100",
                borderRadius: 1,
            }}
            className={className}
        >
            <Box sx={{ flex: 1 }}>
                <Autocomplete
                    options={options}
                    value={selectedOption}
                    onChange={handleChange}
                    getOptionLabel={(option) => option[actualLabelField] || ""}
                    renderInput={(params) => (
                        <TextField {...params} label={label} variant="standard" placeholder={placeholder} fullWidth />
                    )}
                    noOptionsText={emptyMessage}
                    isOptionEqualToValue={(option, value) => option[actualValueField] === value[actualValueField]}
                />
            </Box>
            {onButtonClick && (
                <Button onClick={onButtonClick}>
                    {Icon}
                    {buttonLabel}
                </Button>
            )}
        </Paper>
    )
}