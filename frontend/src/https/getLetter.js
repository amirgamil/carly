

const getLetter = async (id, password="") => {
    try {
        var requestOptions;
        if (password != "") {
            var formdata = new FormData();
            formdata.append("password", password);
            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };
        }
        return await fetch("http://127.0.0.1:8998/api/" + id, requestOptions)
        .then(res => {
            if (res.status === 401) {
                throw new Error("unauthorized password");
            }
            return res.json();
        })
        .then(data => {
            return { ...data, success: true };
        }).catch(exception => {
            return { status: 401, success: false };
        });
    } catch (exception) {
        console.log("something went wrong trying to fetch the current letter " + exception.response);
    }
}


export default getLetter;