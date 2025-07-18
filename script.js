document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');
    const resultDiv = document.getElementById('result');
    const rateInfoDiv = document.getElementById('rate-info');
    const convertBtn = document.getElementById('convert-btn');
    const swapBtn = document.getElementById('swap-currencies');
    
    // Fixed exchange rates (relative to USD)
    const exchangeRates = {
        USD: 1,     // US Dollar (base currency)
        EUR: 0.85,   // Euro
        GBP: 0.73,   // British Pound
        JPY: 110.25, // Japanese Yen
        AUD: 1.35,   // Australian Dollar
        CAD: 1.26,   // Canadian Dollar
        CHF: 0.92,   // Swiss Franc
        CNY: 6.45,   // Chinese Yuan
        INR: 74.50,  // Indian Rupee
        MXN: 20.50,  // Mexican Peso
        BRL: 5.25,   // Brazilian Real
        SGD: 1.35,   // Singapore Dollar
        KRW: 1180.50,// South Korean Won
        RUB: 75.80,  // Russian Ruble
        ZAR: 15.25   // South African Rand
    };
    
    const currencies = Object.keys(exchangeRates).sort();
    const lastUpdated = "June 2023 (fixed rates)";
    
    // Initialize the app
    function init() {
        populateCurrencyDropdowns();
        updateResult();
    }
    
    // Populate currency dropdowns
    function populateCurrencyDropdowns() {
        currencies.forEach(currency => {
            const option1 = document.createElement('option');
            option1.value = currency;
            option1.textContent = currency;
            
            const option2 = option1.cloneNode(true);
            
            fromCurrencySelect.appendChild(option1);
            toCurrencySelect.appendChild(option2);
        });
        
        // Set default values
        fromCurrencySelect.value = 'USD';
        toCurrencySelect.value = 'EUR';
    }
    
    // Convert currency
    function convertCurrency() {
        const amount = parseFloat(amountInput.value);
        if (isNaN(amount) || amount < 0) {
            resultDiv.textContent = 'Please enter a valid amount';
            resultDiv.style.color = 'var(--error-color)';
            rateInfoDiv.textContent = '';
            return;
        }
        
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;
        
        // Get the exchange rates
        const fromRate = exchangeRates[fromCurrency];
        const toRate = exchangeRates[toCurrency];
        
        if (!fromRate || !toRate) {
            resultDiv.textContent = 'Error in exchange rates';
            resultDiv.style.color = 'var(--error-color)';
            rateInfoDiv.textContent = '';
            return;
        }
        
        // Convert via USD as base currency
        const amountInUSD = amount / fromRate;
        const convertedAmount = amountInUSD * toRate;
        const exchangeRate = toRate / fromRate;
        
        resultDiv.innerHTML = `${amount} ${fromCurrency} = <strong>${convertedAmount.toFixed(4)}</strong> ${toCurrency}`;
        resultDiv.style.color = 'var(--primary-color)';
        rateInfoDiv.textContent = `Exchange rate: 1 ${fromCurrency} = ${exchangeRate.toFixed(6)} ${toCurrency}`;
    }
    
    // Update result when inputs change
    function updateResult() {
        convertCurrency();
    }
    
    // Swap currencies
    function swapCurrencies() {
        const temp = fromCurrencySelect.value;
        fromCurrencySelect.value = toCurrencySelect.value;
        toCurrencySelect.value = temp;
        updateResult();
    }
    
    // Event listeners
    amountInput.addEventListener('input', updateResult);
    fromCurrencySelect.addEventListener('change', updateResult);
    toCurrencySelect.addEventListener('change', updateResult);
    convertBtn.addEventListener('click', updateResult);
    swapBtn.addEventListener('click', swapCurrencies);
    
    // Initialize the app
    init();
});