import axios from 'axios'

export const postData = async (path, body) => {
    try {
        const res = await axios.post(path, body)
        
        if (res.status === 200 || res.status === 201) {
            return res
        }

        return res
    } catch(e) {
        return e
    }

}