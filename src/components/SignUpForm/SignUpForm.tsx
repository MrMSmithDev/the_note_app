import { EmailIcon, HidePasswordIcon, ShowPasswordIcon, UserIcon } from '@components/icons';
import React, { useState } from 'react';

export interface SignUpFormProps {
  closeForm: () => void;
  toggleForm: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ closeForm, toggleForm }) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  const [revealPassword, setRevealPassword] = useState<boolean>(false);
  const [revealRepeatPassword, setRevealRepeatPassword] =
    useState<boolean>(false);

  function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.currentTarget.value);
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.currentTarget.value);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.currentTarget.value);
  }

  function handleRepeatPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRepeatPassword(e.currentTarget.value);
  }

  function toggleRevealPassword(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setRevealPassword((prev) => !prev);
  }

  function toggleRevealRepeatPassword(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setRevealRepeatPassword((prev) => !prev);
  }

  function switchForm(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    toggleForm();
  }

  function submitForm(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();

    console.log(username);
    console.log(email);
    console.log(password);
    console.log(repeatPassword);

    closeForm();
  }

  return (
    <form className="flex flex-col gap-5 bg-background dark:bg-background-dark rounded-md p-5">
      <h3 className="font-kanit font-bold text-2xl text-transparent bg-clip-text mr-auto bg-linear-to-tr from-blue-400 to-blue-600 py-2 select-none w-full text-center">
        Sign up
      </h3>
      <div className="relative">
        <UserIcon className="absolute h-5 w-5 top-2 left-2" />
        <label className="sr-only" htmlFor="username"></label>
        <input
          className="w-full p-2 rounded border-gray-200 border-2 border-solid dark:border-gray-800 focus:outline-gray-300 text-gray-800 dark:text-gray-200 tracking-wide pl-8"
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div className="relative">
        <EmailIcon className="absolute h-5 w-5 top-2 left-2" />
        <label className="sr-only" htmlFor="email"></label>
        <input
          className="w-full p-2 rounded border-gray-200 border-2 border-solid dark:border-gray-800 focus:outline-gray-300 text-gray-800 dark:text-gray-200 tracking-wide pl-8"
          type="email"
          name="email"
          id="email"
          placeholder="Email@example.com"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className="relative">
        <button
          onClick={toggleRevealPassword}
          className="absolute h-5 w-5 top-2 left-2 cursor-pointer"
        >
          <span className="sr-only">show password</span>
          {revealPassword ? <ShowPasswordIcon /> : <HidePasswordIcon />}
        </button>
        <label className="sr-only" htmlFor="password"></label>
        <input
          className="w-full p-2 rounded border-gray-200 border-2 border-solid dark:border-gray-800 focus:outline-gray-300 text-gray-800 dark:text-gray-200 tracking-wide pl-8"
          type={revealPassword ? 'text' : 'password'}
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div className="relative">
        <button
          onClick={toggleRevealRepeatPassword}
          className="absolute h-5 w-5 top-2 left-2 cursor-pointer"
        >
          <span className="sr-only">show repeat password</span>
          {revealRepeatPassword ? <ShowPasswordIcon /> : <HidePasswordIcon />}
        </button>
        <label className="sr-only" htmlFor="repeatPassword"></label>
        <input
          className="w-full p-2 rounded border-gray-200 border-2 border-solid dark:border-gray-800 focus:outline-gray-300 text-gray-800 dark:text-gray-200 tracking-wide pl-8"
          type={revealRepeatPassword ? 'text' : 'password'}
          name="repeatPassword"
          id="repeatPassword"
          placeholder="Repeat password"
          value={repeatPassword}
          onChange={handleRepeatPasswordChange}
        />
      </div>
      <button
        type="submit"
        className="py-2 px-4 rounded-md font-quicksand font-bold text-gray-100 mr-auto bg-linear-to-tr from-blue-400 to-blue-600 w-full cursor-pointer shadow"
        onClick={submitForm}
      >
        Sign up
      </button>
      <div className="text-center">
        <p className="text-gray-800 dark:text-gray-200 text-xs">
          Already have an account?
        </p>
        <button
          onClick={switchForm}
          className="text-blue-400 text-sm font-bold cursor-pointer"
        >
          Sign in
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
