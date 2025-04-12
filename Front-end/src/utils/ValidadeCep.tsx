export const handleCepBlur = async (
    cep: string,
    setAddress: (value: string) => void,
    setCity: (value: string) => void,
    setNeighborhood: (value: string) => void
  ) => {
    if (cep.length === 8 || cep.match(/^\d{5}-\d{3}$/)) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
  
        if (data.erro) {
          alert("CEP não encontrado. Verifique e tente novamente.");
          return;
        }
  
        setAddress(data.logradouro || "");
        setCity(data.localidade || "");
        setNeighborhood(data.bairro || "");
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        alert("Erro ao buscar o CEP. Tente novamente mais tarde.");
      }
    } else {
      alert("Digite um CEP válido.");
    }
  };
  