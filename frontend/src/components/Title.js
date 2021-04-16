import { useState } from 'react';
import styled from 'styled-components';


const TitleInput = styled.input`
    width: calc(100% - 2em);
    padding: 0.5em;
`;

const Title = (props) => {
    const [title, setTitle] = useState('');

    return (
        <TitleInput placeholder={props.placeholderTxt}
        onInput={(evt) => setTitle(evt.target.value)} value = {title} />
    )
}


export default Title;