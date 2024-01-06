import { rateLimit } from "express-rate-limit";

const rateLimiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	limit: 70,
	standardHeaders: true,
	legacyHeaders: false,
});

export default rateLimiter;
