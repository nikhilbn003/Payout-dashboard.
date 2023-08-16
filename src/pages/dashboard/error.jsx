import React, { useEffect, useState } from "react";
import { Transition } from "react-transition-group";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import Lottie from "lottie-react";
import congratsAnimation from "../animations/congrats.json";

const RockPaperScissors = () => {
  const [playerChoice, setPlayerChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");
  const [showCongrats, setShowCongrats] = useState(false);
  const [playerWon, setPlayerWon] = useState(false);
  const [playAgain, setPlayAgain] = useState(false);

  const choices = ["rock", "paper", "scissors"];

  function handlePlayerChoice(choice) {
    if (playerWon) {
      return;
    }

    setPlayerChoice(choice);
    generateComputerChoice();
    calculateResult(choice, computerChoice);
  }

  function generateComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    setComputerChoice(choices[randomIndex]);
  }

  function calculateResult(player, computer) {
    if (player === computer) {
      setResult("It's a tie!");
    } else if (
      (player === "rock" && computer === "scissors") ||
      (player === "paper" && computer === "rock") ||
      (player === "scissors" && computer === "paper")
    ) {
      setResult("You win!");
      setShowCongrats(true);
      setPlayerWon(true);
    } else {
      setResult("Computer wins!");
    }
  }

  function handlePlayAgain() {
    setPlayerChoice("");
    setComputerChoice("");
    setResult("");
    setShowCongrats(false);
    setPlayerWon(false);
    setPlayAgain(true);
  }

  useEffect(() => {
    if (playAgain) {
      setPlayAgain(false);
    }
  }, [playAgain]);

  return (
    <div className="flex flex-col items-center justify-center">
      {playAgain ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">Rock Paper Scissors</h1>
          <p className="text-lg mb-2">Choose your move:</p>
          <div className="flex">
            {choices.map((choice) => (
              <button
                key={choice}
                onClick={() => handlePlayerChoice(choice)}
                className="bg-primary hover:bg-green-400 text-white font-bold py-2 px-4 rounded mr-2"
              >
                {choice}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-4">Rock Paper Scissors</h1>
          {playerWon ? (
            <div>
              <p className="text-2xl font-bold mb-2 text-green-500">
                Congratulations! You win!
              </p>
              <button
                onClick={handlePlayAgain}
                className="bg-primary hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
              >
                Play Again
              </button>
            </div>
          ) : (
            <div>
              <p className="text-lg mb-2">Choose your move:</p>
              <div className="flex">
                {choices.map((choice) => (
                  <button
                    key={choice}
                    onClick={() => handlePlayerChoice(choice)}
                    className="bg-primary hover:bg-green-400 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    {choice}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {showCongrats && (
        <div className="mt-4">
          <Lottie animationData={congratsAnimation} loop={false} autoplay />
        </div>
      )}
      <p className="text-lg mt-4">
        Player: {playerChoice} vs Computer: {computerChoice}
      </p>
      <p className="text-lg mt-2">{result}</p>
    </div>
  );
};

const ServerErrorPage = ({ errorCode }) => {
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    setShowPage(true);
  }, []);

  const duration = 500; // Animation duration in milliseconds

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  };

  const transitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
  };

  return (
    <Transition in={showPage} timeout={duration} mountOnEnter unmountOnExit>
      {(state) => (
        <div
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
          className="flex flex-col items-center justify-center h-screen bg-gray-100"
        >
          <div className="text-center mb-8">
            <ExclamationCircleIcon className="h-12 w-12 text-red-500 inline-block mb-2" />
            <h1 className="text-4xl font-bold text-red-500 mb-2">
              Server Error
            </h1>
            <p className="text-xl text-gray-600">Error Code: {errorCode}</p>
          </div>

          <RockPaperScissors />
        </div>
      )}
    </Transition>
  );
};

export default ServerErrorPage;

// import React, { useEffect, useState } from "react";
// import { Transition } from "react-transition-group";
// import { ExclamationCircleIcon } from "@heroicons/react/outline";

// const ServerErrorPage = ({ errorCode }) => {
//   const [showPage, setShowPage] = useState(false);

//   useEffect(() => {
//     setShowPage(true);
//   }, []);

//   const duration = 500; // Animation duration in milliseconds

//   const defaultStyle = {
//     transition: `opacity ${duration}ms ease-in-out`,
//     opacity: 0,
//   };

//   const transitionStyles = {
//     entering: { opacity: 0 },
//     entered: { opacity: 1 },
//   };

//   return (
//     <Transition in={showPage} timeout={duration} mountOnEnter unmountOnExit>
//       {(state) => (
//         <div
//           style={{
//             ...defaultStyle,
//             ...transitionStyles[state],
//           }}
//           className="flex flex-col items-center justify-center h-screen bg-gray-100"
//         >

//           <ExclamationCircleIcon className="h-12 w-12 text-red-500 mb-4 animate-pulse" />
//           <h1 className="text-4xl font-bold text-red-500 mb-4 animate-bounce">
//             Server Error
//           </h1>
//           <p className="text-xl text-gray-600">Error Code: {errorCode}</p>
//         </div>
//       )}
//     </Transition>
//   );
// };

// export default ServerErrorPage;
