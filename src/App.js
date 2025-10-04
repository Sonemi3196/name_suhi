import { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function App() {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState(null);

  const letterToNumber = {
    'A': 1, 'I': 1, 'J': 1, 'Q': 1, 'Y': 1,
    'B': 2, 'K': 2, 'R': 2,
    'C': 3, 'G': 3, 'L': 3, 'S': 3,
    'D': 4, 'M': 4, 'T': 4,
    'E': 5, 'H': 5, 'N': 5, 'X': 5,
    'U': 6, 'V': 6, 'W': 6,
    'O': 7, 'Z': 7,
    'F': 8, 'P': 8
  };

  const numberMeanings = {
    1: {
      color: 'bg-red-500 text-white',
      description: '自我、自信、エゴ、プライド、地位、名誉、権力、バイタリティ'
    },
    2: {
      color: 'bg-gray-100 text-gray-900 border-4 border-gray-400 shadow-lg',
      description: '心、精神、変化、豊かさ、日常、家庭生活、内面'
    },
    3: {
      color: 'bg-yellow-400 text-gray-900',
      description: '知恵、知識、道徳、幸運、修行、英知、拡大、発展、マントラ、先生'
    },
    4: {
      color: 'bg-black text-white',
      description: '外交的、貪欲、中毒、快楽主義、物質主義'
    },
    5: {
      color: 'bg-green-500 text-white',
      description: '知識、学び、言葉、コミュニケーション、思考、星占術'
    },
    6: {
      color: 'bg-gray-100 text-gray-900 border-4 border-gray-400 shadow-lg',
      description: '恋愛、結婚、芸術、生物、音楽、文化、贅沢'
    },
    7: {
      color: 'bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 text-white',
      description: '内向的、純粋、無欲、禁欲主義、直感、オカルト'
    },
    8: {
      color: 'bg-blue-900 text-white',
      description: '試練、努力、苦悩、障害、奉仕、農業、改革、奴隷'
    },
    9: {
      color: 'bg-red-600 text-white',
      description: '情熱、行動、集中力、欲望、怒り、短期、火、闘争、衝動'
    }
  };

  const sumDigits = (num) => {
    return num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  };

  const reduceToSingleDigit = (num) => {
    const steps = [num];
    while (num >= 10) {
      num = sumDigits(num);
      steps.push(num);
    }
    return { final: num, steps };
  };

  const calculateBhagyank = (dateString) => {
    const digits = dateString.replace(/\D/g, '');
    const total = digits.split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    return reduceToSingleDigit(total);
  };

  const calculateMoolank = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    return reduceToSingleDigit(day);
  };

  const calculateGrid = (dateString, bhagyankNum, moolankNum) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    const yearLastTwo = year % 100;
    const yearDigits = yearLastTwo.toString().split('').map(Number);
    const monthDigits = month.toString().split('').map(Number);
    const dayDigits = day.toString().split('').map(Number);
    
    const allDigits = [
      ...yearDigits,
      ...monthDigits,
      ...dayDigits,
      bhagyankNum
    ];
    
    if (day >= 10) {
      allDigits.push(moolankNum);
    }
    
    const digitCount = {};
    allDigits.forEach(digit => {
      digitCount[digit] = (digitCount[digit] || 0) + 1;
    });
    
    const grid = {
      3: digitCount[3] ? '3'.repeat(digitCount[3]) : '',
      1: digitCount[1] ? '1'.repeat(digitCount[1]) : '',
      9: digitCount[9] ? '9'.repeat(digitCount[9]) : '',
      6: digitCount[6] ? '6'.repeat(digitCount[6]) : '',
      7: digitCount[7] ? '7'.repeat(digitCount[7]) : '',
      5: digitCount[5] ? '5'.repeat(digitCount[5]) : '',
      2: digitCount[2] ? '2'.repeat(digitCount[2]) : '',
      8: digitCount[8] ? '8'.repeat(digitCount[8]) : '',
      4: digitCount[4] ? '4'.repeat(digitCount[4]) : ''
    };
    
    return grid;
  };

  const calculateNumerology = () => {
    if (!name.trim() || !birthDate) {
      alert('名前と生年月日を入力してください');
      return;
    }

    try {
      const upperName = name.toUpperCase();
      const letters = upperName.replace(/\s/g, '').split('');
      
      const letterValues = letters.map(letter => ({
        letter,
        value: letterToNumber[letter] || 0
      }));

      const total = letterValues.reduce((sum, item) => sum + item.value, 0);
      const nameNumber = reduceToSingleDigit(total);
      const bhagyank = calculateBhagyank(birthDate);
      const moolank = calculateMoolank(birthDate);
      const grid = calculateGrid(birthDate, bhagyank.final, moolank.final);

      setResult({
        letterValues,
        total,
        nameNumber,
        bhagyank,
        moolank,
        grid
      });
    } catch (error) {
      console.error('計算エラー:', error);
      alert('計算中にエラーが発生しました: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex items-center justify-center mb-6">
            <Calculator className="w-10 h-10 text-purple-600 mr-3" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">名前の数秘術</h1>
          </div>
          
          <p className="text-gray-600 text-center mb-6">
            アルファベットで名前と生年月日を入力してください
          </p>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">名前</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="例: John Smith"
                className="w-full px-4 py-3 text-lg border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">生年月日</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-4 py-3 text-lg border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-500 transition"
              />
            </div>
          </div>

          <button
            onClick={calculateNumerology}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md"
          >
            計算する
          </button>

          {result && (
            <div className="mt-8 space-y-6">
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">ロシュ（グリッド）</h2>
                <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
                  <div className="aspect-square bg-white border-2 border-purple-300 rounded-lg flex items-center justify-center text-2xl font-bold text-purple-600">
                    {result.grid[3] || ''}
                  </div>
                  <div className="aspect-square bg-white border-2 border-purple-300 rounded-lg flex items-center justify-center text-2xl font-bold text-purple-600">
                    {result.grid[1] || ''}
                  </div>
                  <div className="aspect-square bg-white border-2 border-purple-300 rounded-lg flex items-center justify-center text-2xl font-bold text-purple-600">
                    {result.grid[9] || ''}
                  </div>
                  <div className="aspect-square bg-white border-2 border-purple-300 rounded-lg flex items-center justify-center text-2xl font-bold text-purple-600">
                    {result.grid[6] || ''}
                  </div>
                  <div className="aspect-square bg-white border-2 border-purple-300 rounded-lg flex items-center justify-center text-2xl font-bold text-purple-600">
                    {result.grid[7] || ''}
                  </div>
                  <div className="aspect-square bg-white border-2 border-purple-300 rounded-lg flex items-center justify-center text-2xl font-bold text-purple-600">
                    {result.grid[5] || ''}
                  </div>
                  <div className="aspect-square bg-white border-2 border-purple-300 rounded-lg flex items-center justify-center text-2xl font-bold text-purple-600">
                    {result.grid[2] || ''}
                  </div>
                  <div className="aspect-square bg-white border-2 border-purple-300 rounded-lg flex items-center justify-center text-2xl font-bold text-purple-600">
                    {result.grid[8] || ''}
                  </div>
                  <div className="aspect-square bg-white border-2 border-purple-300 rounded-lg flex items-center justify-center text-2xl font-bold text-purple-600">
                    {result.grid[4] || ''}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`p-6 rounded-lg text-center ${numberMeanings[result.bhagyank.final].color}`}>
                  <h3 className="text-sm font-bold mb-2">バーギャング</h3>
                  <p className="text-xs mb-3 font-semibold opacity-80">人生全体の運命</p>
                  <div className="text-5xl font-bold mb-3">{result.bhagyank.final}</div>
                  <p className="text-xs leading-relaxed font-medium">
                    {numberMeanings[result.bhagyank.final].description}
                  </p>
                </div>

                <div className={`p-6 rounded-lg text-center ${numberMeanings[result.moolank.final].color}`}>
                  <h3 className="text-sm font-bold mb-2">ムーランク</h3>
                  <p className="text-xs mb-3 font-semibold opacity-80">基本的な性格</p>
                  <div className="text-5xl font-bold mb-3">{result.moolank.final}</div>
                  <p className="text-xs leading-relaxed font-medium">
                    {numberMeanings[result.moolank.final].description}
                  </p>
                </div>

                <div className={`p-6 rounded-lg text-center ${numberMeanings[result.nameNumber.final].color}`}>
                  <h3 className="text-sm font-bold mb-2">名前番号</h3>
                  <p className="text-xs mb-3 font-semibold opacity-80">才能と成長方向</p>
                  <div className="text-5xl font-bold mb-3">{result.nameNumber.final}</div>
                  <p className="text-xs leading-relaxed font-medium">
                    {numberMeanings[result.nameNumber.final].description}
                  </p>
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">文字ごとの数値</h2>
                <div className="flex flex-wrap gap-3">
                  {result.letterValues.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white px-4 py-2 rounded-lg shadow-sm border-2 border-purple-200"
                    >
                      <span className="font-bold text-purple-600 text-lg">{item.letter}</span>
                      <span className="text-gray-600 mx-2">→</span>
                      <span className="font-semibold text-gray-800">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">計算過程</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">バーギャング（生年月日全体）</h3>
                    <div className="flex items-center flex-wrap gap-2">
                      {result.bhagyank.steps.map((step, index) => (
                        <div key={index} className="flex items-center">
                          <span className="text-lg font-semibold text-gray-700">{step}</span>
                          {index < result.bhagyank.steps.length - 1 && (
                            <span className="text-gray-400 mx-2">→</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">ムーランク（生まれた日）</h3>
                    <div className="flex items-center flex-wrap gap-2">
                      {result.moolank.steps.map((step, index) => (
                        <div key={index} className="flex items-center">
                          <span className="text-lg font-semibold text-gray-700">{step}</span>
                          {index < result.moolank.steps.length - 1 && (
                            <span className="text-gray-400 mx-2">→</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">名前番号（合計: {result.total}）</h3>
                    <div className="flex items-center flex-wrap gap-2">
                      {result.nameNumber.steps.map((step, index) => (
                        <div key={index} className="flex items-center">
                          <span className="text-lg font-semibold text-gray-700">{step}</span>
                          {index < result.nameNumber.steps.length - 1 && (
                            <span className="text-gray-400 mx-2">→</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">文字と数字の対応表</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><span className="font-medium">A,I,J,Q,Y</span> → 1</div>
              <div><span className="font-medium">B,K,R</span> → 2</div>
              <div><span className="font-medium">C,G,L,S</span> → 3</div>
              <div><span className="font-medium">D,M,T</span> → 4</div>
              <div><span className="font-medium">E,H,N,X</span> → 5</div>
              <div><span className="font-medium">U,V,W</span> → 6</div>
              <div><span className="font-medium">O,Z</span> → 7</div>
              <div><span className="font-medium">F,P</span> → 8</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
