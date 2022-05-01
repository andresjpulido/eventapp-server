const jwt = require("jsonwebtoken");

function createToken(email, id, username){
    const token = jwt.sign(
        { email:email, id: id, username:username },
        process.env.JWT_API_KEY,
        { expiresIn: process.env.JWT_TOKEN_EXPIRES_IN }
    );
    return token;
}

function decodeToken(token) {
    var decoded = jwt.decode(token, {complete: true});
    console.log(decoded.header);
    console.log(decoded.payload)

    try {
        var _decoded = jwt.verify(token, process.env.JWT_API_KEY);
        console.log(_decoded)
      } catch(err) {
        console.log(err)
      }

	return decoded;
}

export {createToken, decodeToken}