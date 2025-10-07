import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import dotenv from 'dotenv'

dotenv.config();


// Ratelimiting 10 requests per 100 seconds: "60 s"
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(100, "60 s")
})

export default ratelimit;