import Link from 'next/link';
import React, { useContext, useReducer, useState } from 'react';

import Router from 'next/router';
import Image from 'next/image';
const ExoCard = ({
  exo,
  currUser,
  setdeletemessage,
  setAddmessage,
  mine,
  userexos,
}) => {
  /*console.log(
    "exo data is bp=" +
      exo.bodyPart +
      " eqp=" +
      exo.equipment +
      " gifUrl=" +
      exo.gifUrl +
      "target=" +
      exo.target +
      "id"
  );*/
  const [deleted, setdeleted] = useState(false);
  //const user = JSON.parse(currUser);

  const [exoExist, setExoExist] = useState(
    userexos?.filter((e) => e.exo_Id === exo.id).length > 0 ? false : true
  );
  const delete_user = async () => {
    if (Object.keys(currUser).length > 0) {
      setdeletemessage(true);
      setdeleted(true);
      setExoExist(true);
      setTimeout(() => {
        setdeletemessage(false);
      }, 3000);
      const favs = await fetch(`/api/UserFavor/${JSON.parse(currUser).id}`, {
        method: 'DELETE',
        body: JSON.stringify({
          exoId: exo.id,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      const favdata = await favs.json();
      console.log(favdata);
    }
  };
  const addexo_to_user = async () => {
    console.log(currUser);
    if (Object.keys(currUser).length > 0) {
      setAddmessage(true);

      setExoExist(false);
      setTimeout(() => {
        setAddmessage(false);
      }, 3000);

      const favs = await fetch(`/api/UserFavor/${currUser.id}`, {
        method: 'POST',
        body: JSON.stringify({
          exoId: exo.id,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      const favdata = await favs.json();
      console.log(favdata);
    } else {
      Router.push({
        pathname: '/Login',
      });
    }
  };
  const sendProps = () => {
    console.log(currUser);
    Router.push({
      pathname: `/Exercise/${exo.id}`,
      query: {
        exoId: exo.id,
        currUser: JSON.stringify(currUser),
      },
    });
  };
  return (
    <div
      className={` ${
        deleted && 'hidden'
      } transition-all min-w-[25%] max-h-[500px] hover:scale-105  w-[400px] border-t-[6px] border-cyan-500  bg-slate-100 text-slate-900 text-lg text-left rounded-md  h-fit`}
    >
      <a className=" cursor-pointer" onClick={() => sendProps()}>
        <Image
          src={exo.gifUrl}
          // layout="fill" // required
          //objectFit="cover" // change to suit your needs
          alt="image"
          width={400}
          height={350}
          loading="lazy"
          placeholder="blur"
          blurDataURL={exo.gifUrl}
        />
      </a>
      <div className="ml-2 my-2 flex flex-row gap-5   text-white ">
        <p className="py-2 px-4 rounded-xl flex items-center bg-cyan-700">
          {exo.target}
        </p>
        <p className=" py-2 px-4 rounded-xl flex items-center bg-slate-700">
          {exo.bodyPart}
        </p>
      </div>
      <div className="my-3 mx-2 flex flex-row justify-between items-center">
        <p> {exo.name}</p>
        {!mine ? (
          <>
            {exoExist ? (
              <button
                className="rounded-md bg-cyan-700 p-3 text-white"
                onClick={(e) => {
                  e.preventDefault();
                  addexo_to_user();
                }}
              >
                ADD
              </button>
            ) : (
              <div className="flex flex-row-reverse items-center  justify-center gap-3 rounded-md border-2 border-cyan-700 p-2 text-cyan-700">
                <p className="text-base">ADDED</p>
                <Image
                  src="/Added.png"
                  alt=""
                  className="w-8"
                  width={32}
                  height={32}
                />
              </div>
            )}
          </>
        ) : (
          <>
            <button
              className="deletebut flex flex-row-reverse items-center hover:bg-red-800 hover:text-white  justify-center gap-3 rounded-md border-2 border-red-700 p-2 text-red-700"
              onClick={(e) => {
                e.preventDefault();
                delete_user();
              }}
            >
              <p> DELETE</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="trashicon w-8  fill-red-700"
                viewBox="0 0 448 512"
              >
                <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ExoCard;
