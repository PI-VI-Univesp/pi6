import React , { InputHTMLAttributes, useEffect, useRef , useState, useCallback} from 'react';
import { IconBaseProps} from 'react-icons';
import {FiAlertCircle} from 'react-icons/fi'
import { useField } from '@unform/core';
import { Container, Error } from './styles';

interface InputFormularioProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;    
}
const InputFormulario: React.FC<InputFormularioProps> = ({name,  ...rest}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const {fieldName, defaultValue, error, registerField } = useField(name);

    const handleInputFormularioFocus = useCallback(() => {
        setIsFocused(true);
    },[])

    const handleInputFormularioBlur = useCallback(() => {
        setIsFocused(false);
        if (inputRef.current?.value) {
            setIsFilled(true);
        } else {
            setIsFilled(false);
        }
    },[])


    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });

    }, [fieldName, registerField]);
    return(
        <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
            <input
                onFocus={handleInputFormularioFocus}
                onBlur={handleInputFormularioBlur}
                defaultValue={defaultValue}
                ref={inputRef}
                {...rest}
            />
            {error &&
                <Error title={error}>
                    <FiAlertCircle color="#c53030" size={20}/>
                </Error>
            }
        </Container>
    );
};
export default InputFormulario;
