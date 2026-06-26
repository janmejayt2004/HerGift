import React from 'react';

const GallerySection = () => {
  const sections = [
    {
      id: 1,
      quote: "Phool ke hath mein Phool",
      photos: [
        { id: 1, rot: '-rotate-1', url: '/memories/photo1.jpeg' },
        { id: 2, rot: 'rotate-2', url: '/memories/photo2.DNG' },
      ]
    },
    {
      id: 2,
      quote: "Traditionals mein badi Khoobsurat Lagti hoo",
      photos: [
        { id: 3, rot: '-rotate-2', url: '/memories/photo3.jpeg' },
        { id: 4, rot: 'rotate-3', url: '/memories/photo4.jpeg' },
      ]
    },
    {
      id: 3,
      quote: "Aur Bachpan se hie Baddie hoo!!",
      photos: [
        { id: 5, rot: '-rotate-3', url: '/memories/photo5.jpeg' },
        { id: 6, rot: 'rotate-1', url: '/memories/photo6.jpeg' },
      ]
    }
  ];

  return (
    <div className="flex flex-col items-center gap-12 relative pb-8">
      {sections.map((section) => (
        <div key={section.id} className="flex flex-col items-center gap-6 w-full border-b-2 border-pink-100/50 pb-10 last:border-0 last:pb-0">
          <div className="flex flex-wrap justify-center gap-8 relative">
            {section.photos.map((photo) => (
              <div
                key={photo.id}
                className={`bg-white p-3 shadow-md rounded-sm w-48 h-56 md:w-64 md:h-72 flex flex-col items-center hover:scale-105 hover:z-10 hover:rotate-0 transition-transform ${photo.rot}`}
              >
                <div className="w-full h-full bg-gray-200 overflow-hidden rounded-sm border border-gray-100 flex-shrink-0">
                  <img src={photo.url} alt="Memory" className="w-full h-full object-cover" />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-2 px-4 text-[#FF1E56] font-caveat text-3xl md:text-4xl font-bold text-center">
            "{section.quote}"
          </p>
        </div>
      ))}
    </div>
  );
};

export default GallerySection;
