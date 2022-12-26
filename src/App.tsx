import { CSSProperties, useCallback, useEffect, useState } from 'react'
import CSS from 'csstype';

function App() {
  const [squares, setSquares] = useState<CSSProperties[]>([]);
  const [squaresToRedo, setSquaresToRedo] = useState<CSSProperties[]>([]);

  const generateStyleCSS = (x: string, y: string) => {
    const newStyle: CSS.Properties = {
      listStyle: 'none',
      position: "absolute",
      left: x,
      top: y,
      height: "15px",
      width: "15px",
      backgroundColor: 'red'
    }
    return newStyle
  }

  const handleUserKeyPress = useCallback((event: KeyboardEvent) => {
    const { code } = event;

    if (code === 'KeyU') {
      moveSquareToUndidList();
      handleRemoveSquare();
    }

    if (code === 'KeyR') {
      handleRedoSquare();
    }

  }, [squares])

  useEffect(() => {
    window.addEventListener('keypress', handleUserKeyPress);
    window.addEventListener('click', handleAddSquare);

    return () => {
      window.removeEventListener("keypress", handleUserKeyPress);
      window.removeEventListener('click', handleAddSquare);
    };

  }, [handleUserKeyPress])

  const moveSquareToUndidList = () => {
    const square = squares.slice(-1)[0];

    setSquaresToRedo(prev => ([      
      ...prev, square
    ]))
  }

  const handleRedoSquare = () => {
    if (squaresToRedo.length === 0) return;
    const lastSquare = squaresToRedo.slice(-1)[0];
    const newStyleSquare = [...squaresToRedo];

    newStyleSquare.pop();
    setSquaresToRedo(newStyleSquare);

    setSquares(prev => ([...prev, lastSquare])); 
  }

  const handleRemoveSquare = () => {
    if (squares.length === 0) return;
    const newSquares = [...squares];
    newSquares.pop();

    setSquares(newSquares);
  }

  const handleAddSquare = (e: MouseEvent) => {
    const newStyleSquare = generateStyleCSS(`${e.clientX}px`, `${e.clientY}px`);

    setSquares(prev => ([
      ...prev, newStyleSquare
    ]))
  }

  return (
    <div>
      <ul className='w-full h-full'>
        {squares.map((item: CSSProperties, key: React.Key) =>
          <li key={key} style={item}></li>
        )}
      </ul>
    </div>
  )
}

export default App
