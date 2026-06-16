import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/Api-Error.js";
import jwt from "jsonwebtoken";
import { User, BlacklistedToken } from "../modules/user/user.model.js";

export const authMiddleware = asyncHandler(async (req, res, next) => {
  
  const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

  if (!accessToken) {
    throw new apiError(401, "Unauthorized: No token provided");
  }

  
  const blacklistedToken = await BlacklistedToken.findOne({ token: accessToken });
  if (blacklistedToken) {
    throw new apiError(401, "Unauthorized: Token is blacklisted");
  }

  try {
    
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded.id).select(
      "-password -refreshToken -emailVerificationToken -emailVerificationTokenExpiry"
    );

    if (!user) {
      throw new apiError(401, "User not found");
    }

    
    req.user = user;

    next();
  } catch (error) {
    throw new apiError(401, "invalid or expired token");
  }
});