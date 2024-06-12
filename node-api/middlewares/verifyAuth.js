const jwt = require("jsonwebtoken");
const verifyAuth = (request, response, next) => {
    const token = request.get("Set-Cookie");

    jwt.verify(
        token[0].split(";")[0],
        process.env.JWT_SECRET,
        (err, authData) => {
            if (err) {
                response.status(403).json({ message: "Forbidden" });
            } else {
                console.log(authData);
                next();
            }
        }
    );
};

module.exports = verifyAuth;
