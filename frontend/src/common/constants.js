export const STATUS = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS'
}

const sizes = {
  smallScreenMaxSize: '800px',
  mediumScreenMaxSize: '1300px',
}

export const devices = {
  smallScreen: `(max-width: ${sizes.smallScreenMaxSize})`,
  mediumScreen: `(min-width: ${sizes.smallScreenMaxSize})`,
  largeScreen: `(min-width: ${sizes.mediumScreenMaxSize})`,
}