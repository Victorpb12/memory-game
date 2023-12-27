import './styles.css';

export interface CardProps {
    id: string;
    flipped?: boolean;
    back: {
      src: string;
    };
    handleClick?: (id: string) => void;
    src?: string;
}

export function Card ({ flipped = false, back, handleClick, id }: CardProps) {
  const cardContentClass = ['card_content'];
  flipped && cardContentClass.push('card_content--flipped');


  const handleClickFn = (id: string) => {
    if (handleClick) {
      handleClick(id);
    }
  };

  return (
    <div className="card" onClick={() => handleClickFn(id)}>
        <div className={cardContentClass.join(' ')}>
            <div className="card_face card_face--front">?</div>
            <img className="card_face card_face--back" src={back.src} />
        </div>
    </div>
  );
}
