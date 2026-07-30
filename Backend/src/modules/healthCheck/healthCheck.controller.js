
import { apiResponse } from "../../utils/Api-Response.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const healthCheck = asyncHandler(async (req, res ) => {
    res
    .status(200)
    .json(new apiResponse(200,null, "server is running"));
});
