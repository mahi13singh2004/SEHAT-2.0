import React from "react";
import image from "../../assets/emergency.jpg";

const resources = [
  {
    name: "Trans Lifeline",
    desc:
      "Peer support phone service run by and for trans people, with operators available daily.",
    phone: "(877) 565-8860",
    url: "https://translifeline.org/",
  },
  {
    name: "PostPartum Support",
    desc:
      "Help for women and families suffering from perinatal mood disorders, including postpartum depression.",
    phone: "+91-11-41160172",
    url: "https://www.talktoangel.com/",
  },
  {
    name: "TeleMans",
    desc:
      "Tele Mental Health Assistance and Networking Across States.",
    phone: "1-800 891 4416",
    url: "https://telemanas.mohfw.gov.in/home",
  },
  {
    name: "Women And Child Development Department",
    desc:
      "Schemes for overall development of women and children via state, central and international agencies.",
    phone: "0172 256 0349",
    url: "https://wcdhry.gov.in/",
  },
  {
    name: "Aasra Suicide Prevention Helpline",
    desc: "AASRA provides free and confidential support for people in distress, prevention and crisis resources for you or your loved ones.",
    phone: "022 2754 6669",
    url: "https://www.aasra.info/helpline.html",
  },
];

const Resources = () => (
  <div className="min-h-[calc(100vh-7rem)] w-full bg-gradient-to-tr from-red-50 to-red-100 flex flex-col items-center pb-10 md:pb-20">
    <div className="relative w-full shadow-md mb-8 md:mb-10">
      <img
        src={image}
        alt="Emergency Support"
        className="object-cover object-center w-full h-40 md:h-56 rounded-b-[2rem] md:rounded-b-[3rem]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-red-900/70 via-red-800/60 to-transparent rounded-b-[2rem] md:rounded-b-[3rem] flex items-center justify-center px-2 md:px-4">
        <h1 className="text-white text-xl md:text-4xl font-bold drop-shadow-lg text-center max-w-xl md:max-w-2xl mx-auto font-serif">
          If you're experiencing thoughts of harming yourself or feeling overwhelmed, please reach out for help immediately.<br />You're not alone.
        </h1>
      </div>
    </div>

    <div className="w-full max-w-6xl px-2 md:px-4 pb-8 md:pb-12 flex flex-wrap justify-center gap-6 md:gap-10">
      {resources.map((r, idx) => (
        <div
          key={idx}
          className="w-full sm:w-80 flex flex-col items-center text-center justify-between bg-white/90 rounded-2xl shadow-xl border border-red-200 p-6 md:p-8 min-h-[260px] md:min-h-[300px] transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-red-400"
        >
          <h2 className="text-xl md:text-2xl font-bold text-red-700 mb-2">{r.name}</h2>
          <p className="text-sm md:text-base text-gray-700 mb-3">{r.desc}</p>
          <p className="text-base md:text-lg font-bold text-red-600 mb-4 bg-red-50 rounded-lg px-3 py-1 inline-block w-fit mx-auto shadow-sm border border-red-100">
            {r.phone}
          </p>
          <a
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 md:px-6 py-2 rounded-full bg-gradient-to-r from-red-400 to-pink-400 hover:from-red-500 hover:to-pink-500 text-white font-semibold shadow transition-colors duration-200 text-base md:text-lg text-center mt-2"
          >
            Visit Website
          </a>
        </div>
      ))}
    </div>
  </div>
);

export default Resources;
