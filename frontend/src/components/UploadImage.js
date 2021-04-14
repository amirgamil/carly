import { useState } from 'react';
import styled from 'styled-components';



export default function UploadImage() {

    return (
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <input type="file" id="image" name="filename" />
            <input type="submit"/>
        </div>
        
    )
}