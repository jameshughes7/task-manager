const jwt = require('jsonwebtoken');

// json web token is separated by 3 periods
// 1st section is called the Header, and is a base64 encoded JSON string
// 2nd section is called the Payload or body, also base64 JSON string from the data we provided
// 3rd section is called the signature which is used to verify the token

const myFunction = async () => {
    const token = jwt.sign({ _id: 'abcd123' }, 'thisismyname', {expiresIn: "7 days"});
    console.log(token);

    const data = jwt.verify(token, 'thisismyname');
    console.log(data);
}

myFunction();
