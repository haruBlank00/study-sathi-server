import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from 'src/decorators/Public.decorator';
interface ExtendedRequest extends Request {
  headers: Headers & { authorization?: string };
}
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException(
        "You're not authenticated. Please login.",
      );
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      request.user = {
        email: payload.email,
        userId: payload.userId,
      };
      return true;
    } catch (error) {
      console.log({ error });
      throw new UnauthorizedException(
        "You're not authenticated. Please login.",
      );
    }
  }

  private extractTokenFromHeader(request: ExtendedRequest): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private getDecorator(name: string, context: ExecutionContext) {
    return this.reflector.getAllAndOverride<boolean>(name, [
      context.getHandler(),
      context.getClass,
    ]);
  }
}
