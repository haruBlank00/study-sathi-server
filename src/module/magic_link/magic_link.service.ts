import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/module/users/interface/user.interface';
import { EmailService } from '../email/email.service';
import { USER_MODEL } from '../users/constants';
import { MAGIC_LINK_MODEL } from './constants';
import { SendMagicLinkDto } from './dto/send';
import { VerifyMagicLinkDto } from './dto/verify.dto';
import { getMagicLinkEmailHtml } from './html/magic_link.htm';
import {
  MagicLinkDocument,
  MagicLinkServiceInterface,
  SendMagicLinkResponse,
  VerifyMagicLinkResponse,
} from './interface';

@Injectable()
export class MagicLinkService implements MagicLinkServiceInterface {
  constructor(
    @InjectModel(MAGIC_LINK_MODEL)
    private magicLinkModel: Model<MagicLinkDocument>,

    @InjectModel(USER_MODEL) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async sendMagicLink({
    email,
  }: SendMagicLinkDto): Promise<SendMagicLinkResponse> {
    /**
     * send magic link to the given email
     * Create a user for the email
     * if user already exist then only send the token
     * and link the user with the token
     * after sending the token
     * save it on db
     */

    let user = await this.userModel.findOne({ email });
    if (!user) {
      user = await this.userModel.create({ email });
    }

    const { magicLink, token: magicToken } =
      await this.generateMagicLink(email);

    const magicLinkDoc = await this.magicLinkModel.create({
      token: magicToken,
      hasBeenUsed: false,
      user: user._id,
    });

    user.magicLink.push(magicLinkDoc._id);
    user.save();

    const result = await this.emailService.sendEmail({
      CcAddresses: ['harublank00@gmail.com'],
      Source: 'harublank00@gmail.com',
      ToAddresses: [email],
      Data: getMagicLinkEmailHtml(magicLink),
    });

    if (!result.success) {
      return {
        success: false,
        data: null,
        error: {
          message: 'OOPS! Failed to send magic link.',
        },
      };
    }

    return {
      success: true,
      error: null,
      data: {
        message: 'Magic link has been sent to your email.',
      },
    };
  }

  async verifyMagicLink({
    email,
    token,
  }: VerifyMagicLinkDto): Promise<VerifyMagicLinkResponse> {
    console.log({ email, token });
    const tokenResult = await this.verifyToken(token);

    if (!tokenResult.success) {
      return {
        data: null,
        success: false,
        error: tokenResult.error,
      };
    }

    const user = await this.userModel.findOne({ email });
    const magicLinkDocument = await this.magicLinkModel.findOne({
      user: user.id,
      token,
      // hasBeenUsed: false,
    });

    if (!magicLinkDocument) {
      return {
        data: null,
        success: false,
        error: {
          message: "Couldn't verify your token. Are you a hacker?",
        },
      };
    }

    const existingToken = magicLinkDocument.token;
    const tokenMatches = existingToken === token;
    if (!tokenMatches) {
      return {
        data: null,
        success: false,
        error: {
          message: "Couldn't verify your token. Are you a hacker?",
        },
      };
    }

    await this.magicLinkModel.updateOne(
      {
        _id: magicLinkDocument._id,
      },
      {
        hasBeenUsed: true,
      },
    );

    const { accessToken, refreshToken } = await this.generateTokens(email);

    return {
      error: null,
      success: true,
      data: {
        accessToken,
        refreshToken,
      },
    };
  }
  private async generateMagicLink(email: string) {
    const clientUrl = process.env.CLIENT_ORIGIN;
    const token = await this.jwtService.signAsync(
      { email },
      { expiresIn: '20m', secret: process.env.JWT_SECRET },
    );
    const magicLink = `${clientUrl}/auth/magiclink?email=${email}&token=${token}`;
    return { magicLink, token };
  }

  private async generateTokens(email: string) {
    const accessToken = await this.jwtService.signAsync(
      { email },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '15m',
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      { email },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '1d',
      },
    );
    return { accessToken, refreshToken };
  }

  private async verifyToken(token: string) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      return { success: true, data: 'Token verified.' };
    } catch (error) {
      return {
        success: false,
        error: {
          message: error.message,
        },
      };
    }
  }
}
