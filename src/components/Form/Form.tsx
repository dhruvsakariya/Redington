'use client';
import React from 'react'

import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import Modal from 'react-modal';
import { GrClose } from 'react-icons/gr';

const Form = () => {
  return (
    <Modal
      ariaHideApp={false}
      isOpen={true}
      className={'modal_1'}
      onRequestClose={() => {
        // setShow(-1);
      }}
      shouldCloseOnOverlayClick
      overlayClassName="overlay_1"
    >
      <div className={'bg-white rounded-md p-1 max-w-[400px] m-3 '}>
        <GrClose
          className="block  ml-auto bg-whiteFade rounded-full cursor-pointer p-2.5 mb-3"
          size={36}
          onClick={() => {
            // setShow(-1);
          }}
        />

        <form className="flex max-w-md flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="email1"
                value="Your email"
              />
            </div>
            <TextInput
              id="email1"
              placeholder="name@flowbite.com"
              required
              type="email"
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="password1"
                value="Your password"
              />
            </div>
            <TextInput
              id="password1"
              required
              type="password"
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">
              Remember me
            </Label>
          </div>
          <button type="submit" className='group flex h-min items-center justify-center p-2 text-center font-medium relative focus:z-10 focus:outline-none text-white bg-cyan-700 border border-transparent enabled:hover:bg-cyan-800 focus:ring-cyan-300 dark:bg-cyan-600 dark:enabled:hover:bg-cyan-700 dark:focus:ring-cyan-800 rounded-lg focus:ring-2' >
            Submit
          </button>
        </form>
      </div>
    </Modal>

  )
}

export default Form