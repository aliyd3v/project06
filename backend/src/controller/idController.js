exports.idChecking = (id, res) => {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).send({
            success: false,
            data: null,
            error: { message: "Url or Id is wrong!" }
        })
    }
}