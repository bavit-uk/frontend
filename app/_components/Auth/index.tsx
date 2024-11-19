'use client';

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { useAppSelector } from '../_lib/hooks';
import Login from './Login';
import Register from './Register';
// import { closeModal } from "@lib/features/auth/authSlice";
import Image from 'next/image';

const AuthModal = ({}) => {
  const isOpen = useAppSelector((state) => state.authModal.opened);
  const mode = useAppSelector((state) => state.authModal.mode);
  const title = useAppSelector((state) => state.authModal.title);
  const message = useAppSelector((state) => state.authModal.message);
  // const dispatch = useAppDispatch();

  const close = () => {
    // dispatch(closeModal());
  };

  return (
    <Transition appear show={isOpen}>
      <Dialog
        as='div'
        className='relative z-10 focus:outline-none'
        onClose={close}
      >
        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center bg-black/70 p-4 backdrop-blur-sm'>
            <TransitionChild
              enter='ease-out duration-300'
              enterFrom='opacity-0 transform-[scale(95%)]'
              enterTo='opacity-100 transform-[scale(100%)]'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 transform-[scale(100%)]'
              leaveTo='opacity-0 transform-[scale(95%)]'
            >
              <DialogPanel className='w-full max-w-lg rounded-xl bg-white p-6'>
                <Image
                  src='/logo.svg'
                  alt='Logo'
                  width={70}
                  height={70}
                  className='mx-auto'
                />
                <DialogTitle
                  as='h3'
                  className='!smb-4 text-center text-4xl font-medium'
                >
                  {title?.length
                    ? title
                    : mode === 'login'
                      ? 'Login'
                      : 'Sign Up'}
                </DialogTitle>

                {message?.length ? (
                  <p className='my-2 text-center text-gray-500'>{message}</p>
                ) : null}

                {mode === 'login' ? <Login /> : <Register />}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AuthModal;
