const isAdult = (birthDate: string): boolean => {
    const date = new Date(birthDate);
    const currentDate = new Date();
    const adultDate = new Date(
      date.getFullYear() + 18,
      date.getMonth(),
      date.getDate()
    );
    return currentDate >= adultDate;
  };

  export default isAdult;