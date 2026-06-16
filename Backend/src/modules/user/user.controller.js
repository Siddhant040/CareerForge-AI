import { apiResponse } from "../../utils/Api-Response.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { User, BlacklistedToken } from "./user.model.js";
import jwt from "jsonwebtoken";

import { apiError } from "../../utils/Api-Error.js";

const getCookieOptions = () => ({
    httpOnly: true,
    secure: false,
    sameSite: "lax",
});

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };

    } catch (error) {
        throw new apiError(500, "Error generating tokens");
    }
}

/**
 * @desc Register a new user
 * @route POST /api/v1/auth/register
 * @access Public
 */

const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        throw new apiError(400, "Credentials are required")
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        throw new apiError(409, "User already exist")
    }

    const user = await User.create({
        name,
        email,
        password,
    })

    return res
        .status(201)
        .json(new apiResponse(
            201,
            user,
            "Register Successfully"


        ))




})
/**
 * @desc login a user
 * @route POST /api/v1/auth/login
 * @access Public
 */
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new apiError(400, "Credentials are required")
    }

    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        throw new apiError(400, "User not found")
    }

    const validatePassword = await user.isPasswordCorrect(password)
    if (!validatePassword)
        throw new apiError(400, "Password is not correct")


    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)
    const decoded = jwt.decode(accessToken);

    console.log(decoded);
    console.log(
        new Date(decoded.exp * 1000)
    );

    const createdUser = await User.findById(user._id).select(
        "-password  -refreshToken"
    )
    if (!createdUser) {
        throw new apiError(500, "Some error occurred while fetching user data");

    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, getCookieOptions())
        .cookie("refreshToken", refreshToken, getCookieOptions())
        .json(new apiResponse(200, { user: createdUser }, "Login successful"));

})

/**
 * @desc logout a user
 * @route POST /api/v1/auth/logout
 * @access Public
 */

const logout = asyncHandler(async (req, res) => {
    const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    const refreshToken = req.cookies?.refreshToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!accessToken || !refreshToken) {
        throw new apiError(400, "Access token and refresh token are required");
    }

    await User.findOneAndUpdate(
        { refreshToken },
        { $unset: { refreshToken: 1 } }
    );

    // decode token to get expiry (use decode so we can read exp even if token expired)
    const decoded = jwt.decode(accessToken);

    await BlacklistedToken.create({
        token: accessToken,
        expiresAt: new Date((decoded?.exp || 0) * 1000),
    });

    return res
        .clearCookie("accessToken", getCookieOptions())
        .clearCookie("refreshToken", getCookieOptions())
        .status(200)
        .json(new apiResponse(200, null, "Logout successful"));
});

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select("-password -refreshToken");
    return res
        .status(200)
        .json(new apiResponse(200, { user }, "User found"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
   
    const refreshToken = req.cookies?.refreshToken || req.header("Authorization")?.replace("Bearer ", "");
    if (!refreshToken) {
        throw new apiError(400, "Refresh token is required");
    }
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

    const user = await User.findById(decoded.id);

    if (!user) {
        throw new apiError(404, "User not found");
    }
    if (user.refreshToken !== refreshToken) {
        throw new apiError(401, "Invalid refresh token");
    }
    const accessToken = jwt.sign(
        {
            id: decoded.id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
    return res
        .status(200)
        .cookie("accessToken", accessToken, getCookieOptions())
        .json(new apiResponse(200, { accessToken }, "Access token refreshed"));
})

export {
    register,
    login,
    logout,
    getUser,
    refreshAccessToken
}

