import { JwtService } from '@nestjs/jwt';
export declare class LoginDto {
    username: string;
    password: string;
}
export declare class AuthController {
    private jwtService;
    private users;
    constructor(jwtService: JwtService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: number;
            username: string;
            role: string;
        };
    }>;
}
