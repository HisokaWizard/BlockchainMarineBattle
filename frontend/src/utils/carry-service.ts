const sberBankSalaryBonus = (
  salary: number,
  bankKoef: number,
  personKoef: number,
  timelimeKoef: number,
  markKoef: number
) => {
  return salary * bankKoef * personKoef * timelimeKoef * markKoef;
};

const sberBankSalaryBonusCarry = (salary: number) => {
  return (bankKoef: number) => {
    const firstExpression = salary * bankKoef;
    return (personKoef: number) => {
      const secondExpression = firstExpression * personKoef;
      return (timelimeKoef: number) => {
        const thirdExpression = secondExpression * timelimeKoef;
        return (markKoef: number) => {
          return thirdExpression * markKoef;
        };
      };
    };
  };
};

const result1 = sberBankSalaryBonus(237000, 2, 1.4, 0.9, 1.3);
const result2 = sberBankSalaryBonusCarry(237000)(2)(1.4)(0.9)(1.3);
