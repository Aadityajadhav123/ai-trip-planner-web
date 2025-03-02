import { GetPlacesDetails, PHOTO_REF_URL } from '@/service/GlobelApi';
import React, { useEffect, useState } from 'react';

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip.userSelection.location.label,
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
    <Link to={`/view-trip/${trip.id}`}>
    <div className='hover:scale-105 transition-all'>
      <img src={photoUrl ? photoUrl : '/travel.jpg'} alt='img' className='object-cover rounded-xl h-[220px]' />
      <div>
        <h2 className='font-bold text-lg mt-2'>
          {trip?.userSelection?.location?.label}
        </h2>
        <h2 className='text-sm text-gray-500'>
          {trip?.userSelection.noOfDays} Days trip with {trip?.userSelection?.budget} Budget
        </h2>
      </div>
    </div>
    </Link>
  );
}

export default UserTripCardItem;