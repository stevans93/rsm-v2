import axios from "axios";

class UserService {
    static loginUser = (body) => axios.post('/auth/login', body);

    static registerUser = (body) => axios.post('/auth/register', body, { headers: { 'Content-Type': 'multipart/form-data' } });

    static getAllUsers = (pageNumber = 1, pageSize = 10, search = '') => {
        return axios.get('/user/all', {
            params: {
                pageNumber,
                pageSize,
                search
            },
        });
    };

    static editUser = (body) => axios.post('/user', body, { headers: { 'Content-Type': 'multipart/form-data' } })

    static changePassword = (body) => axios.put('/user/changePassword', body)

    static deleteUser = (id) => axios.delete(`/user/${id}`)
}

export default UserService;