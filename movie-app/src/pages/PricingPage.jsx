import PricingCard from '../components/PricingCard.jsx';


export default function PricingPage() {
  const pricingPlans = [
    {
      planName: 'Basic',
      price: '9.99',
      features: [
        'Good video quality (720p)',
        'Watch on 1 supported device at a time',
        'Ad-free TV shows and movies',
        'Download on 1 supported device at a time',
      ],
      isFeatured: false,
      buttonText: 'Choose Basic',
    },
    {
      planName: 'Standard',
      price: '15.49',
      features: [
        'Great video quality (1080p)',
        'Watch on 2 supported devices at a time',
        'Ad-free TV shows and movies',
        'Download on 2 supported devices at a time',
      ],
      isFeatured: true,
      buttonText: 'Choose Standard',
    },
    {
      planName: 'Premium',
      price: '22.99',
      features: [
        'Best video quality (4K+HDR)',
        'Watch on 4 supported devices at a time',
        'Ad-free TV shows and movies',
        'Download on 6 supported devices at a time',
        'Netflix spatial audio',
      ],
      isFeatured: false,
      buttonText: 'Choose Premium',
    },
  ];
  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-6xl mx-auto">
        {/* Pricing Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={index}
              planName={plan.planName}
              price={plan.price}
              features={plan.features}
              buttonText={plan.buttonText}
              isFeatured={plan.isFeatured}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
