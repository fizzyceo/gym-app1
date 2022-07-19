import React from 'react';
import Link from 'next/link';
import { useState } from 'react';

import { useSession, signOut } from 'next-auth/react';
import Router from 'next/router';
import Image from 'next/image';

const Navbar = ({ currUser }) => {
  const { data: session, loading } = useSession();
  const [dropdown, setdropdown] = useState(false);
  const [url, seturl] = useState('');
  //use router to pass curruser to different links

  const pushuser = (passedurl) => {
    seturl(passedurl);
    console.log(url);
    Router.push({
      pathname: url,
      query: {
        ...Router.query,
        user: JSON.stringify(currUser),
      },
    });
  };

  return (
    <nav
      className={`z-10 w-screen py-4 px-14  shadow-lg shadow-cyan-700 bg-gradient-to-r from-blue-900 to-cyan-900 text-white flex flex-row justify-between  items-center`}
    >
      <Image src="/dumbbell.png" alt="" height={48} width={48} />
      <ul className="flex flex-row gap-4 text-lg font-serif items-center justify-center">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/#Exos">Exercise</Link>
        </li>
        {!session ? (
          <li className=" ml-[50px]">
            <Link href="/Login">
              <span
                className={`bg-green-600 px-7 py-3 cursor-pointer  font-semibold rounded-lg  `}
              >
                Sign-In
              </span>
            </Link>
          </li>
        ) : (
          <div className="relative">
            <button
              className="lg:ml-[160px] md:ml-[100px] ml-[40px] "
              onClick={() => setdropdown(!dropdown)}
            >
              <Image
                src={session.user.image}
                width={48}
                height={48}
                alt=""
                //  placeholder="blur"
                //blurDataURL={session.user.image}
                className="ml-[160px]  rounded-full"
              />
            </button>
            {dropdown && (
              <div className="z-10 top-12 left-5 absolute bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700">
                <ul
                  className="py-1 text-sm text-gray-700  dark:text-gray-200"
                  aria-labelledby="dropdownDefault"
                >
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        e.currentTarget.disabled = false;
                        pushuser(`/Profile/${currUser.id}`);
                      }}
                      className="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        e.currentTarget.disabled = false;
                        pushuser(`/OwnExo/${currUser.id}`);
                      }}
                      className="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      My Exercises
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={() => signOut()}
                      className=" w-full  px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
