import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { join } from 'path';
import type { Response } from 'express';

@ApiTags('Todo')
@Controller()
export class AppController {
  @ApiExcludeEndpoint()
  @Get()
  getIndex(@Res() res: Response) {
    const html = readFileSync(join(__dirname, 'public', 'index.html'), 'utf-8');
    res.send(html);
  }
}
