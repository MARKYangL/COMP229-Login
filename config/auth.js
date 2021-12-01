const auth = (req, resp, next) => {
    const { user } = req.session
    if (user) {
        next();
    }else{
        resp.redirect('/login')
    }
}

module.exports = auth