import mongoose, {Schema}from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import crypto from "crypto" 

const userSchema = new Schema({
    name: {
        type: String,
        required: [true,"Name is required"],
    },
    email: {
        type: String,
        required: [true,"Email is required"],
        unique: [true,"Email is already taken"],
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true,"Password is required"],
        select: false
    },
    refreshToken: {
        type: String,
        default: null

    },


}, {timestamps: true}) // createdAt and updatedAt: 



// blacklisting token schema 
const blacklistedTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
        expires: 0,
    },

}, {
    timestamps: true
})


// hooks to hash password
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);

    
});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            id: this._id,
            name: this.name,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            id: this._id,
            name: this.name,
            email: this.email,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User =  mongoose.model("User", userSchema)
export const BlacklistedToken = mongoose.model("BlacklistedToken", blacklistedTokenSchema)