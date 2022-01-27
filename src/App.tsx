import React from 'react';
import {
  ChangeEvent,
  createRef,
  FormEvent,
  HTMLAttributes,
  useRef,
  useState,
} from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import wizardStanding from './assets/1.svg';
import wizardSpell from './assets/2.svg';
import wizardDone from './assets/3.svg';

function App() {
  const [url, setUrl] = useState('');
  const [shortening, setShortening] = useState('none');
  const urlForm = createRef<HTMLFormElement>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShortening('shortening');
    const urlreq = await fetch('/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        long_url: url,
        random: true,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setShortening('done');
        if (res.status === 'success') {
          setUrl(res.message);
          navigator.clipboard.writeText(res.message);
        } else {
          alert(res.message);
        }
      });
  };

  return (
    <div className="App w-screen h-screen">
      <div className={'bg-slate-200 w-full h-full p-8'}>
        <div className={'flex flex-col'}>
          <h1 className={'text-7xl font-black text-red-500'}>Urls</h1>
          <h1 className={'text-7xl mt-5 font-bold text-gray-700'}>when</h1>
          <h1 className={'text-7xl mt-3 font-bold text-gray-700'}>
            the shorter,
          </h1>
          <form
            ref={urlForm}
            className={'grow'}
            onSubmit={(e) => handleSubmit(e)}
          >
            <div
              className={
                'rounded-lg px-5 w-full h-16 self-center bg-slate-300 mt-7 flex flex-row items-center'
              }
              onClick={() => {
                if (shortening === 'done') {
                  setShortening('none');
                  setUrl('');
                }
              }}
            >
              <div
                className={'sm:flex w-32 items-center justify-evenly hidden'}
              >
                <div className={'bg-red-500 button'} />
                <div className={'bg-yellow-500 button'} />
                <div className={'button bg-green-500'} />
              </div>
              <div
                className={'sm:flex flex-row w-16 mr-3 justify-evenly hidden'}
              >
                <div
                  className={
                    'rounded-md w-6 bg-slate-400 h-6 flex items-center justify-center'
                  }
                >
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    className={'text-gray-700'}
                  />
                </div>
                <div
                  className={
                    'rounded-md w-6 bg-slate-400 h-6 flex items-center justify-center'
                  }
                >
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className={'text-gray-700'}
                  />
                </div>
              </div>
              <input
                className={'h-10 rounded-lg w-full p-3 focus:outline-0'}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                type={'url'}
                required
                disabled={shortening === 'shortening' || shortening === 'done'}
                name={'url'}
              />
            </div>
            <h1 className={'text-7xl mt-3 font-bold text-gray-700'}>
              the better
            </h1>
            <button
              className={
                'w-96 h-16 mt-5 rounded-lg bg-cyan-500 font-bold text-white text-2xl'
              }
              type={shortening !== 'done' ? 'submit' : 'button'}
              onClick={() => {
                if (shortening === 'done') {
                  setUrl('');
                  setShortening('none');
                } else setShortening('shortening');
              }}
            >
              {shortening === 'shortening'
                ? 'Shortening...'
                : shortening === 'done'
                ? 'Shortened!'
                : 'Shorten'}
            </button>
          </form>
        </div>
        {shortening === 'shortening' ? (
          <img src={wizardSpell} className={'character'} draggable={false} />
        ) : shortening === 'none' ? (
          <img src={wizardStanding} className={'character'} draggable={false} />
        ) : shortening === 'done' ? (
          <img src={wizardDone} className={'character'} draggable={false} />
        ) : null}
      </div>
    </div>
  );
}

export default App;
