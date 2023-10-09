const username = document.querySelector('#name')
const userEmail = document.querySelector('#email')
const userMessage = document.querySelector('#msg')
const sendFormBtn = document.querySelector('.contact__form-btn-send')
const clearFormBtn = document.querySelector('.contact__form-btn-clear')
const formContainer = document.querySelector('.contact__form-container')
const popup = document.querySelector('.popup')
const closePopupBtn = document.querySelector('.popup-close-btn')

const showError = (input, msg) => {
	const formBox = input.parentElement
	const errorMsg = formBox.querySelector('.error-text')

	formBox.classList.add('error')
	errorMsg.textContent = msg
}

const clearError = input => {
	const formBox = input.parentElement
	formBox.classList.remove('error')
}

const checkForm = input => {
	input.forEach(el => {
		if (el.value === '') {
			showError(el)
		} else {
			clearError(el)
		}
	})
}

const checkUserLength = (input, min) => {

	//	const reUser = /^[A-Za-z].*\s.*$/

	const reUser = /[A-Za-z]+/
	if (input.value.length < min) {
		showError(input, `${input.previousElementSibling.innerText.slice(0)} musi składać się z min.${min} znaków`)
	} else if (!reUser.test(input.value)) {
		showError(input, 'Pole nie może zawierać tylko spacji i znaków interpunkcyjnych')
	}
}

const checkMsgLength = (input, min) => {
	const reMsg = /[A-Za-z0-9]+/
	console.log(input.value)
	if (input.value.length < min) {
		showError(input, `Pole wiadomości musi składać się z min. ${min} znaków `)
	} else if (!reMsg.test(input.value)) {
		showError(input, 'Pole nie może składać się wyłącznie ze spacji i znaków interpunkcyjnych')
	}
}

const checkEmail = mail => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	if (re.test(mail.value)) {
		clearError(userEmail)
	} else {
		showError(userEmail, 'Adres e-mail jest nie poprawny ')
	}
}

const checkErrors = () => {
	const allInputs = document.querySelectorAll('.contact__form-box')
	let countError = 0

	allInputs.forEach(el => {
		if (el.classList.contains('error')) {
			countError++
		}
	})

	if (countError === 0) {
		popup.classList.add('show-popup')
        formContainer.classList.add('disabled')
	
	}
}

sendFormBtn.addEventListener('click', e => {
	e.preventDefault()
	checkForm([username, userEmail, userMessage])
	checkEmail(userEmail)
	checkUserLength(username, 3)
	checkMsgLength(userMessage, 10)
	checkErrors()
})

clearFormBtn.addEventListener('click', e => {
	e.preventDefault()

	;[username, userEmail, userMessage].forEach(el => {
		el.value = ''

		clearError(el)
	})
})

closePopupBtn.addEventListener('click', e => {
	e.preventDefault()

	;[username, userEmail, userMessage].forEach(el => {
		el.value = ''
	})

	popup.classList.remove('show-popup')
	formContainer.classList.remove('disabled')
})
