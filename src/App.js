import { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function NumerologyApp() {
  const [name, setName] = useState('');
  const [result, setResult] = useState(null);

  // アルファベットと数字の対応表
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

  // 数字の各桁を合計する関数
  const sumDigits = (num) => {
    return num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  };

  // 1桁になるまで計算
  const reduceToSingleDigit = (num) => {
    const steps = [num];
    while (num >= 10) {
      num = sumDigits(num);
      steps.push(num);
    }
    return { final: num, steps };
  };

  // 名前を数秘術で計算
  const calculateNumerology = () => {
    if (!name.trim()) {
      setResult(null);
      return;
    }

    // 大文字に変換してスペース以外の文字を処理
    const upperName = name.toUpperCase();
    const letters = upperName.replace(/\s/g, '').split('');
    
    // 各文字を数字に変換
    const letterValues = letters.map(letter => ({
      letter,
      value: letterToNumber[letter] || 0
    }));

    // 合計を計算
    const total = letterValues.reduce((sum, item) => sum + item.value, 0);

    // 1桁になるまで計算
    const reduction = reduceToSingleDigit(total);

    setResult({
      letterValues,
      total,
      reduction
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-center mb-6">
            <Calculator className="w-10 h-10 text-purple-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">名前の数秘術</h1>
          </div>
          
          <p className="text-gray-600 text-center mb-8">
            アルファベットで名前を入力してください
          </p>

          <div className="mb-6">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例: John Smith"
              className="w-full px-4 py-3 text-lg border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-500 transition"
            />
          </div>

          <button
            onClick={calculateNumerology}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md"
          >
            計算する
          </button>

          {result && (
            <div className="mt-8 space-y-6">
              {/* 文字ごとの数値 */}
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

              {/* 計算過程 */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">計算過程</h2>
                <div className="space-y-2">
                  <div className="text-lg">
                    <span className="text-gray-700">合計:</span>
                    <span className="font-bold text-blue-600 ml-2 text-xl">{result.total}</span>
                  </div>
                  {result.reduction.steps.length > 1 && (
                    <div className="flex items-center flex-wrap gap-2 mt-3">
                      {result.reduction.steps.map((step, index) => (
                        <div key={index} className="flex items-center">
                          <span className="text-lg font-semibold text-gray-700">{step}</span>
                          {index < result.reduction.steps.length - 1 && (
                            <span className="text-gray-400 mx-2">→</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 最終結果 */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white text-center">
                <h2 className="text-2xl font-semibold mb-3">name数秘</h2>
                <div className="text-6xl font-bold">{result.reduction.final}</div>
              </div>
            </div>
          )}

          {/* 対応表 */}
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
