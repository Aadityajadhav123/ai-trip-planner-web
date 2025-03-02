import React from 'react'
import PlacecardItem from './PlaceCardItem'

function PlacesToVisit({trip}) {
  return (
    <div>
        <h2 className='font-bold text-lg'>placesToVisit</h2>
        <div>
            {trip.tripData?.itinerary.map((item, index) => (
                <div className='mt-5'>

                    <h2 className='font-medium text-lg'>{item.day}</h2>
                    <div className='grid md:grid-cols-2 gap-5'> 
                    {item.plane.map((place, index) => (
                        <div>
                        <h2 className='font-medium text-orange-600 text-sm'>{place.placeName}</h2>
                        <PlacecardItem PlacecardItem={place} />
                        </div>
                    ))}
                </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default PlacesToVisit