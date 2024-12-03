"use client";

// Inside your component
const TrendingAds = () => {
  return (
    <div
      style={{
        animation: `fadeIn 0.5s ease-out 0.3s forwards`,
        opacity: 0, // Initial opacity before animation starts
      }}
      className="items-center flex"
    >
      <h2 className="font-bold p-2 text-[30px]">Trending Ads</h2>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default TrendingAds;
