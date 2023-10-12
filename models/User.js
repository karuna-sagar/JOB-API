const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        maxlength: 50,
        minlength: 3,
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],

        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
    },
})

userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    })
}

userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}
// userSchema.methods.comparePassword = async function (canditatePassword) {
//     const isMatch = await bcrypt.compare(canditatePassword, this.password)
//     return isMatch
// }
// userSchema.methods.createJWT = function () {
//     return jwt.sign(
//         { userId: this._id, name: this.name },
//         process.env.JWT_SECRET,
//         {
//             expiresIn: process.env.JWT_LIFETIME,
//         }
//     )
// }
module.exports = mongoose.model('User', userSchema);