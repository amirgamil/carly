import { useState } from 'react';
import styled from 'styled-components';


const TextInput = styled.textarea`
    width: calc(100% - 2em);
`;

export default function Content({placeholderTxt, content, onchange}) {

    const handleChange = (evt) => {
        onchange(evt.target.value);
        evt.preventDefault();
    }

    return (
        <div className = "block-body">
            <TextInput className = "editor" placeholder = {placeholderTxt}
            onChange={(evt) => handleChange(evt)} value = {content} />
            <p className = {`p-heights ${content.endsWith("\n") ? "new-line" : ""}`}>{content}</p>
        </div>
    )
}