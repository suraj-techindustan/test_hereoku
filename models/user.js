const mongoose=require('mongoose');
const bcrypt=require('bcrypt');


const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true ,index:1},
    password: { type: String, required: true, },
    name: { type: String, required:true,index:1 },
    otp: { type: String},
    createdDate: Number,
    lastUpdated: Number,
    image:{type:String}
})

userSchema.methods.passwordCompare = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema);

exports.User = User;