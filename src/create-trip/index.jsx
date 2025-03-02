import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { SelectBudgetOptions, SelectTravelesList, AI_PROMPT } from '@/constants/option';
import { Toaster } from '@/components/ui/sonnar';
import { chatSession } from '@/service/AIModel';
import { toast } from 'sonner';
// this is for signup 
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';


function CreateTrip() {
  const [place, setPlace] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const onGenrateTrip = async () => {
    const user = localStorage.getItem('user');
  }

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'))
    const docId = Data.now().toString()
    await setDoc(doc(db, "AiTrips", "LA"), {
      userSelection: formData,
      TripData: JSON.parse (TripData),
      userEmail: user.email,
      id: docId,
    });
    setLoading(false);
    navigate(`/view-trip/${docId}`);

    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (!formData?.noofDays || !formData?.location || !formData?.budget || !formData?.traveler) {
      toast('Please fill all the fields');
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData.location)
      .replace('{noofDays}', formData.noofDays)
      .replace('{budget}', formData.budget)
      .replace('{traveler}', formData.traveler)
      .replace('{totalDays}', formData.noofDays);



    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log("--", result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json',
      },
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      onGenrateTrip();
    }).catch((error) => {
      console.error('Error fetching user profile:', error);
    });
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 '>
      <h1 className='font-bold text-3xl'> Tell us Your travel preferences 🏕️</h1>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic info, and our trip planner will generate a customized itinerary based on your preferences.</p>

      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl font-medium my-3'>
            What is the destination of your trip?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => { setPlace(v); handleInputChange('location', v.label) },
            }}
          />
        </div>
        <div>
          <h2 className='text-xl font-medium my-3'>
            How many days are you planning to stay?
          </h2>
          <input type='number' placeholder={'ex.3'} className='border border-gray-300 rounded-md p-2 w-full'
            onChange={(e) => handleInputChange('noofDays', e.target.value)}
          />
        </div>
      </div>

      <div className='mt-10'>
        <h2 className='text-xl font-medium my-3'>
          what is your budget?
        </h2>
        <div className='grid grid-cols-3 gap-4 mt-5'>
          {SelectBudgetOptions.map((item, index) => (
            <div key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 border rounded-lg hover:shadow-xl cursor-pointer 
              ${formData.budget === item.title ? 'border-black' : 'border-gray-300'}`}>
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>

        <div className='mt-10'>
          <h2 className='text-xl font-medium my-3'>
            who do you plan on traveling with on your adventure?
          </h2>
          <div className='grid grid-cols-3 gap-4 mt-5'>
            {SelectTravelesList.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('traveler', item.people)}
                className={`p-4 border rounded-lg hover:shadow-xl cursor-pointer
                ${formData.traveler === item.people ? 'border-black' : 'border-gray-300'}`}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='my-10 flex justify-end '>
        <Button
          disabled={loading}
          onClick={onGenrateTrip} >
          {loading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Genrate Trip'}

        </Button>
      </div>
      <Dialog open={openDialog} >
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription>
              <img src='/logo.svg' alt='login' />
              <h2 className='font-bold text-lg mt-2'>Sign in with Google</h2>
              <span className='font-bold'>Sign in to the App with Google Authentication securely</span>
              <Button
                onClick={login}
                className='w-full my-2 flex gap-4 items-center'>
                <FcGoogle className='h-13 w-7 flex' />
                Sign in with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  );
}

export default CreateTrip;
