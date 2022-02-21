export const actualizeTheme = () => {
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

export const setTheme = theme => {
  if (theme === 'system') {
    localStorage.removeItem('theme')
  } else {
    localStorage.theme = theme
  }
  actualizeTheme()
}

export const getTheme = () => ('theme' in localStorage ? localStorage.theme : 'system')
