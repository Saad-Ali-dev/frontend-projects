import React from 'react';

// Simple Checkmark SVG component
const CheckIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={`w-5 h-5 ${className}`}
  >
    <path
      fillRule="evenodd"
      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
      clipRule="evenodd"
    />
  </svg>
);

function PricingCard({
  planName,
  price,
  priceSuffix = '/month',
  features,
  buttonText = 'Get Started',
  isFeatured = false, // Determines the gradient style and glow color
}) {
  const cardBaseStyle =
    'border rounded-xl p-6 md:p-8 flex flex-col h-full transition-all duration-300 ease-in-out transform hover:-translate-y-1';

  const cardNormalStyle = `
    bg-zinc-900 border-zinc-700
    hover:border-[#a855f7] hover:shadow-[0 0 25px 8px rgba(168, 85, 247, 0.3)]
  `;

  const cardFeaturedStyle = `
    bg-gradient-to-br from-purple-600/20 via-transparent to-blue-600/10
    border-[#a855f7]
    hover:shadow-[0 0 25px 8px rgba(59, 130, 246, 0.3)]
  `; 

  const buttonBaseStyle =
    'w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black';

  const buttonNormalStyle = `
    bg-zinc-700 text-white hover:bg-zinc-600
    hover:shadow-[0 0 15px 5px rgba(107, 114, 128, 0.4)] focus:ring-zinc-500
  `;

  const buttonFeaturedStyle = `
    bg-gradient-to-r from-[#a855f7] to-[#3b82f6] text-white
    hover:opacity-90 hover:shadow-[0 0 15px 5px rgba(168, 85, 247, 0.5)]
    focus:ring-[#a855f7]
  `; 

  const checkIconColor = isFeatured ? 'text-[#3b82f6]' : 'text-[#a855f7]';

  return (
    <div className={`${cardBaseStyle} ${isFeatured ? cardFeaturedStyle : cardNormalStyle} cursor-pointer`}>
      {/* Plan Name */}
      <h3 className="text-2xl font-semibold mb-2">{planName}</h3>

      {/* Price */}
      <div className="mb-6">
        <span className="text-5xl font-bold">${price}</span>
        <span className="text-lg text-zinc-400">{priceSuffix}</span>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <CheckIcon className={`mr-3 flex-shrink-0 ${checkIconColor}`} />
            <span className="text-zinc-300">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`${buttonBaseStyle} ${isFeatured ? buttonFeaturedStyle : buttonNormalStyle} cursor-pointer`}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default PricingCard;