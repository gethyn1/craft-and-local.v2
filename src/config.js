/* eslint-disable */
// Set any global variables defined using webpack definePlugin
// in order to stop build breaking
global.ENV_ENVIRONMENT = null
/* eslint-enable */

// eslint-disable-next-line no-undef
export const isProd = ENV_ENVIRONMENT === 'production'
export const WDS_PORT = 8080

export const APP_NAME = 'Craft & Local'

export const API_URL = isProd ? 'https://craftandlocal-v2-production.herokuapp.com' : 'http://localhost:5000'
export const APP_URL = isProd ? 'https://mystifying-volhard-f16793.netlify.com' : `http://localhost:${WDS_PORT}`

export const ASSET_BASE = 'https://d3ov3mwru83yk6.cloudfront.net'

export const GA_ID = isProd ? 'UA-xxxxxx-xx' : 'UA-xxxxxx-xx'
export const GA_DEBUG = !isProd

export const SHARE_HASHTAGS = 'CraftAndLocal'
export const TWITTER_HANDLE = 'CraftAndLocal'

export const NOT_FOUND_ROUTE = '404'

export const GOOGLE_MAPS_API_KEY = 'AIzaSyAI0dZaZHkO6pUC1maNGg6HALwRX4nG0w4'
export const GOOGLE_MAPS_URL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=geometry`
