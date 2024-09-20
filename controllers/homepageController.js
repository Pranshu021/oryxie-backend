const testAPIController = async(req, res) => {
    return res.json({"message": "working"});
}

module.exports = {
    testAPIController
}