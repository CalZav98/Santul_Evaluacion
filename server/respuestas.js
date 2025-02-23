exports.success = function (req, res, msgOk = '', status = 200) {
    res.status(status).send({
        error: false,
        status: status,
        body: msgOk
    });
}

exports.error = function (req, res, msgErr = 'Error Interno', status = 500) {
    res.status(status).send({
        error: true,
        status: status,
        body: msgErr
    });
}