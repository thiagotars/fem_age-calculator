const yearsResult = document.getElementById('years-result')
const monthsResult = document.getElementById('months-result')
const daysResult = document.getElementById('days-result')


window.addEventListener("load", (event) => {
    document.getElementById('day-input').value = '';
    document.getElementById('month-input').value = '';
    document.getElementById('year-input').value = '';

    yearsResult.innerText = '--'
    monthsResult.innerText = '--'
    daysResult.innerText = '--'
  });



const submitButton = document.getElementById('submit-button');

function checkError() {
    
    let validatedInputs = []
    
    const inputObjects = [

        {
            id: 'day',
            input: document.getElementById('day-input'),
            value: Number(document.getElementById('day-input').value),
            label: document.querySelector('.day__label'),
            messageField: document.getElementById('day-error'),
            min: 1,
            max: 31
            
        },
        {
            id: 'month',
            input: document.getElementById('month-input'),
            value: Number(document.getElementById('month-input').value),
            label: document.querySelector('.month__label'),
            messageField: document.getElementById('month-error'),
            min: 1,
            max: 12
        },
        {
            id: 'year',
            input: document.getElementById('year-input'),
            value: Number(document.getElementById('year-input').value),
            label: document.querySelector('.year__label'),
            messageField: document.getElementById('year-error'),
            min: 1,
            max: new Date().getFullYear()
        }
    
    ]
    

    for (let i = 0; i < inputObjects.length; i++) {

        if (inputObjects[i].value) {
            if (inputObjects[i].id !== 'year') {
                if (inputObjects[i].value < inputObjects[i].min || inputObjects[i].value > inputObjects[i].max) {
                    inputObjects[i].input.classList.add('border-red')
                    inputObjects[i].label.classList.add('font-red')
                    inputObjects[i].messageField.innerHTML = `Must be a valid ${inputObjects[i].id}`
                    
                        
                } else {
                    inputObjects[i].input.classList.remove('border-red')
                    inputObjects[i].label.classList.remove('font-red')
                    inputObjects[i].messageField.innerHTML = ''
                    validatedInputs.unshift(inputObjects[i].value)
                }

            } else if (inputObjects[i].id === 'year') {
                if (inputObjects[i].value > inputObjects[i].max) {
                    inputObjects[i].input.classList.add('border-red')
                    inputObjects[i].label.classList.add('font-red')
                    inputObjects[i].messageField.innerHTML = `Must be in the past`
                   

                } else {
                    inputObjects[i].input.classList.remove('border-red')
                    inputObjects[i].label.classList.remove('font-red')
                    inputObjects[i].messageField.innerHTML = ''
                    validatedInputs.unshift(inputObjects[i].value)
                }
            }

            
        } else {
            inputObjects[i].input.classList.add('border-red')
            inputObjects[i].label.classList.add('font-red')
            inputObjects[i].messageField.innerHTML = 'This field is required'
            
        }

    }
    

    if (validatedInputs.length === 3) {
        calculateAge(validatedInputs)

    }
   
}

function calculateAge(birthdate) {

    if (birthdate.length < 3) {
        yearsResult.innerText = ''
        monthsResult.innerText = ''
        daysResult.innerText = ''
    }
    console.log(birthdate)
    const today = new Date();
    const birthDate = new Date(birthdate);
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();
  
    // If the birth month is greater than the current month, subtract one year
    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }
  
    // If the birth date is greater than the current date, subtract one month
    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
  
    yearsResult.innerText = years
    monthsResult.innerText = months
    daysResult.innerText = days
}
  

submitButton.addEventListener('click', () => {
    checkError()
})

