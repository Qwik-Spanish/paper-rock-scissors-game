import { component$, useStore, $ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  const game = useStore({
    data: {
      result: 'Waiting for the first play...',
      pointsUser: 0,
      pointsComp: 0,
    },
  });

  const getComputerChoice = $(async () => {
    const choices = ['r', 'p', 's']; // Roca, Pape, Tijeras
    const randomChoice = Math.floor(Math.random() * 3);
    return choices[randomChoice];
  });

  const gamePlay = $(
    async (userChoice: string): Promise<void> => {
      const playUserComp = userChoice + (await getComputerChoice());
      console.log(`Attempt in progress: ${playUserComp}`);
      let playStatus: {
        message: string;
        userAdd: number;
        compAdd: number;
      } = {
        message: '',
        userAdd: 0,
        compAdd: 0,
      };
      switch (playUserComp) {
        // Ganamos
        case 'rs':
        case 'sp':
        case 'pr':
          playStatus = {
            message: 'You beat the computer',
            userAdd: 1,
            compAdd: 0,
          };
          break;
        // Gana la computadora
        case 'rp':
        case 'ps':
        case 'sr':
          playStatus = {
            message: 'Win the computer',
            userAdd: 0,
            compAdd: 1,
          };
          break;
        // Empatamos
        case 'rr':
        case 'pp':
        case 'ss':
          playStatus = {
            message: 'You have chosen the same play and you have tied',
            userAdd: 0,
            compAdd: 0,
          };
          break;
      }

      game.data = {
        ...game.data,
        result: playStatus.message,
        pointsUser: game.data.pointsUser + playStatus.userAdd,
        pointsComp: game.data.pointsComp + playStatus.compAdd,
      };
    }
  );
  return (
    <>
      <div class='title'>
        <h1>Rock, Paper or Scissor!!</h1>
      </div>
      <div class='score-board'>
        <div id='user-label' class='badge'>
          user
        </div>
        <div id='comp-label' class='badge'>
          comp
        </div>
        <span id='user-score'>{game.data.pointsUser}</span>:
        <span id='comp-score'>{game.data.pointsComp}</span>
      </div>
      <p class='info-game'>{game.data.result}</p>

      <div class='choices'>
        <div class='choice' onClick$={() => gamePlay('r')}>
          <img width={100} height={100} src='/img/rock.png' alt='rock image' />
        </div>
        <div class='choice' onClick$={() => gamePlay('p')}>
          <img width={100} height={100} src='/img/paper.png' alt='paper image' />
        </div>
        <div class='choice' onClick$={() => gamePlay('s')}>
          <img width={100} height={100} src='/img/scissors.png' alt='Scissors image' />
        </div>
      </div>
      <p class='info-game'>Select your play</p>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Qwik - Paper, Rock and Scissors',
  meta: [
    {
      name: 'description',
      content: 'Classic game of rock paper scissors developed in Qwik',
    },
  ],
};
