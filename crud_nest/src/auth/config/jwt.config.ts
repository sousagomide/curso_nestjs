import { registerAs } from "@nestjs/config";

export default registerAs('jwt', () => {
    return {
        secret: process.env.JWT_SECRET,
        audience: process.env.JWT_TOKEN_AUDIENCE,
        issuer: process.env.JWT_TOKEN_ISSUE,
        jwtexpire: Number(process.env.JWT_TOKEN_EXPIRE ?? 3600)
    }
})