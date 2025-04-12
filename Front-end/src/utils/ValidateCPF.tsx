const isCPF = (cpf: string): boolean => {
    cpf = cpf.replace(/\.|-/g, "");
    if (
        validateRepeatedNumbers(cpf) ||
      validateFirstDigit(cpf) ||
      validateSecondDigit(cpf)
    ) {
      return false;
    }
    return true;
  };
  
  const validateRepeatedNumbers = (cpf: string): boolean => {
    const numerosRepetidos = [
      "00000000000",
      "11111111111",
      "22222222222",
      "33333333333",
      "44444444444",
      "55555555555",
      "66666666666",
      "77777777777",
      "88888888888",
      "99999999999",
    ];
    return numerosRepetidos.includes(cpf);
  };
  
  const validateFirstDigit = (cpf: string): boolean => {
    let sum = 0;
    let multiplier = 10;
  
    for (let i = 0; i < 9; i++) {
      sum += Number(cpf[i]) * multiplier;
      multiplier--;
    }
  
    sum = (sum * 10) % 11;
    if (sum === 10 || sum === 11) sum = 0;
  
    return sum !== Number(cpf[9]);
  };
  
  const validateSecondDigit = (cpf: string): boolean => {
    let sum = 0;
    let multiplier = 11;
  
    for (let i = 0; i < 10; i++) {
      sum += Number(cpf[i]) * multiplier;
      multiplier--;
    }
  
    sum = (sum * 10) % 11;
    if (sum === 10 || sum === 11) sum = 0;
  
    return sum !== Number(cpf[10]);
  };

  export default isCPF;