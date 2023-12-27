import './styles.css'; 
import { Card, CardProps } from "../Card";
import { useRef, useState } from 'react';
import { duplicateRegenerateSortArray } from '../../utils/card-utils';

export interface GridProps {
  cards: CardProps[];
};

export function Grid({ cards }: GridProps) {
  const [stateCards, setStateCards] = useState(() => {
    return duplicateRegenerateSortArray(cards);
  });
  const first = useRef<CardProps | null>(null);
  const second = useRef<CardProps | null>(null);
  const unflip = useRef(false);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);

  const handleReset = () => {
    setStateCards(duplicateRegenerateSortArray(cards));
    setMatches(0);
    setMoves(0);
    unflip.current = false;
  }

  const handleClick = (id: string) => {
    const newStateCards = stateCards.map(card => {
      // Se o id do cartão não for o id clicado, não faz nada
      if (card.id !== id) return card; 
      // Se o cartão já estiver virado, não faz nada
      if (card.flipped) return card;
      
      // Desvira quando errar a carta 
      if (unflip.current && first.current && second.current) {
        first.current.flipped = false;
        second.current.flipped = false;
        first.current = null;
        second.current = null;
        unflip.current = false;
      }

      // Virar o cartão 
      card.flipped = true;
      
      // Configura o primeiro e o segundo cartão clicados
      if (first.current === null) {
        first.current = card;
      } else if (second.current === null) {
        second.current = card;
      }

      // Se os dois cartões estão virados
      // Checo se estão corretos
      if (first.current && second.current) {
        if (first.current.back == second.current.back) {
          // A pessoa acertou 
          first.current = null;
          second.current = null;
          setMatches((m => m + 1))
        } else {
          // A pessoa errou
          unflip.current = true;
        }

        setMoves(m => m + 1);
      }

      return card;
    });

    setStateCards(newStateCards);
  }; 

  return (
    <div className='container'>
      <div className="text">
        <h1>
          Jogo da memória
        </h1>
        <p>
          Movimentos: {moves} | Acertos: {matches} |  
          <button onClick={handleReset} className='btn'>Resetar</button> 
        </p>
      </div>
      <div className="grid">
        {stateCards.map((card) => {
          return (
          <Card {...card} key={card.id} src={card.back.src} handleClick={handleClick}/>
        )})}
      </div>
    </div>
  )
}
