import { useProgress } from "@react-three/drei";
import { usePlay } from "../contexts/Play";
import { Timeline } from "./Timeline";

export const Overlay = () => {
  const { progress } = useProgress();
  const { play, end, setPlay, setEnd, hasScroll, showTimeline, setShowTimeline } = usePlay();
  
  return (
    <>
      <div
        className={`overlay ${play ? "overlay--disable" : ""}
        ${hasScroll ? "overlay--scrolled" : ""}`}
      >
        <div
          className={`loader ${progress === 100 ? "loader--disappear" : ""}`}
        />
        {progress === 100 && (
          <div className={`intro ${play ? "intro--disappear" : ""}`}>
            <div className="logo-image" />
            <p className="intro__scroll">Scroll to begin the journey</p>
            <button
              className="explore"
              onClick={() => {
                setPlay(true);
              }}
            >
              Explore
            </button>
          </div>
        )}
        <div className={`outro ${end ? "outro--appear" : ""}`}>
          <p className="outro__text">Wish you had a great journey with us...</p>
        
          <button
            className="outro__button"
            onClick={() => {
              setEnd(false);
              setPlay(true);
              setShowTimeline(true);
            }}
          >
            Know about us more
          </button>
        </div>
      </div>
      <Timeline isVisible={showTimeline} />
    </>
  );
};
