/*global google*/

import React, { useEffect, useRef } from "react";
import "./HomePage.css";

export default function Home() {
  const mapContainerRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    // Function to load the Google Maps API script
    function loadScript(url, callback) {
      let script = document.createElement("script");
      script.type = "text/javascript";
      script.src = url;
      script.onreadystatechange = callback;
      script.onload = callback;
      document.body.appendChild(script);
    }

    // Initialize after Google Maps API script is loaded
    function initGoogleMaps() {
      const autocomplete = new google.maps.places.Autocomplete(
        searchInputRef.current,
        {
          types: ["geocode"],
        }
      );

      google.maps.event.addListener(autocomplete, "place_changed", function () {
        const near_place = autocomplete.getPlace();
        const map = new google.maps.Map(mapContainerRef.current, {
          center: near_place.geometry.location,
          zoom: 25,
          tilt: 0,
          mapTypeId: google.maps.MapTypeId.SATELLITE,
        });

        new google.maps.Marker({
          map: map,
          title: near_place.name,
          position: near_place.geometry.location,
        });

        map.setZoom(20);
      });
    }

    // Check if Google Maps API is already loaded
    if (!window.google) {
      loadScript(
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyA3RtZ_HVIBl5TsrrVSuKxmbRNhc0oRKeQ&libraries=places",
        initGoogleMaps
      );
    } else {
      initGoogleMaps();
    }
  }, []);
  return (
    <>
      <div className="hero-container">
        <div className="hero-left-container">
          <div className="hero-left-top">
            Did you know that the average US homeowner who switches to solar
            saves over $6000 annually?
          </div>
          <div className="hero-left-middle">
            Switching to solar, saves you money, and saves our planet
          </div>
          <div className="hero-left-bottom">
            Ecoroof makes it easy to learn about the transition, and shows you
            the benefits of switching in less than 1 minute! its that easy!
          </div>
        </div>
        <div className="hero-right-container">
          <div className="hero-right-top">
            <div className="hero-right-video">
              <video
                id="tesla-roof-transition-video"
                src="/public/video/Carousel_Design.mp4"
                type="video/mp4"
                autoPlay
                loop
                muted
              ></video>
              <div className="sourced-from-tesla">
                footage sourced from&nbsp;
                <a href="https://www.tesla.com/solarroof" target="blank_">
                  Tesla
                </a>
              </div>
            </div>
          </div>
          <div className="hero-right-middle"></div>
          <div className="hero-right-bottom"></div>
        </div>
      </div>
      <div className="google-maps-api-input-searchup-container">
        <div className="google-maps-api-input-header">
          <h2>Find Your Roof</h2>
        </div>
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Enter address here..."
        />
      </div>
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "500px" }}
      ></div>
    </>
  );
}
