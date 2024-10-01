"use client";

import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "../styles/carouselHome.css";

export default function CarouselHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: true,
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <div className="navigation-wrapper shadow-2xl">
      <div ref={sliderRef} className="keen-slider w-full h-full">
        <div className="keen-slider__slide number-slide1 ">
          <h3 className="font-bold text-2xl">
            Subscribe to the best of Courselint
          </h3>
          <p>
            With Personal Plan, you get acces to 1000+ of our top-rated courses
            in tech, business, and more
          </p>
        </div>
        <div className="keen-slider__slide number-slide2">
          <h3 className="font-bold text-2xl">Jump into learning for less</h3>
          <p>
            If you’re new to Courselint , we’ve got good news: <br />
            For a limited time, courses start at just $13.99 for new learners!
            Shop now.
          </p>
        </div>
      </div>
      {loaded && instanceRef.current && (
        <>
          <Arrow
            left
            onClick={(e) => e.stopPropagation() || instanceRef.current?.prev()}
            disabled={currentSlide === 0}
          />

          <Arrow
            onClick={(e) => e.stopPropagation() || instanceRef.current?.next()}
            disabled={
              currentSlide ===
              instanceRef.current.track.details.slides.length - 1
            }
          />
        </>
      )}
    </div>
  );
}

function Arrow(props) {
  const disabled = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}
