import axios from "axios"

const BASE_URL = 'https://places.googleapis.com/v1/places:searchText'

const conig={
    headers:{
        'Content-Type':'application/json',
        'X-Goog-api-key':import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
        'X-Goog-fieldmask':[
            'places.photos',
            'places.displayName',
            'places.id'
        ]
    }
}

export const GetPlacesDetails=(data)=>axios.post(BASE_URL,data,conig)
export const  PHOTO_REF_URL='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=800&maxWidthPx=800&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY