import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    username : {type: String, required: true , unique: true},
    password: String,
    name : {type: String, required: true},
    location: String,
    socialOnly: {type: Boolean, default: false},
    avatarUrl: String,
    videos: [{type: mongoose.Schema.Types.ObjectId, ref:"Video"}],
});

userSchema.pre("save", async function() {
    if (this.isModified("password")) {
    console.log("유저가 입력한 값:", this.password);
    this.password = await bcrypt.hash(this.password, 5);
    console.log("해시가 완료된 값:", this.password)
    }
});

const User = mongoose.model("User", userSchema);

export default User;