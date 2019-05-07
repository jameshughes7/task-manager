// bcrypt is a hashing algorithm
// hashing algorithm cannot be decrypted
// they are a one way algorithm
const bcrypt = require('bcryptjs');

const myFunction = async () => {
    const myPassword = 'Hello12345';
    const hashPassword = await bcrypt.hash(myPassword, 8);
    
    console.log(myPassword);
    console.log(hashPassword);
    
    const isMatch = await bcrypt.compare(myPassword, hashPassword);
    console.log(isMatch);
}

myFunction();