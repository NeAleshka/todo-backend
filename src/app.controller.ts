import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Todo')
@Controller()
export class AppController {
  @ApiExcludeEndpoint()
  @Get()
  @ApiOperation({ summary: 'Проверка работоспособности API' })
  getHello(): string {
    return 'Todo API is running! 🚀';
  }
}
