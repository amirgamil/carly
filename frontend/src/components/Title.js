import { useState } from 'react';
import styled from 'styled-components';


const TitleInput = styled.input`
    width: calc(100% - 2em);
    padding: 0.5em;
`;

export default function Title() {
    const [title, setTitle] = useState('');

    return (
        <TitleInput placeholder="Enter the title of the card"
        onInput={(evt) => setTitle(evt.target.value)} value = {title} />
    )
}