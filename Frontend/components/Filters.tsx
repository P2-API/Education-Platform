import React from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import { MinimumMaximum } from 'types';

type MultiSelectAutoCompleteProps = {
    collection: string[];
    selectLabel: string;
    selectPlaceholder: string;
}

export const MultiSelectAutoComplete: React.FC<MultiSelectAutoCompleteProps> = ({ collection, selectLabel, selectPlaceholder }) => {
    
    return(
        <Autocomplete
            multiple
            id="tags-outlined"
            options={collection}
            getOptionLabel={(option) => option.toString()}
            filterSelectedOptions
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
}
  
export const MinimumDistanceSlider: React.FC<MinimumDistanceSliderProps> = ({initialState, sliderRange, minimumDistance, description, getValueText}) => {
    const [value1, setValue1] = React.useState<number[]>([initialState.minimum, initialState.maximum]);

    const handleChange1 = (
        event: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {
    if (!Array.isArray(newValue)) {
        return;
    }

    if (activeThumb === 0) {
        setValue1([Math.min(newValue[0], value1[1] - minimumDistance), value1[1]]);
    } 
    else {
        setValue1([value1[0], Math.max(newValue[1], value1[0] + minimumDistance)]);
    }
    };

    return (
        <Box sx={{ width: 300 }}>
            <p>{description}</p>
            <Slider
                getAriaLabel={() => 'Minimum distance'}
                value={value1}
                onChange={handleChange1}
                valueLabelDisplay="auto"
                getAriaValueText={getValueText}
                valueLabelFormat={getValueText}
                disableSwap
                min={sliderRange.minimum}
                max={sliderRange.maximum}
            />
        </Box>
    );
}