import Modal from '@components/Modal/Modal';
import SignInForm from '@components/SignInForm';
import SignUpForm from '@components/SignUpForm';
import ThemeToggle from '@components/ThemeToggle';
import React, { useRef, useState } from 'react';

const Header: React.FC = () => {
  const [signInFormActive, setSignInFormActive] = useState(false);
  const [signUpFormActive, setSignUpFormActive] = useState(false);

  const ref = useRef(null);

  function toggleForm() {
    setSignInFormActive((prev) => !prev);
    setSignUpFormActive((prev) => !prev);
  }

  return (
    <header className="bg-background dark:bg-background-dark sticky top-0 flex px-3 md:px-4 shadow-xl dark:shadow-lg dark:shadow-gray-700 z-10">
      <p className="font-kanit italic font-bold text-2xl text-transparent bg-clip-text mr-auto bg-linear-to-tr from-blue-400 to-blue-600 py-2 select-none">
        NOTES
      </p>
      <div className="ml-auto my-auto">
        {signInFormActive && !signUpFormActive && (
          <Modal closeModal={() => setSignInFormActive(false)} btnRef={ref}>
            <SignInForm
              closeForm={() => setSignInFormActive(false)}
              toggleForm={toggleForm}
            />
          </Modal>
        )}
        {signUpFormActive && !signInFormActive && (
          <Modal closeModal={() => setSignInFormActive(false)} btnRef={ref}>
            <SignUpForm
              closeForm={() => setSignInFormActive(false)}
              toggleForm={toggleForm}
            />
          </Modal>
        )}
        <button
          ref={ref}
          className="bg-blue-500 py-1 px-4 rounded-md font-quicksand font-bold text-gray-100 cursor-pointer hover:animate-jello"
          onClick={() => setSignInFormActive(true)}
        >
          Log in
        </button>
      </div>
      <ThemeToggle />
    </header>
  );
};

export default Header;
