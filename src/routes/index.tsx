import { component$, useStore } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { GameStore } from '~/models/game';
import Choices from '~/components/game/choices';
import { Title } from '~/components/game/title';
import { ScoreBoard } from '~/components/game/score-board';

export default component$(() => {
  const game = useStore<GameStore>({
    data: {
      result: 'Waiting for the first play...',
      pointsUser: 0,
      pointsComp: 0,
    },
    choices: {
      imageProperties: {
        width: 100,
        height: 100,
      },
      rock: {
        img: '/img/rock.png',
        alt: 'Rock Image',
      },
      paper: {
        img: '/img/paper.png',
        alt: 'Pape Image',
      },
      scissors: {
        img: '/img/scissors.png',
        alt: 'Scissors Image',
      },
    },
  });

  return (
    <>
      <Title />
      <ScoreBoard user={game.data.pointsUser} computer={game.data.pointsComp} />

      <p class='info-game'>{game.data.result}</p>

      <Choices game={game} />

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
