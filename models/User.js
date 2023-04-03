const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.methods.comparePassword = async function(password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
};

userSchema.statics.findByEmail = async function(email) {
    const user = await this.findOne({ email });
    return user;
};

module.exports = mongoose.model('User', userSchema);