import { ApiProperty } from '@nestjs/swagger'

export class RegCodeDto {
  @ApiProperty({ example: 'string', description: 'Почта' })
  email: string

  @ApiProperty({ example: 'number', description: 'Код' })
  code: number
}
