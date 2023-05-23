import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export function AuthUser() {
  return createParamDecorator((_data: unknown, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest()

    const user = req.user

    return user
  })()
}
