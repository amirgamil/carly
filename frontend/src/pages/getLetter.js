

const getLetter = async (id) => {
    try {
        return await fetch("http://127.0.0.1:8998/" + id).then(
            res => {
                const data = res.data;
                return data;
            })
    } catch (exception) {
        console.log("something went wrong trying to fetch the current letter");
    }
}


export default getLetter;