import React from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { FilterProps } from '@frontend/pages/DataTableSection';

import { MinimumMaximum } from 'types';
type MultiSelectAutoCompleteProps = {
    collection: string[];
    selectLabel: string;
    selectPlaceholder: string;
    value: string[];
    setFilters: React.Dispatch<React.SetStateAction<FilterProps>>;
    identifier: string;
}

export const MultiSelectAutoComplete: React.FC<MultiSelectAutoCompleteProps> = ({ collection, selectLabel, selectPlaceholder, setFilters, identifier }) => {

    const [value, setValue] = React.useState<string[]>([]);
    const identity = identifier; // Assign the identifier value to a constant variable identity
    const handleChange = (_event: React.SyntheticEvent, newValue: string[]) => {
        setValue(newValue);
        setFilters((prevFilters) => ({
            ...prevFilters,
            [identity]: newValue // Use identity instead of identifier
        }));
    }

    return (
        <Autocomplete
            multiple
            id="tags-outlined"
            sx={{ width: "100%" }}
            options={collection}
            getOptionLabel={(option) => option.toString()}
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
    getValueText: (value: number) => string;
    setFilters: React.Dispatch<React.SetStateAction<FilterProps>>;
    identifier: string;
}

export const MinimumDistanceSlider: React.FC<MinimumDistanceSliderProps> = ({ initialState, sliderRange, minimumDistance, description, getValueText, setFilters, identifier }) => {

    const [value1, setValue1] = React.useState<number[]>([initialState.minimum, initialState.maximum]);

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

        const [minValue, maxValue] = newValue;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [identifier]: [minValue, maxValue]
        }));
    };

    return (
        <Box sx={{}}>
            <p style={{}}  >{description}</p>
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