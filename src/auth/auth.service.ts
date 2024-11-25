import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { RegisterDto } from './dto/register.dto';
import { hash, genSalt, compare } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.userModel.findOne({
      where: { email: registerDto.email },
    });

    //check duplicate email
    if (user) {
      throw new BadRequestException(
        'email is now exist, please try other email',
      );
    }

    //hash password
    const salt = await genSalt(10);
    const hashedPassword = await hash(registerDto.password, salt);

    //create new user in db
    const newUser = await this.userModel.create({
      fullName: registerDto.fullName,
      email: registerDto.email,
      password: hashedPassword,
    });

    return newUser;
  }

  async login(loginDto: LoginDto) {
    //check if email exist?
    const user = await this.userModel.findOne({
      where: { email: loginDto.email },
    });
    if (!user) {
      throw new UnauthorizedException('email is not exist');
    }

    //check if password is match
    const isValid = await compare(loginDto.password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('password is not match');
    }

    //generate jwt token
    const payload = { user_id: user.id };
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });
    return { access_token: token };
  }

  //get user profile
  async getUserProfile(id: number) {
    return await this.userModel.findByPk(id, {
      attributes: ['id', 'fullName', 'email'],
    });
  }
}
