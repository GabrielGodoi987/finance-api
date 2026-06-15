import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    
    // Se passou um campo específico, retorna apenas esse campo
    if (data) {
      return request.user?.[data];
    }
    
    // Se não passou nada, retorna o usuário completo
    return request.user;
  },
);
