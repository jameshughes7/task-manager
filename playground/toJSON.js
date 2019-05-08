// How toJSON is working behind the scenes
// res.send is running JSON.stringify
// toJSON allows us to manipulate the JSON
const pet = {
    name: 'Hal'
}

pet.toJSON = function () {
    return {};
}

console.log(JSON.stringify(pet));