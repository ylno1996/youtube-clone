import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    username : {type: String, required: true , unique: true},
    password: {type: String, requeid: true},
    name : {type: String, required: true},
    location: String,
});

userSchema.pre("save", async function() {
    console.log("유저가 입력한 값:", this.password);
    this.password = await bcrypt.hash(this.password, 5);
    console.log("해시가 완료된 값:", this.password)
});

const User = mongoose.model("User", userSchema);

export default User;