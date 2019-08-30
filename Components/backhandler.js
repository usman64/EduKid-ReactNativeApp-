export let mybackhandler = {
    curr: null,
    prev: null
}

export let currScreen = 'Home'

export const changeCurrScreen = (screen) => {
    currScreen = screen
    console.log('currScreen',currScreen)
}

// export const setmyBackHandler = (bh) => {
//     mybackhandler = bh
//     console.log('set',mybackhandler)
// }

// export const removemyBackHandler = (bh) => {
//     console.log('remove', bh)
//     bh.remove()
// }