import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [newNumber, setNewNumber] = useState(true);
  const [history, setHistory] = useState('');

  const handleNumber = (num) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      if (display.length < 12) {
        setDisplay(display === '0' ? num : display + num);
      }
    }
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay('0.');
      setNewNumber(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op) => {
    const current = parseFloat(display);
    
    if (prevValue === null) {
      setPrevValue(current);
      setHistory(`${current} ${op}`);
    } else if (operation && !newNumber) {
      const result = calculate(prevValue, current, operation);
      setPrevValue(result);
      setDisplay(String(result));
      setHistory(`${result} ${op}`);
    } else {
      setHistory(`${prevValue} ${op}`);
    }
    
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (a, b, op) => {
    switch (op) {
      case '+':
        return a + b;
      case '−':
        return a - b;
      case '×':
        return a * b;
      case '÷':
        if (b === 0) {
          return 'Error';
        }
        return a / b;
      case '%':
        return a % b;
      default:
        return b;
    }
  };

  const handleEquals = () => {
    if (operation && prevValue !== null) {
      const current = parseFloat(display);
      const result = calculate(prevValue, current, operation);
      
      if (result === 'Error') {
        setDisplay('Error');
        setHistory('Cannot divide by zero');
      } else {
        const finalResult = result.toString().length > 12 
          ? parseFloat(result.toPrecision(10)) 
          : result;
        setDisplay(String(finalResult));
        setHistory(`${prevValue} ${operation} ${current} =`);
      }
      
      setPrevValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setNewNumber(true);
    setHistory('');
  };

  const handleClearEntry = () => {
    setDisplay('0');
    setNewNumber(true);
  };

  const handleBackspace = () => {
    if (!newNumber && display !== 'Error') {
      const newDisplay = display.slice(0, -1);
      setDisplay(newDisplay === '' ? '0' : newDisplay);
    }
  };

  const handleSign = () => {
    if (display !== '0' && display !== 'Error') {
      setDisplay(String(parseFloat(display) * -1));
    }
  };

  const handleSquareRoot = () => {
    const num = parseFloat(display);
    if (num < 0) {
      setDisplay('Error');
      setHistory('Invalid input');
    } else {
      const result = Math.sqrt(num);
      setDisplay(String(result));
      setHistory(`√${num} =`);
      setNewNumber(true);
    }
  };

  const handleSquare = () => {
    const num = parseFloat(display);
    const result = num * num;
    setDisplay(String(result));
    setHistory(`${num}² =`);
    setNewNumber(true);
  };

  const handleReciprocal = () => {
    const num = parseFloat(display);
    if (num === 0) {
      setDisplay('Error');
      setHistory('Cannot divide by zero');
    } else {
      const result = 1 / num;
      setDisplay(String(result));
      setHistory(`1/${num} =`);
      setNewNumber(true);
    }
  };

  const Button = ({ value, onClick, className = '' }) => (
    <button
      onClick={onClick}
      className={`h-14 rounded-lg font-semibold text-lg transition-all hover:brightness-110 active:scale-95 ${className}`}
    >
      {value}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-slate-700/50">
          <div className="mb-6">
            <div className="text-purple-400 text-sm h-6 mb-2 text-right font-mono">
              {history}
            </div>
            <div className="bg-slate-900/50 rounded-xl p-4 mb-4 border border-slate-700/30">
              <div className="text-white text-4xl font-light text-right font-mono break-all">
                {display}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <Button 
              value="C" 
              onClick={handleClear}
              className="bg-red-600 text-white hover:bg-red-700"
            />
            <Button 
              value="CE" 
              onClick={handleClearEntry}
              className="bg-orange-600 text-white hover:bg-orange-700"
            />
            <Button 
              value="⌫" 
              onClick={handleBackspace}
              className="bg-slate-600 text-white hover:bg-slate-700"
            />
            <Button 
              value="÷" 
              onClick={() => handleOperation('÷')}
              className="bg-purple-600 text-white hover:bg-purple-700"
            />

            <Button 
              value="√" 
              onClick={handleSquareRoot}
              className="bg-slate-600 text-white hover:bg-slate-700"
            />
            <Button 
              value="x²" 
              onClick={handleSquare}
              className="bg-slate-600 text-white hover:bg-slate-700"
            />
            <Button 
              value="1/x" 
              onClick={handleReciprocal}
              className="bg-slate-600 text-white hover:bg-slate-700"
            />
            <Button 
              value="×" 
              onClick={() => handleOperation('×')}
              className="bg-purple-600 text-white hover:bg-purple-700"
            />

            <Button 
              value="7" 
              onClick={() => handleNumber('7')}
              className="bg-slate-700 text-white hover:bg-slate-600"
            />
            <Button 
              value="8" 
              onClick={() => handleNumber('8')}
              className="bg-slate-700 text-white hover:bg-slate-600"
            />
            <Button 
              value="9" 
              onClick={() => handleNumber('9')}
              className="bg-slate-700 text-white hover:bg-slate-600"
            />
            <Button 
              value="−" 
              onClick={() => handleOperation('−')}
              className="bg-purple-600 text-white hover:bg-purple-700"
            />

            <Button 
              value="4" 
              onClick={() => handleNumber('4')}
              className="bg-slate-700 text-white hover:bg-slate-600"
            />
            <Button 
              value="5" 
              onClick={() => handleNumber('5')}
              className="bg-slate-700 text-white hover:bg-slate-600"
            />
            <Button 
              value="6" 
              onClick={() => handleNumber('6')}
              className="bg-slate-700 text-white hover:bg-slate-600"
            />
            <Button 
              value="+" 
              onClick={() => handleOperation('+')}
              className="bg-purple-600 text-white hover:bg-purple-700"
            />

            <Button 
              value="1" 
              onClick={() => handleNumber('1')}
              className="bg-slate-700 text-white hover:bg-slate-600"
            />
            <Button 
              value="2" 
              onClick={() => handleNumber('2')}
              className="bg-slate-700 text-white hover:bg-slate-600"
            />
            <Button 
              value="3" 
              onClick={() => handleNumber('3')}
              className="bg-slate-700 text-white hover:bg-slate-600"
            />
            <Button 
              value="%" 
              onClick={() => handleOperation('%')}
              className="bg-purple-600 text-white hover:bg-purple-700"
            />

            <Button 
              value="±" 
              onClick={handleSign}
              className="bg-slate-700 text-white hover:bg-slate-600"
            />
            <Button 
              value="0" 
              onClick={() => handleNumber('0')}
              className="bg-slate-700 text-white hover:bg-slate-600"
            />
            <Button 
              value="." 
              onClick={handleDecimal}
              className="bg-slate-700 text-white hover:bg-slate-600"
            />
            <Button 
              value="=" 
              onClick={handleEquals}
              className="bg-green-600 text-white hover:bg-green-700"
            />
          </div>

          <div className="mt-4 text-center text-slate-400 text-xs">
            Professional Calculator v1.0
          </div>
        </div>
      </div>
    </div>
  );
}