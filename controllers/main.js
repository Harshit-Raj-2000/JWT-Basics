// check username, password in post(login) request
// if both exist, create a new JWT
// send back to front-end

// setup authentication so only the request with JWT can access the dashboard

const jwt = require('jsonwebtoken')
const {BadRequestError} = require('../errors')

const login = async (req, res) =>{
    const { username, password } = req.body
    // mongoose validations
    // Joi - package(later)
    // check in the controller

    if(!username || !password) {
        console.log('credintial prob')
        throw new BadRequestError('Please provide email and password')
    }

    // just for testing, normally provided by db
    const id = new Date().getDate()
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn:'30d'})

    res.status(200).json({msg: 'user created', token})
}

// jwt.sign({payload}, secret_token, {options})
// try to keep payload short, better experience for users
// in production, long complex unguessable strings as secret_token

// the incoming token is in the authorisation header in the format "Bearer token"
const dashboard = async (req, res) =>{
    
    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json({msg: `Hello, ${req.user.username}`, secret: `Here is your authorised data, your lucky number is ${luckyNumber}`})

}


module.exports = { login, dashboard }



