import { FaCrown } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';
import { StatusBtn, SwitchBtn } from './components';

function App() {
  chrome?.tabs?.query({ active: true, currentWindow: true }, (tabs) => {
    // Asegúrate de que haya al menos una pestaña activa
    if (tabs.length > 0) {
      const activeTab = tabs[0];
      const url = activeTab.url; // Aquí está la URL de la pestaña activa
      console.log('URL de la pestaña activa:', url);

      // Aquí puedes implementar tu lógica adicional
    }
  });
  return (
    <div className="flex flex-col p-2.5 gap-3 bg-slate-800 w-[25rem]">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <img
            src="logoWithoutBg.png"
            className="w-[4rem] h-[4rem]"
            alt="logo"
          />
          <h1 className="text-white font-bold text-lg">Cypherser</h1>
        </div>
        <div className="flex flex-row items-center gap-3">
          <button className="border flex items-center border-amber-400 rounded-lg p-2 cursor-pointer px-4 gap-2.5">
            <p className="text-amber-400">Premiun</p>
            <FaCrown color={`#fbbf24`} />
          </button>
          <FaGear
            color={`#71717a`}
            className="cursor-pointer"
            size={'1.4rem'}
          />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <h3 className="text-white font-semibold text-sm">
          do you allow us to <br></br>scan your browser urls?
        </h3>
        <SwitchBtn />
      </div>
      <div className="flex flex-row justify-between items-center">
        <h3 className="text-white font-semibold text-lg">
          Remember that you give us access to:
        </h3>
      </div>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex flex-row justify-between items-center">
          <ul className="list-disc">
            <li className="list-disc list-inside marker:text-white text-slate-400 font-semibold text-sm">
              Lorem ipsum, dolor sit amet
            </li>
          </ul>
        </div>
      ))}
      <div className="flex flex-row justify-center items-center w-full mb-4">
        <StatusBtn type="not-protected" statusLabel="Not Protected" />
      </div>
    </div>
  );
}

export default App;
