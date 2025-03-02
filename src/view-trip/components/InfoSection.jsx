import { Button } from '@/components/ui/button';
import { GetPlacesDetails, PHOTO_REF_URL } from '@/service/GlobelApi';
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";


function InfoSection({trip}) {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(()=>{
    trip && GetPlacePhoto();
},[trip])

  const GetPlacePhoto=async()=>{
    const data={
      textQuery:trip.userSelection.location.label
    }
    const result=await GetPlacesDetails(data).then(resp=>{
      console.log(resp.data.places[0].photos[3].name);
    
      const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
    })
  }

  return (
    <div >
        <img src={photoUrl?photoUrl:"/travel.jpg" } alt='img' className='h-[340] w-full  object-cover rounded-xl' />
        <div className='flex justify-between items-center '>
        <div className='flex flex-col gap-2  my-5'>
         <h2 className='font-bold text-2xl '>{trip?.userSelection?.location?.label}</h2>
          <div className='flex gap-5'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>📅{trip?.userSelection?.noOfDays}Day</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💰{trip?.userSelection?.budged}budged</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🥂No. of Travelers:{trip?.userSelection?.traveler}Day</h2>
          </div>
       </div>
       <Button><IoIosSend />
       </Button>
    </div>
    </div>
  )
}

export default InfoSection