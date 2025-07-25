import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const NearbyTherapists = () => {
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 });
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mapsLoaded, setMapsLoaded] = useState(false);

  const findTherapists = () => {
    if (
      !mapsLoaded ||
      !window.google ||
      !window.google.maps ||
      !window.google.maps.places
    ) {
      console.warn("Google Maps API not loaded yet.");
      return;
    }

    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userLoc = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setMapCenter(userLoc);

          const map = new window.google.maps.Map(document.createElement("div"), {
            center: userLoc,
            zoom: 15,
          });

          const service = new window.google.maps.places.PlacesService(map);
          service.nearbySearch(
            {
              location: userLoc,
              radius: 5000,
              keyword: "mental health therapist",
            },
            (results, status) => {
              if (
                status === window.google.maps.places.PlacesServiceStatus.OK &&
                results
              ) {
                const detailsPromises = results.map(
                  (place) =>
                    new Promise((resolve) => {
                      service.getDetails(
                        {
                          placeId: place.place_id,
                          fields: [
                            "name",
                            "vicinity",
                            "formatted_phone_number",
                            "website",
                            "geometry",
                          ],
                        },
                        (details, detailsStatus) => {
                          if (
                            detailsStatus ===
                            window.google.maps.places.PlacesServiceStatus.OK
                          ) {
                            resolve(details);
                          } else {
                            resolve(place);
                          }
                        }
                      );
                    })
                );

                Promise.all(detailsPromises).then((detailedTherapists) => {
                  setTherapists(detailedTherapists);
                  setLoading(false);
                });
              } else {
                setTherapists([]);
                setLoading(false);
                alert("No therapists found nearby.");
              }
            }
          );
        },
        (error) => {
          setLoading(false);
          alert(`Geolocation error: ${error.message}`);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAaB-rfgLYZ_GU1mUruQS7dhc7_cife4s0"
      libraries={["places"]}
      onLoad={() => setMapsLoaded(true)}
      onError={() => alert("Failed to load Google Maps API.")}
    >
      {mapsLoaded ? (
        <div className="min-h-[calc(100vh-7rem)] w-full bg-gradient-to-tr from-blue-50 to-blue-100 flex flex-col items-center pb-10">
          <div className="w-full max-w-7xl mx-auto mt-8 mb-8 p-2 md:p-6 bg-white rounded-3xl shadow-xl flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="md:w-1/2 w-full h-72 md:h-[600px] rounded-2xl overflow-hidden shadow-lg border border-blue-100 mb-4 md:mb-0">
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={mapCenter}
                zoom={14}
                options={{ streetViewControl: false, mapTypeControl: false }}
              >
                {therapists.slice(0, 4).map((place, idx) => (
                  <Marker
                    key={idx}
                    position={{
                      lat: place.geometry.location.lat(),
                      lng: place.geometry.location.lng(),
                    }}
                    title={place.name}
                  />
                ))}
              </GoogleMap>
            </div>

            <div className="md:w-1/2 w-full flex flex-col">
              <h2 className="text-xl md:text-2xl font-bold text-blue-700 mb-4 text-center md:text-left">
                Nearby Therapists
              </h2>
              <button
                onClick={findTherapists}
                disabled={loading || !mapsLoaded}
                className={`${loading || !mapsLoaded
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:from-blue-600 hover:to-blue-500"
                  } bg-gradient-to-r from-blue-500 to-blue-400 text-white px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold shadow mb-4 md:mb-6 self-center md:self-start transition-colors duration-200`}
              >
                {loading
                  ? "Searching..."
                  : !mapsLoaded
                    ? "Loading map..."
                    : "Find Nearby Therapists"}
              </button>

              <div className="flex-1 overflow-y-auto max-h-72 md:max-h-[400px] flex flex-col gap-3 md:gap-4">
                {therapists.length === 0 && !loading && (
                  <p className="text-gray-500 text-center mt-10">
                    No therapists loaded yet. Click the button above to search.
                  </p>
                )}
                {therapists.slice(0, 4).map((place, idx) => (
                  <div
                    key={idx}
                    className="bg-blue-50 border border-blue-200 rounded-xl shadow p-5 flex flex-col gap-1 hover:shadow-lg transition-shadow duration-200"
                  >
                    <h3 className="font-bold text-lg text-blue-800 mb-1 flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5.121 17.804A13.937 13.937 0 0112 15c2.485 0 4.797.657 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {place.name}
                    </h3>
                    {place.vicinity && (
                      <p className="text-sm text-gray-700 mb-1">
                        {place.vicinity}
                      </p>
                    )}
                    {place.formatted_phone_number && (
                      <a
                        href={`tel:${place.formatted_phone_number}`}
                        className="inline-flex items-center gap-1 text-blue-600 font-semibold hover:underline text-sm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a2 2 0 011.94 1.52l.3 1.2a2 2 0 01-.45 2.11l-1.27 1.27a16 16 0 007.07 7.07l1.27-1.27a2 2 0 012.11-.45l1.2.3A2 2 0 0121 15.72V19a2 2 0 01-2 2h-1C7.82 21 3 16.18 3 10V9a2 2 0 012-2z"
                          />
                        </svg>
                        {place.formatted_phone_number}
                      </a>
                    )}
                    {place.website && (
                      <a
                        href={place.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 font-semibold hover:underline text-sm mt-1"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        Website
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen w-full flex items-center justify-center bg-blue-50">
          <p className="text-xl font-semibold text-blue-600">Loading Google Maps...</p>
        </div>
      )}
    </LoadScript>
  );
};

export default NearbyTherapists;
