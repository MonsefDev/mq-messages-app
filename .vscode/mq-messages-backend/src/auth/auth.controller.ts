import { Controller, Post, Body, HttpCode, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Public } from './auth.guard';
import { LoginDto } from './dto/login.dto';


@Controller('auth')
export class AuthController {
  private users = [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
    { id: 2, username: 'user', password: 'user123', role: 'user' },
    { id: 3, username: 'viewer', password: 'viewer123', role: 'viewer' },
  ];

  constructor(private jwtService: JwtService) {}

  @Public()
  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    const user = this.users.find(
      u => u.username === loginDto.username && u.password === loginDto.password
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { 
      sub: user.id, 
      username: user.username, 
      role: user.role 
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    };
  }
}