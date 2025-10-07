import { useState } from 'react';
import { Delete, Calculator, Divide, X, Minus, Plus, Percent, TrendingUp } from 'lucide-react';

export default function SmartCalculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [newNumber, setNewNumber] = useState(true);
  const [history, setHistory] = useState([]);

  const handleNumber = (num) => {
    if (newNumber) {
      setDisplay(num.toString());
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num.toString() : display + num);
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
    
    if (previousValue === null) {
      setPreviousValue(current);
    } else if (operation) {
      const result = calculate(previousValue, current, operation);
      setDisplay(result.toString());
      setPreviousValue(result);
    }
    
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (prev, current, op) => {
    switch (op) {
      case '+': return prev + current;
      case '-': return prev - current;
      case '*': return prev * current;
      case '/': return prev / current;
      case '%': return prev % current;
      default: return current;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const current = parseFloat(display);
      const result = calculate(previousValue, current, operation);
      const historyEntry = `${previousValue} ${operation} ${current} = ${result}`;
      
      setHistory([historyEntry, ...history.slice(0, 4)]);
      setDisplay(result.toString());
      setPreviousValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
      setNewNumber(true);
    }
  };

  const handleSquare = () => {
    const num = parseFloat(display);
    const result = num * num;
    setHistory([`${num}² = ${result}`, ...history.slice(0, 4)]);
    setDisplay(result.toString());
    setNewNumber(true);
  };

  const handleSquareRoot = () => {
    const num = parseFloat(display);
    const result = Math.sqrt(num);
    setHistory([`√${num} = ${result}`, ...history.slice(0, 4)]);
    setDisplay(result.toString());
    setNewNumber(true);
  };

  const Button = ({ children, onClick, className = '', variant = 'default' }) => {
    const baseClasses = 'h-16 rounded-xl font-bold text-xl transition-all hover:scale-105 active:scale-95 shadow-lg';
    const variants = {
      default: 'bg-white bg-opacity-20 hover:bg-opacity-30 text-white border-2 border-white border-opacity-30',
      operator: 'bg-gradient-to-br from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white',
      equals: 'bg-gradient-to-br from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700 text-white',
      clear: 'bg-gradient-to-br from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white'
    };
    
    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 p-8 flex items-center justify-center">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg flex items-center justify-center gap-3">
            <Calculator size={48} />
            Smart Calculator
          </h1>
          <p className="text-xl text-purple-100">
            This is powered by <strong>Next.js & React</strong>. Isn't Ameer's calculator awesome?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border-2 border-white border-opacity-20">
              <div className="bg-black bg-opacity-40 rounded-2xl p-6 mb-6 backdrop-blur-sm border border-white border-opacity-20">
                <div className="text-purple-200 text-sm mb-2 h-6">
                  {previousValue !== null && operation && `${previousValue} ${operation}`}
                </div>
                <div className="text-white text-right text-5xl font-bold break-all">
                  {display}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                <Button onClick={handleClear} variant="clear">AC</Button>
                <Button onClick={handleBackspace}>
                  <Delete size={24} className="mx-auto" />
                </Button>
                <Button onClick={() => handleOperation('%')}>
                  <Percent size={24} className="mx-auto" />
                </Button>
                <Button onClick={() => handleOperation('/')} variant="operator">
                  <Divide size={24} className="mx-auto" />
                </Button>

                <Button onClick={() => handleNumber(7)}>7</Button>
                <Button onClick={() => handleNumber(8)}>8</Button>
                <Button onClick={() => handleNumber(9)}>9</Button>
                <Button onClick={() => handleOperation('*')} variant="operator">
                  <X size={24} className="mx-auto" />
                </Button>

                <Button onClick={() => handleNumber(4)}>4</Button>
                <Button onClick={() => handleNumber(5)}>5</Button>
                <Button onClick={() => handleNumber(6)}>6</Button>
                <Button onClick={() => handleOperation('-')} variant="operator">
                  <Minus size={24} className="mx-auto" />
                </Button>

                <Button onClick={() => handleNumber(1)}>1</Button>
                <Button onClick={() => handleNumber(2)}>2</Button>
                <Button onClick={() => handleNumber(3)}>3</Button>
                <Button onClick={() => handleOperation('+')} variant="operator">
                  <Plus size={24} className="mx-auto" />
                </Button>

                <Button onClick={() => handleNumber(0)} className="col-span-2">0</Button>
                <Button onClick={handleDecimal}>.</Button>
                <Button onClick={handleEquals} variant="equals">=</Button>

                <Button onClick={handleSquare} className="col-span-2">x²</Button>
                <Button onClick={handleSquareRoot} className="col-span-2">√x</Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border-2 border-white border-opacity-20">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp size={24} />
                History
              </h2>
              <div className="space-y-3">
                {history.length === 0 ? (
                  <p className="text-purple-200 text-center py-8">No calculations yet</p>
                ) : (
                  history.map((entry, index) => (
                    <div
                      key={index}
                      className="bg-white bg-opacity-10 rounded-lg p-4 text-white text-sm backdrop-blur-sm border border-white border-opacity-20"
                    >
                      {entry}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <footer className="text-center text-purple-200 text-lg mt-8">
          Powered by Ameer Qureshi + Next.js
        </footer>
      </div>
    </div>
  );
}