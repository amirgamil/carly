import { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: block;
  position: relative;
  width: calc(100%);
`

export default function Content({placeholderTxt, content, onchange}) {

    const handleChange = (evt) => {
        onchange(evt.target.value);
        evt.preventDefault();
    }

    return (
        <div className = "block-body">
            <textarea placeholder = {placeholderTxt}
            onChange={(evt) => handleChange(evt)} value = {content} />
            <pre className = {`p-heights ${content.endsWith("\n") ? "new-line" : ""}`}>{content}</pre>
        </div>
    )
}