import { ApiProperty } from '@nestjs/swagger'
import { VerifyEnum } from 'src/common/enums/verification-enum'

export class UserVerifyDto {
  @ApiProperty({ example: 'string', description: '' })
  userEmail: string

  @ApiProperty({ example: 'VerifyEnum', description: '' })
  type: VerifyEnum

  @ApiProperty({ example: 'number', description: '' })
  code: number
}
