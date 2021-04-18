import { useState } from 'react';
import styled from 'styled-components';


const TextInput = styled.textarea`
    width: calc(100% - 2em);
    padding: 1em;
`;

export default function Content({placeholderTxt, content, onchange}) {
    return (
        <div className = "block-body">
            <TextInput className = "editor" placeholder = {placeholderTxt}
            onChange={(evt) => onchange(evt.target.value)} value = {content} />
            <div className = {`p-heights ${content.endsWith("\n") ? "newLine" : ""}`}>{content}</div>
        </div>
    )
}