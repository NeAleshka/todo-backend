import { Controller, Get, Res } from '@nestjs/common';
import { type Response } from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';

@Controller()
export class StaticController {
  @Get()
  getIndex(@Res() res: Response) {
    const html = readFileSync(join(__dirname, 'public', 'index.html'), 'utf-8');
    res.send(html);
  }

  @Get('/privacy.html')
  getPrivacy(@Res() res: Response) {
    const html = readFileSync(
      join(__dirname, 'public', 'privacy.html'),
      'utf-8',
    );
    res.send(html);
  }

  @Get('googleef2a64e45f228d95.html')
  getGoogle(@Res() res: Response) {
    const html = readFileSync(
      join(__dirname, 'public', 'googleef2a64e45f228d95.html'),
      'utf-8',
    );
    res.send(html);
  }
}
