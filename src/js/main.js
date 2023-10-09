const burgerBtn = document.querySelector('.navbar__mobile-btn-burger')
const closeBurgerBtn = document.querySelector('.navbar__mobile-btn-close')
const menuList = document.querySelector('.navbar__list')
const menuLink = document.querySelectorAll('.navbar__item-link')

const footerYear = document.querySelector('.footer__year')

const body = document.querySelector('body')

const scrollSpySections = document.querySelectorAll('.section')

const checkPage = () => { 
	if (document.body.classList.contains('home-page')) {
		window.addEventListener('scroll', handleScrollSpy)
	} else if (document.body.classList.contains('contact-page')){ 
		menuLink.forEach(item => item.classList.remove('active'))
		menuLink.forEach(item => {if(item.classList.contains('contact-site')){
			item.classList.add('active')
		}})

	} else if (document.body.classList.contains('ofert-page')){ 
		menuLink.forEach(item => item.classList.remove('active'))
		menuLink.forEach(item => {if(item.classList.contains('ofert-site')){
			item.classList.add('active')
		}})
	}
}

const handleScrollSpy = () => {
	if (document.body.classList.contains('home-page')) {
		menuLink.forEach(item => item.classList.remove('active'))
		const sections = []

		scrollSpySections.forEach(section => {
			if (window.scrollY <= section.offsetTop + section.offsetHeight - 80) {
				sections.push(section)
				const activeSection = document.querySelector(`[href*="${sections[0].id}"]`)
				menuLink.forEach(item => item.classList.remove('active'))

				activeSection.classList.add('active')
			}
		})

}
}

const showMenu = () => {
	menuList.classList.toggle('show-menu')
	burgerBtn.classList.toggle('navbar__mobile-btn-burger--noactive')
	closeBurgerBtn.classList.toggle('navbar__mobile-btn-close--active')

	menuLink.forEach(items => {
		items.addEventListener('click', () => {
			menuList.classList.remove('show-menu')
			burgerBtn.classList.remove('navbar__mobile-btn-burger--noactive')
			closeBurgerBtn.classList.remove('navbar__mobile-btn-close--active')
			body.classList.remove('stop-scrolling')
		})
	})

	return menuList.classList.contains('show-menu')
		? body.classList.add('stop-scrolling')
		: body.classList.remove('stop-scrolling')
}

const handleCurrentYear = () => {
	const year = new Date().getFullYear()
	footerYear.innerText = year
}

window.addEventListener('load', handleCurrentYear)
burgerBtn.addEventListener('click', showMenu)
closeBurgerBtn.addEventListener('click', showMenu)

window.addEventListener('load', checkPage)
