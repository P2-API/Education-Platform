import React from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

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