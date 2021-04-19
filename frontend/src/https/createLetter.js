


const createLetter = ({title, message, person, image, expiry, password}) => {
    var myHeaders = new Headers();


    var bodyFormData = new FormData();
    bodyFormData.append('title', title);
    bodyFormData.append('message', message);
    bodyFormData.append('person', person);
    bodyFormData.append('image', image);
    bodyFormData.append('expiry', expiry);
    bodyFormData.append('password', password);
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: bodyFormData
    };
    return fetch("http://127.0.0.1:8998/api", requestOptions);
}


export default createLetter