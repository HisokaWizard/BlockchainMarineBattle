import { GradeType } from './grade.schema';

export class GradeDto {
  price: number;
  type: GradeType;
  name: string;
  score: number;
  image: string;
}
