export type GradeType = 'base' | 'medium' | 'high';

export class Grade {
  price: number;
  type: GradeType;
  name: string;
  score: number;
  image: string;
}

export class UserDto {
  address: string;
  amount: number;
  blockchainAmount: number;
  gradeCollection: Grade[];
  power: number;
}
