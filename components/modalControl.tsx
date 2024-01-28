import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useModal } from '../context/modalContext';

//modals
import RegisterContent from './com1';
import Com2 from './com2';
import Com3 from './com3';


const ModalControl = () => {
    const { isModalOpen, hideModal, modalName } = useModal();


    const renderModalContent = () => {
        switch (modalName) {
            case 'com1':
                return (
                    <RegisterContent/>
                );
            case 'com2':
                return (
                    <Com2/>
                );

                case 'com3':
                return (
                    <Com3/>
                );
            // Add more cases as needed
            default:
                return null; // or some default component if you like
        }
    };

    return (
        <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={hideModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/80" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">

            <div className="flex min-h-full items-center justify-center p-4 text-center">
            <div className=' flex min-h-full justify-center p-4 text-center w-[440px] relative'>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full border-2 max-w-md bg-orange-200 transform overflow-hidden rounded-2xl p-6 align-middle  transition-all">
                  
                  
                 {renderModalContent()}
                </Dialog.Panel>
              </Transition.Child>

            <button className=' bg-cyan-300 h-[30px] absolute -bottom-10 md:top-4 md:-right-10'>close</button>
                </div>
            </div>
          
          </div>
        </Dialog>
      </Transition>
    );
};

export default ModalControl;


