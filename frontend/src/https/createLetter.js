


const createLetter = (data) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: data
    };
    const base = process.env.NEXT_PUBLIC_HOSTAPI;
    return fetch(base, requestOptions);
}


export default createLetter