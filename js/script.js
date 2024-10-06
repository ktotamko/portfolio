'use strict'

//burger menu click
document.addEventListener('click', documentClick)

function documentClick(event) {
	const targetItem = event.target

	if (targetItem.closest('.icon-menu')) {
		document.documentElement.classList.toggle('menu-opened')
	}else if (
		!targetItem.closest('.menu__body') && 
		document.documentElement.classList.contains('menu-opened')
	) {
		document.documentElement.classList.remove('menu-opened');
	}
}

//Swiper
const swiper = new Swiper('.skills__slider', {
	spaceBetween: 16,
	grabCursor: true,
	loop: true,
	autoplay: {
		delay: 0,
		stopOnLastSlide: false,
		disableOnInteraction: false,
	},
	speed: 2500,
	breakpoints: {
		240: {
			slidesPerView: 1.3,
		},
		319: {
			slidesPerView: 1.8,
		},
		350: {
			slidesPerView: 2,
		},
		425: {
			slidesPerView: 2.5,
		},
		500: {
			slidesPerView: 3,
		},
		575: {
			slidesPerView: 3.5,
		},
		650: {
			slidesPerView: 4,
		},
		725: {
			slidesPerView: 4.5,
		},
		800: {
			slidesPerView: 5,
		},
		875: {
			slidesPerView: 5.5,
		},
		950: {
			slidesPerView: 6,
		},
		1025: {
			slidesPerView: 6.5,
		},
		1100: {
			slidesPerView: 7,
		},
		1175: {
			slidesPerView: 7.5,
		},
		1250: {
			slidesPerView: 8,
		},
	},
})

//Dark theme
window.addEventListener('load', windowLoad)

function windowLoad() {
	const htmlBlock = document.documentElement

	const saveUserTheme = localStorage.getItem('user-theme')

	let userTheme
	if (window.matchMedia) {
		userTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light'
	}
	window
		.matchMedia('(prefers-color-scheme: dark)')
		.addEventListener('change', e => {
			!saveUserTheme ? changeTheme() : null
		})

	const themeButton = document.querySelector('.header__theme')
	const resetButton = document.querySelector('.header__reset')
	if (themeButton) {
		themeButton.addEventListener('click', function (e) {
			resetButton.classList.add('active')
			changeTheme(true)
		})
	}
	if (resetButton) {
		resetButton.addEventListener('click', function (e) {
			resetButton.classList.remove('active')
			localStorage.setItem('user-theme', '')
		})
	}

	function setThemeClass() {
		if (saveUserTheme) {
			htmlBlock.classList.add(saveUserTheme)
			resetButton.classList.add('active')
		} else {
			htmlBlock.classList.add(userTheme)
		}
	}

	setThemeClass()

	function changeTheme(saveTheme = false) {
		let currentTheme = htmlBlock.classList.contains('light') ? 'light' : 'dark'
		let newTheme

		if (currentTheme === 'light') {
			newTheme = 'dark'
		} else if (currentTheme === 'dark') {
			newTheme = 'light'
		}
		htmlBlock.classList.remove(currentTheme)
		htmlBlock.classList.add(newTheme)
		saveTheme ? localStorage.setItem('user-theme', newTheme) : null
	}
}

//Animation
const animItems = document.querySelectorAll('._anim-items')

if (animItems.length > 0) {
	function animOnScroll() {
		window.addEventListener('scroll', animOnScroll)
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index]
			const animItemHeight = animItem.offsetHeight
			const animItemOffset = offset(animItem).top
			const animStart = 4

			let animItemPoint = window.innerHeight - animItemHeight / animStart

			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart
			}

			if (
				pageYOffset > animItemOffset - animItemPoint &&
				pageYOffset < animItemOffset + animItemHeight
			) {
				animItem.classList.add('_active')
			} else {
				if (!animItem.classList.contains('_anim-no-hide')) {
					animItem.classList.remove('_active')
				}
			}
		}
	}

	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}

	setTimeout(() => {
		animOnScroll()
	}, 300)
}

//Scroll to
const menuLinks = document.querySelectorAll(
	'.menu__link[data-goto], .button[data-goto], .main-footer__logo[data-goto], .menu-footer__link[data-goto]'
)
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener('click', onMenuLinkClick)
	})

	function onMenuLinkClick(e) {
		const menuLink = e.target
		if (
			menuLink.dataset.goto &&
			document.querySelector(menuLink.dataset.goto)
		) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto)
			const gotoBlockValue =
				gotoBlock.getBoundingClientRect().top +
				pageYOffset -
				document.querySelector('header').offsetHeight

			if (document.documentElement.classList.contains('menu-opened')) {
				document.documentElement.classList.remove('menu-opened')
			}

			window.scrollTo({
				top: gotoBlockValue,
				behavior: 'smooth',
			})
			e.preventDefault()
		}
	}
}
