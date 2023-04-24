// logger middleware for express
module.exports = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

