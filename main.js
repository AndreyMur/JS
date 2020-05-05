/* Значение из тексовых инпутов */

const totalCost = document.getElementById('total-cost'),
      anInitialFee = document.getElementById('an-initial-fee'),
      creditTerm = document.getElementById('credit-term');

/* Значение ползунковых инпутов */

const totalCostRange = document.getElementById('total-cost-range'),
      anInitialFeeRange = document.getElementById('an-initial-fee-range'),
      creditTermRange = document.getElementById('credit-term-range');

/* Итоговые значения */

const totalAmountOfCredit = document.getElementById('amount-of-credit'),
      totalMonthlyPayment = document.getElementById('monthly-payment'),
      totalRecommendedIncome = document.getElementById('recommended-income');

/*  Все ползунки  */

const inputsRange = document.querySelectorAll('.input-range');

/*  Все кнопки  */

const bankBtns = document.querySelectorAll('.bank');

/* Функция привязки ползунков и инпутов */

const assignValue = () => {
    totalCost.value = totalCostRange.value;
    anInitialFee.value = anInitialFeeRange.value;
    creditTerm.value = creditTermRange.value;
}
 
const assignTextValue = () => {
    totalCostRange.value = totalCost.value;
}

const assignTextValue1 = () => {
    anInitialFeeRange.value = anInitialFee.value;
}

const assignTextValue2 = () => {
    creditTermRange.value = creditTerm.value;
}

assignValue();

const banks = [
    {
        name: 'alfa',
        percents: 8.7
    },
    {
        name: 'sberbank',
        percents: 8.4
    },
    {
        name: 'pochta',
        percents: 7.9
    },
    {
        name: 'tinkoff',
        percents: 9.2
    }
]

let currentPercent = banks[0].percents;

/* Выбор кнопки и получение данных*/

for (let bank of bankBtns){
    bank.addEventListener('click', () => {
        for(let bank of bankBtns){
            bank.classList.remove('active');
        }
        bank.classList.add('active');
        takeActiveBank(bank);
    })
}



const takeActiveBank = currentActive => {
    const dataAttrValue = currentActive.dataset.name;
    const currentBank = banks.find(bank => bank.name === dataAttrValue);
    currentPercent = currentBank.percents;
    calculation(totalCost.value, anInitialFee.value, creditTerm.value);
}

/* Взаимосвязь ползунка и поля ввода */

for (let input of inputsRange){
    input.addEventListener('input', () => {
        assignValue();
        calculation(totalCost.value, anInitialFee.value, creditTerm.value);
    })
}

anInitialFee.addEventListener('input', () => {
    assignTextValue1();
    calculation(totalCost.value, anInitialFee.value, creditTerm.value);
    console.log(anInitialFee.value)
})

creditTerm.addEventListener('input', () => {
    assignTextValue2();
    calculation(totalCost.value, anInitialFee.value, creditTerm.value);
})

totalCost.addEventListener('input', () => {
    assignTextValue();
    calculation(totalCost.value, anInitialFee.value, creditTerm.value);
})

/* Рассчет ежемесячного платежа */

const calculation = (totalCost = 0, anInitialFee = 100000, creditTerm = 1) => {
    /*
        ЕП - ежемесячный процент
        РК - размер кредита
        ПС - процентная ставка
        КМ - количесьво месяцев

        ЕП = (РК + (((РК / 100 ) * ПС ) / 12 ) * КМ ) / КМ 
    */

    let mounthPayment; // Ежемесячный платеж
    let lounAmount = totalCost - anInitialFee; // Размер кредита
    let interestRate = currentPercent; // Процентная ставка
    let numberOfYears = creditTerm; // Количество лет
    let numberOfMounths = 12 * numberOfYears; // Количество месяцев

    mounthPayment = ( lounAmount + ((( lounAmount / 100 ) * interestRate ) / 12 ) * numberOfMounths ) / numberOfMounths;
    let mounthPaymentArounded = Math.round(mounthPayment);
    if (mounthPaymentArounded < 0){
        return false
    } else {
        totalAmountOfCredit.innerHTML = `${lounAmount} ₽`;
        totalMonthlyPayment.innerHTML = `${mounthPaymentArounded} ₽`;
        totalRecommendedIncome.innerHTML = `${mounthPaymentArounded + (0.35 * mounthPaymentArounded)} ₽`;
    }
}
