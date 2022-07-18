export type GradeType = 'base' | 'medium' | 'high';

export class Grade {
  price: number;
  type: GradeType;
  name: string;
  score: number;
  image: string;
}
