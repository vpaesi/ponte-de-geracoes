import isCPF from "./ValidateCPF";
import isAdult from "./ValidateAge";

interface Address {
  street: string;
  number: string;
  zipCode: string;
  city: string;
  neighborhood: string;
}

interface FormValues {
  name: string;
  dob: string;
  rg: string;
  cpf: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  availableDays: string[];
  address: Address;
  userType: string;
}

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateFields = (
  values: FormValues,
  setErrors: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
) => {
  const newErrors: Record<string, boolean> = {};

  const {
    name,
    dob,
    rg,
    cpf,
    email,
    phone,
    password,
    confirmPassword,
    availableDays,
    address,
  } = values;

  if (!name.trim()) newErrors.name = true;
  if (!dob) newErrors.dob = true;
  if (!rg.trim()) newErrors.rg = true;
  if (!cpf.trim()) newErrors.cpf = true;
  if (!email.trim()) newErrors.email = true;
  if (!phone.trim()) newErrors.phone = true;
  if (!password.trim()) newErrors.password = true;
  if (!confirmPassword.trim()) newErrors.confirmPassword = true;
  if (password !== confirmPassword) newErrors.confirmPassword = true;

  if (!address.street.trim()) newErrors.addressStreet = true;
  if (
    !address.number.trim() ||
    isNaN(Number(address.number)) ||
    Number(address.number) <= 0
  )
    newErrors.addressNumber = true;
  if (!address.zipCode.trim()) newErrors.addressZipCode = true;
  if (!address.city.trim()) newErrors.addressCity = true;

  if (!isValidEmail(email)) {
    newErrors.email = true;
    alert("E-mail inválido. Por favor, insira um e-mail válido.");
    return false;
  }

  if (!isCPF(cpf)) {
    newErrors.cpf = true;
    alert("CPF inválido!");
    return false;
  }

  if (!isAdult(dob)) {
    newErrors.dob = true;
    alert("Você precisa ser maior de idade para se registrar!");
    return false;
  }

  if (availableDays.length === 0) {
    newErrors.availableDays = true;
    alert("Selecione pelo menos um dia de disponibilidade.");
    return false;
  }

  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) {
    alert("Por favor, preencha todos os campos obrigatórios corretamente.");
    return false;
  }

  return true;
};
