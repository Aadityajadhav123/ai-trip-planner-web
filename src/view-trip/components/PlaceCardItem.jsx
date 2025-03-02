import { GetPlacesDetails, PHOTO_REF_URL } from '@/service/GlobelApi';
import React, { useEffect, useState } from 'react'
//import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';


function PlaceCardItem({Place}) {
    const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    Place && GetPlacePhoto();
  }, [Place]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: Place.placeName,
    };
    const result = await GetPlacesDetails(data).then((resp) => {
      if (resp.data.places && resp.data.places[0].photos && resp.data.places[0].photos.length > 0) {
        const photoName = resp.data.places[0].photos[0].name;
        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
        setPhotoUrl(PhotoUrl);
      }
    }).catch((error) => {
      console.error('Error fetching place photo:', error);
    });
  };

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' +place.placeName} target='_blank'>
    <div className='border rounded-xl p-3 mt-2 gap-5 hover:scal-105 transition-all hover:shadow-md cursor-pointer'>
        
        <img src={photoUrl?photoUrl:"/travel.jpg" }alt="img" className='w-[130px] h-[130px] rounded-xl object-cover' />

        <div className=''>
            <h2 className='font-bold text-lg'>{Place.placeName}
            <p className='text-sm text-gray-500'>{place.placeDetails}</p>
            <h2 className='mt-2'>🕛{place.timeToTravel}</h2>           
            {/* <Button ><FaMapLocationDot />
            </Button> */}
            </h2>
        </div>
    </div>
   </Link>
  )
}

export default PlaceCardItem