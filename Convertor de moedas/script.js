document.getElementById('convert-btn').addEventListener('click', convertCurrency);

// Função para pegar as taxas de câmbio e realizar a conversão
async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;

    if (amount === '' || amount <= 0) {
        alert("Por favor, insira um valor válido.");
        return;
    }

    // API para pegar a taxa de câmbio
    const apiKey = 'YOUR_API_KEY'; // Insira sua chave de API aqui
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.result === "success") {
            const rate = data.conversion_rates[toCurrency];
            const convertedAmount = (rate * amount).toFixed(2);
            document.getElementById('conversion-result').textContent = `${convertedAmount} ${toCurrency}`;
        } else {
            alert("Erro ao obter dados da API.");
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Não foi possível realizar a conversão. Tente novamente.");
    }
}
