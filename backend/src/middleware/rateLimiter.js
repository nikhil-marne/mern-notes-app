import ratelimit from '../config/upstash.js'


const rateLimiter = async (req, res, next) => {
    try{
        const { success } = await ratelimit.limit("user-auth-key");

        if(!success) return res.status(429).json({message: "Too Many requests, Please Try again later."});
        next();

    } catch(error) {
        console.log("Error", error);
        next(error);
    }
}

export default rateLimiter;