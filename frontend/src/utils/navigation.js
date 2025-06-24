let navigateFn = null
console.log(navigateFn);


export const setNavigate = (nav) => {
    navigateFn = nav
}

export const navigateTo = (path) => {
    if(navigateFn) navigateFn(path)
}