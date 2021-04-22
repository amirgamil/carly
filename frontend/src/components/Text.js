import { useState } from 'react';
import styled from 'styled-components';


const TitleInput = styled.input`
    width: calc(100% - 2em);
    padding: 0.5em;
`;

const Title = ({placeholderTxt, value, onchange}) => {
    const handleChange = (evt) => {
        onchange(evt.target.value);
        evt.preventDefault();
    }
    return (
        <TitleInput placeholder={placeholderTxt}
        onChange={evt => handleChange(evt)} value = {value} />
    )
}


export default Title;