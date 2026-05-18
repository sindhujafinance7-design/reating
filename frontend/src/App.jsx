import { useState } from 'react';
import { Star, CheckCircle, MessageSquare, User } from 'lucide-react';

function App() {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0 || name.trim() === '') return;
    setIsSubmitting(true);
    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiBaseUrl}/api/ratings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: 'public_user',
          rating,
          comments,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert("Failed to submit rating.");
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("Error connecting to server.");
    }
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="glass-card max-w-md w-full p-10 text-center space-y-6">
          <div className="flex justify-center">
            <CheckCircle className="w-24 h-24 text-emerald-500 animate-bounce" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Thank You!</h2>
          <p className="text-gray-600 font-medium">Your rating helps us serve you better. Have a great day!</p>
          <button 
            onClick={() => window.location.href = 'https://www.google.com'}
            className="mt-6 w-full py-4 bg-gray-800 hover:bg-gray-900 text-white rounded-2xl font-bold text-lg shadow-lg transition-all"
          >
            Okay
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="glass-card max-w-md w-full p-8 space-y-8 relative overflow-hidden">
        
        {/* Decorative Background blob */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-20"></div>

        <div className="text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-600 text-white rounded-3xl mb-6 shadow-xl shadow-indigo-600/30">
            <Star className="w-10 h-10 fill-current" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Sindhuja Finance</h1>
          <p className="text-gray-500 mt-2 font-medium">We value your feedback</p>
        </div>

        <div className="space-y-6 relative z-10">
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <User className="w-4 h-4 text-indigo-500" />
              Your Name
            </label>
            <input
              type="text"
              required
              className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none bg-white/50"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="text-center space-y-4 pt-2">
            <h3 className="text-lg font-bold text-gray-800">Rate your experience</h3>
            <div className="flex justify-center gap-2">
              {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                  <button
                    type="button"
                    key={index}
                    className="transition-transform hover:scale-110 focus:outline-none"
                    onClick={() => setRating(index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(rating)}
                  >
                    <Star
                      className={`w-12 h-12 transition-colors duration-200 ${
                        index <= (hover || rating)
                          ? 'fill-amber-400 text-amber-400 drop-shadow-md'
                          : 'text-gray-200 fill-gray-100'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <MessageSquare className="w-4 h-4 text-indigo-500" />
              Additional Comments (Optional)
            </label>
            <textarea
              className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none resize-none bg-white/50"
              rows="3"
              placeholder="Tell us what you liked or how we can improve..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={rating === 0 || name.trim() === '' || isSubmitting}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-indigo-500/50 transition-all active:scale-[0.98] mt-4"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Rating'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
