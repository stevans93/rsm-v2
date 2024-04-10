module.exports = {
    httpStatus: {
        EXIST: {
            status: 202,
            send: {msg: "Already exist"}
        },
        INVALID_DATA: {
            status: 205,
            send: {msg: "Invalid data."}
        },
        TOKEN_EXPIRIES: {
            status: 401,
            send: {msg: "Token is expiries."}
        },
        NOT_HAVE_PERMISSION: {
            status: 403,
            send: {msg: "You don't have permission!"}
        },
        NOT_FOUND: {
            status: 404,
            send: {msg: "Not found"}
        },
        NOT_EXIST: {
            status: 415,
            send: {msg: "Data not exist"}
        },
        SERVICE_ERROR: {
            status: 500,
            send: {msg: "Service error"}
        },
    }
}