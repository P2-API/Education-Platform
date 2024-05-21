import React from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';

import { MinimumMaximum, TableFilters } from "../../../src/types";
type MultiSelectAutoCompleteProps = {
    collection: string[];
    selectLabel: string;
    selectPlaceholder: string;
    setFilters?: React.Dispatch<React.SetStateAction<TableFilters>>;
    setProperties?: React.Dispatch<React.SetStateAction<string[]>>;
    givenValue: string[];
    identifier: string;
    getOptionsLabel?: (option: string) => string;
}

export const MultiSelectAutoComplete: React.FC<MultiSelectAutoCompleteProps> = ({ givenValue, collection, selectLabel, selectPlaceholder, setFilters, setProperties, identifier, getOptionsLabel }) => {

    const [value, setValue] = React.useState<string[]>(givenValue);
    const identity = identifier; // Assign the identifier value to a constant variable identity
    const handleChange = (_event: React.SyntheticEvent, newValue: string[]) => {
        setValue(newValue);
        if (setProperties != undefined && value != undefined && value != null) setProperties(newValue);
        if (setFilters) {
            setFilters((prevFilters) => ({
                ...prevFilters,
                [identity]: newValue // Use identity instead of identifier
            }));
        }
    }

    const getLabel: (option: string) => string = getOptionsLabel != null ? getOptionsLabel : (option) => option;

    return (
        <Autocomplete
            multiple
            id="tags-outlined"
            sx={{ width: "100%" }}
            options={collection}
            getOptionLabel={getLabel}
            filterSelectedOptions
            value={value}
            onChange={handleChange}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={selectLabel}
                    placeholder={selectPlaceholder}
                />
            )}
        />
    );
}


type MinimumDistanceSliderProps = {
    initialState: MinimumMaximum;
    sliderRange: MinimumMaximum;
    minimumDistance: number;
    description: string;
    givenValue: MinimumMaximum;
    getValueText: (value: number) => string;
    setFilters: React.Dispatch<React.SetStateAction<TableFilters>>;
    identifier: string;
}

export const MinimumDistanceSlider: React.FC<MinimumDistanceSliderProps> = ({ initialState, sliderRange, givenValue, minimumDistance, description, getValueText, setFilters, identifier }) => {
    const [value1, setValue1] = React.useState<number[]>(givenValue?.minimum !== 0 || givenValue?.maximum !== 0 ? [givenValue?.minimum, givenValue?.maximum] : [initialState?.minimum, initialState?.maximum]);

    const handleChange1 = (
        _event: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            const minValue = Math.min(newValue[0], value1[1] - minimumDistance);
            const maxValue = Math.max(newValue[0] + minimumDistance, value1[1]);
            setValue1([minValue, maxValue]);

        }
        else {
            const minValue = value1[0];
            const maxValue = Math.max(newValue[1], value1[0] + minimumDistance);
            setValue1([minValue, maxValue]);

        }
    };

    const handleFilterChange = (
        _event: Event | React.SyntheticEvent,
        newValue: number | number[],
    ) => {

        if (!Array.isArray(newValue)) {
            return;
        }

        if (identifier === "unemployment.newGraduate") {
            const [minValue, maxValue] = newValue;
            setFilters((prevFilters) => ({
                ...prevFilters,
                unemployment: {
                    experienced: prevFilters.unemployment.experienced, // Add the experienced property
                    newGraduate: { minimum: minValue, maximum: maxValue } // Update the type of newGraduate to MinimumMaximum
                }
            }));
        } else if (identifier === "unemployment.experienced") {
            const [minValue, maxValue] = newValue;
            setFilters((prevFilters) => ({
                ...prevFilters,
                unemployment: {
                    newGraduate: prevFilters.unemployment.newGraduate, // Add the newGraduate property
                    experienced: { minimum: minValue, maximum: maxValue } // Update the type of experienced to MinimumMaximum
                }
            }));
        } else if (identifier === "salary.newGraduate") {
            const [minValue, maxValue] = newValue;
            setFilters((prevFilters) => ({
                ...prevFilters,
                wantedSalary: {
                    experienced: prevFilters.wantedSalary.experienced, // Add the experienced property
                    newGraduate: { minimum: minValue, maximum: maxValue } // Update the type of newGraduate to MinimumMaximum
                }
            }));
        } else if (identifier === "salary.experienced") {
            const [minValue, maxValue] = newValue;
            setFilters((prevFilters) => ({
                ...prevFilters,
                wantedSalary: {
                    newGraduate: prevFilters.wantedSalary.newGraduate, // Add the newGraduate property
                    experienced: { minimum: minValue, maximum: maxValue } // Update the type of experienced to MinimumMaximum
                }
            }));
        }

        else {
            const [minValue, maxValue] = newValue;
            setFilters((prevFilters) => ({
                ...prevFilters,
                [identifier]: { minimum: minValue, maximum: maxValue } // Update the type of identifier to MinimumMaximum
            }));
        }
    };


    return (
        <Box sx={{}}>
            <div style={{}}  >{description}</div>
            <Slider
                getAriaLabel={() => 'Minimum distance'}
                value={value1}
                onChangeCommitted={handleFilterChange}
                onChange={handleChange1}
                valueLabelDisplay="auto"
                getAriaValueText={getValueText}
                valueLabelFormat={getValueText}
                sx={{ width: "94.5%", marginLeft: "10px" }}
                disableSwap
                min={sliderRange.minimum}
                max={sliderRange.maximum}
            />
        </Box>
    );
}

type CheckmarkToggleButtonProps = {
    initialState: boolean;
    description: string;
    setFilters: React.Dispatch<React.SetStateAction<TableFilters>>;
    identifier: string;
}

export const CheckmarkToggleButton: React.FC<CheckmarkToggleButtonProps> = ({ initialState, description, setFilters, identifier }) => {
    const [selected, setSelected] = React.useState(initialState);

    if (identifier === "hasFlexibleJobSchedule") {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ToggleButton
                    value="check"
                    selected={selected}
                    sx={{ height: "0px", width: "0px" }}
                    onChange={() => {
                        setSelected(!selected)
                        setFilters((prevFilters) => ({
                            ...prevFilters,
                            hasFlexibleJobSchedule: !selected
                        }));
                    }}
                >
                    {selected && (<CheckIcon />)}
                </ToggleButton>
                <div style={{ marginLeft: '8px' }}>{description}</div>
            </Box>
        );
    }
    else if (identifier === "canWorkInternationally") {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ToggleButton
                    value="check"
                    selected={selected}
                    sx={{ height: "0px", width: "0px" }}
                    onChange={() => {
                        setFilters((prevFilters) => ({
                            ...prevFilters,
                            canWorkInternationally: !selected
                        }));
                        setSelected(!selected)
                    }}
                >
                    {selected && (<CheckIcon />)}
                </ToggleButton>
                <div style={{ marginLeft: '8px' }}>{description}</div>
            </Box>
        );
    }

}