'use client';
import { useState, useEffect } from 'react';

interface PredictionHistory {
  id: number;
  name1: string;
  name2: string;
  compatibility: number;
  date: string;
}

export default function Home() {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<PredictionHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const savedHistory = localStorage.getItem('predictionHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handlePredict = async () => {
    if (!name1 || !name2) {
      setResult('请输入双方的名字');
      return;
    }

    setIsLoading(true);
    setResult('');

    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const compatibility = Math.floor(Math.random() * 100);
    let message = `${name1} 和 ${name2} 的匹配度为 ${compatibility}%\n\n`;
    
    if (compatibility >= 90) {
      message += '💕 天生一对！你们的缘分简直是天注定的！';
    } else if (compatibility >= 70) {
      message += '💫 很有潜力的一对，继续努力！';
    } else if (compatibility >= 50) {
      message += '✨ 还算般配，需要更多了解对方。';
    } else if (compatibility >= 30) {
      message += '🌟 有一些小障碍，但别灰心！';
    } else {
      message += '🎭 可能需要更多时间培养感情。';
    }

    const newHistory = {
      id: Date.now(),
      name1,
      name2,
      compatibility,
      date: new Date().toLocaleString()
    };
    
    const updatedHistory = [newHistory, ...history].slice(0, 10);
    setHistory(updatedHistory);
    localStorage.setItem('predictionHistory', JSON.stringify(updatedHistory));

    setResult(message);
    setIsLoading(false);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AI恋爱预测结果',
          text: result,
          url: window.location.href
        });
      } catch {
        console.log('分享失败');
      }
    } else {
      navigator.clipboard.writeText(result);
      alert('结果已复制到剪贴板！');
    }
  };

  return (
    <div className="min-h-screen flex flex-col animated-bg">
      <main className="flex-1 flex flex-col items-center p-8">
        <h1 className="text-4xl font-bold mb-8 text-pink-600">
          AI恋爱预测
        </h1>
        
        <div className="w-full max-w-md space-y-4 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <div>
            <label className="block text-sm font-medium mb-2">你的名字</label>
            <input 
              type="text"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="请输入你的名字"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">对方名字</label>
            <input 
              type="text"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="请输入对方的名字"
            />
          </div>

          <button 
            onClick={handlePredict}
            disabled={isLoading}
            className={`w-full py-2 rounded-lg transition-all ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-pink-500 hover:bg-pink-600'
            } text-white`}
          >
            {isLoading ? '正在分析...' : '开始预测'}
          </button>

          {result && (
            <div className="mt-4 p-4 bg-pink-50/90 backdrop-blur-sm rounded-lg text-center whitespace-pre-line animate-fade-in">
              {result}
              <button
                onClick={handleShare}
                className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
              >
                分享结果
              </button>
            </div>
          )}

          <button
            onClick={() => setShowHistory(!showHistory)}
            className="w-full py-2 text-pink-600 hover:text-pink-700"
          >
            {showHistory ? '隐藏历史记录' : '查看历史记录'}
          </button>

          {showHistory && history.length > 0 && (
            <div className="mt-4 space-y-2">
              {history.map((item) => (
                <div key={item.id} className="p-3 bg-white/80 backdrop-blur-sm rounded-lg text-sm">
                  <div className="font-medium">
                    {item.name1} 💕 {item.name2}
                  </div>
                  <div className="text-gray-500">
                    匹配度: {item.compatibility}%
                  </div>
                  <div className="text-gray-400 text-xs">
                    {item.date}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="text-center p-4 text-gray-600">
        <p>仅供娱乐，请勿当真 😊</p>
        <p className="mt-1">
          Made with ❤️ by {' '}
          <a 
            href="https://github.com/laoma-max" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-600"
          >
            laoma-max
          </a>
        </p>
      </footer>
    </div>
  );
}