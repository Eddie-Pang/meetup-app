import { useState } from 'react';



function useFormInput(searchTerm, pattern) {   // https://reactjs.org/docs/hooks-intro.html --> At React Conf 2018
    
    // console.log(searchTerm);
    const [value, setValue] = useState(searchTerm? searchTerm : '');

    function handleChange({currentTarget: input}) {
        if (pattern)
        setValue(input.value.replace(pattern, ""));
        else
        setValue(input.value);
    };

    
    return {
        value,
        setValue,
        onChange: handleChange,
    };
}

export default useFormInput;