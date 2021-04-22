


const createLetter = (data) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: data
    };
    console.log(data);
    return fetch("http://127.0.0.1:8998/api", requestOptions);
}


export default createLetter