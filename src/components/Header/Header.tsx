import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 flex px-3 md:px-4 shadow-xl">
      <p className="font-kanit italic font-bold text-2xl text-transparent bg-clip-text mr-auto bg-linear-to-tr from-blue-400 to-blue-600 py-2">NOTES</p>
      <div className="ml-auto my-auto">
      {/* TODO: Add auth display here if logged in */}
        <button className="bg-blue-500 py-1 px-4 rounded-md font-quicksand font-bold text-gray-100 cursor-pointer hover:animate-jello">Log in</button>
      </div>
    </header>
  );
};

export default Header;
