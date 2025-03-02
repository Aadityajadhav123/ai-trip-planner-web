import React, { useEffect, useState } from 'react';
import { Button } from '../button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';


function Header() {

  const user=JSON.parse(localStorage.getItem('user'));
  
const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    console.log(user);
  },[]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

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
      window.location.reload();
    });
  };

  return (
    <div className='w-full p-2 flex justify-between items-center px-4'>
      <img src='/logo.svg' alt="logo img" className='h-10 ' />
      <div>
        {user ?
        <div  className='flex items-center gap-3'>
         <a href='/Create-trip'>
          <Button variant="outline" className='rounded-full '>+ Create Trip</Button>
          </a>
          <a href='/my-trips'>
          <Button variant="outline" className='rounded-full '>My Trip</Button>
          </a> 
          <Popover>
          <PopoverTrigger>
          <img src={user?.picture} className='h-[35px] w-[35px] rounded-full ' alt="img" />

          </PopoverTrigger>
          <PopoverContent>
            <h2 className="cursor-pointer "onClick={()=>{
              googleLogout();
              localStorage.clear();
              window.location.reload();
            }}>Logout</h2>
              </PopoverContent>
          </Popover>

        </div>:
        <Button className='' onClick={()=>setOpenDialog(true)}>Sign In</Button>
        
      }
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
    </div>
  );
}



export default Header;
