import { useState } from 'react';
import styled from 'styled-components';


const TextInput = styled.textarea`
    width: calc(100% - 2em);
    padding: 1em;
`;

export default function Content() {
    const [content, setContent] = useState('');

    return (
        <div class = "block-body">
            <TextInput className = "editor" placeholder = "Enter the body of the message"
            onInput={(evt) => setContent(evt.target.value)} value = {content} />
            <div class = "p-heights">{content}</div>
        </div>
    )
}