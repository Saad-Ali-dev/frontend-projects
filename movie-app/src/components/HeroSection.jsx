

export default function HeroSection() {
    return (
        <div className="flex flex-col items-center justify-center px-4 ">
          <img
            src="/hero-img.png"
            alt="Hero-section"
            className="relative top-[-30px] my-10 sm:my-0 md:my-0 large-margin "
          />
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-center leading-tight relative top-[-90px] mt-5 sm:mt-10 md:mt-10 lg:my-0">
            Find <span className="gradient-text">Movies</span> You’ll Love
          </h1>
        </div>
      );
};
