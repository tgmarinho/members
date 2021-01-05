import React from 'react';
import {Input} from '@chakra-ui/react';
import MaskedInput from 'react-input-mask';

const InputMasked = (props) => {
    const {onChange, ...restProps} = props;
    return <Input {...restProps} onChange={onChange} />;
};

const CustomMaskedInput = (props) => {
    const {value, onChange, name, mask, alwaysShowMask = true} = props;
    return (
        <MaskedInput
            name={name}
            mask={mask}
            alwaysShowMask={alwaysShowMask}
            onChange={(e) => {
                e.persist();
                onChange(e.target.value);
            }}
            value={value}
        >
            {() => <InputMasked type="text" />}
        </MaskedInput>
    );
};

export default CustomMaskedInput;
