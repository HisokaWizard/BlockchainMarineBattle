import { Grade } from 'src/grade/grade.schema';

export class UserDto {
  address: string;
  amount: number;
  blockchainAmount: number;
  gradeCollection: Grade[];
  power: number;
}
