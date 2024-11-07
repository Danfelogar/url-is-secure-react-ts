import { FaCrown } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';
import { StatusBtn, SwitchBtn } from './components';
import { useManagementURL } from './hooks';
import { MdAdsClick } from 'react-icons/md';
import { PiCursorClickBold } from 'react-icons/pi';
import { CgSandClock } from 'react-icons/cg';
import { GiSuspicious } from 'react-icons/gi';
import { BiError } from 'react-icons/bi';
import { RiAlarmWarningFill } from 'react-icons/ri';
import { formatTimeHHmmss } from './util';
import { useEffect } from 'react';

function App() {
  const {
    //states
    allowScanningUrls,
    sessionTimeCounter,
    clicksWithCounter,
    clicksWithoutCounter,
    maliciousCounter,
    suspiciousCounter,
    harmlessCounter,
    //methods
    //functions
  } = useManagementURL();

  // App.tsx
  useEffect(() => {
    chrome?.storage?.local?.get(['someData'], (result) => {
      console.log('Recuperado desde storage en App.tsx:', result.someData);
    });
  }, []);

  useEffect(() => {
    // Escuchar los mensajes del background script
    chrome?.runtime?.onMessage?.addListener((message) => {
      if (message.type === 'urlScanResponse') {
        // Aquí tienes los datos de la respuesta de tu API
        console.log('Datos recibidos desde el background:', message.data);
        // Aquí puedes hacer lo que necesites con los datos recibidos
      }
    });
  }, []);

  return (
    <div className="flex flex-row p-3 gap-3 backdrop-blur-xl bg-black/20 w-[25rem] border-[2.5px] border-gold">
      <div className="flex w-[55%] flex-col gap-2 border-gold border-r-2 pr-3">
        <h1 className="text-lab font-bold text-lg">Dashboard</h1>
        <div className="gap-1 flex flex-row">
          <MdAdsClick size={`1rem`} color={`#f4f6fc`} />
          <h3 className="text-alpes text-sm">Clicks With</h3>
        </div>
        <h4 className="text-palo font-semibold text-sm">{clicksWithCounter}</h4>
        <div className="gap-1 flex flex-row">
          <PiCursorClickBold size={`1rem`} color={`#f4f6fc`} />
          <h3 className="text-alpes text-sm">Clicks Without</h3>
        </div>
        <h4 className="text-palo font-semibold text-sm">
          {clicksWithoutCounter}
        </h4>
        <div className="gap-1 flex flex-row">
          <CgSandClock size={`1rem`} color={`#f4f6fc`} />
          <h3 className="text-alpes text-sm">Session Time</h3>
        </div>
        <h4 className="text-palo font-semibold text-sm">
          {formatTimeHHmmss(sessionTimeCounter)}
        </h4>
        <div className="gap-1 flex flex-row">
          <RiAlarmWarningFill size={`1rem`} color={`#f4f6fc`} />
          <h3 className="text-alpes text-sm">Malicious</h3>
        </div>
        <h4 className="text-palo font-semibold text-sm">{maliciousCounter}</h4>
        <div className="gap-1 flex flex-row">
          <BiError size={`1rem`} color={`#f4f6fc`} />
          <h3 className="text-alpes text-sm">Suspicious</h3>
        </div>
        <h4 className="text-palo font-semibold text-sm">{suspiciousCounter}</h4>
        <div className="gap-1 flex flex-row">
          <GiSuspicious size={`1rem`} color={`#f4f6fc`} />
          <h3 className="text-alpes text-sm">Harmless</h3>
        </div>
        <h4 className="text-palo font-semibold text-sm">{harmlessCounter}</h4>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center">
            <img
              src="logoWithoutBg.png"
              className="w-[3.5rem] h-[3.5rem]"
              alt="logo"
            />
            <h1 className="text-snow font-bold text-lg">Cypherser</h1>
          </div>
          <div className="flex flex-row items-center gap-3">
            <button className="border-2 flex items-center border-gold rounded-lg p-2 cursor-pointer px-2 gap-2.5">
              {/* <p className="text-gold">Premiun</p> */}
              <FaCrown size={'1.2rem'} color={`#caaa39`} />
            </button>
            <FaGear
              color={`#939393`}
              className="cursor-pointer"
              size={'1.4rem'}
            />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-snow font-semibold text-sm">
            do you allow us to scan your browser urls?
          </h3>
          <SwitchBtn />
        </div>
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-snow font-semibold text-lg">
            Remember that you give us access to:
          </h3>
        </div>
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-row justify-between items-center"
          >
            <ul className="list-disc">
              <li className="list-disc list-inside marker:text-snow text-palo font-semibold text-sm">
                Lorem ipsum, dolor sit amet
              </li>
            </ul>
          </div>
        ))}
        <div className="flex flex-row justify-center items-center w-full mb-4">
          <StatusBtn
            type={allowScanningUrls ? 'protected' : 'not-protected'}
            statusLabel={allowScanningUrls ? 'Protected' : 'Not Protected'}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
