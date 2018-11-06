/* eslint-disable */
// Set any global variables defined using webpack definePlugin
// in order to stop build breaking
global.ENV_ENVIRONMENT = null
/* eslint-enable */

// eslint-disable-next-line no-undef
export const IS_PROD = ENV_ENVIRONMENT === 'production'
export const WDS_PORT = 8080

export const APP_NAME = 'Craft & Local'

export const API_URL = IS_PROD ? 'https://craftandlocal-v2-production.herokuapp.com' : 'http://localhost:5000'
export const APP_URL = IS_PROD ? 'https://mystifying-volhard-f16793.netlify.com' : `http://localhost:${WDS_PORT}`

export const ASSET_BASE = IS_PROD ? 'https://d2ywlpybgqgstg.cloudfront.net' : 'https://d3ov3mwru83yk6.cloudfront.net'

export const GA_ID = IS_PROD ? 'UA-xxxxxx-xx' : 'UA-xxxxxx-xx'
export const GA_DEBUG = !IS_PROD

export const SHARE_HASHTAGS = 'CraftAndLocal'
export const TWITTER_HANDLE = 'CraftAndLocal'

export const NOT_FOUND_ROUTE = '404'

export const GOOGLE_MAPS_API_KEY = 'AIzaSyAI0dZaZHkO6pUC1maNGg6HALwRX4nG0w4'
export const GOOGLE_MAPS_URL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=geometry`

export const STORAGE_JSON_WEB_TOKEN = 'jwt'
