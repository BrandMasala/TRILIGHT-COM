import { useProgress } from "@react-three/drei";
import { usePlay } from "../contexts/Play";

export const Overlay = () => {
  const { progress } = useProgress();
  const { play, end, setPlay, setEnd, hasScroll, showTimeline, setShowTimeline, showLogoAtEnd, setShowLogoAtEnd } = usePlay();
  
  return (
    <>
      <div
        className={`overlay${play && !end ? " overlay--disable" : ""}${hasScroll ? " overlay--scrolled" : ""}`}
      >
        <div
          className={`loader ${progress === 100 ? "loader--disappear" : ""}`}
        />
        {progress === 100 && (
          <div className={`intro ${(play && !showLogoAtEnd) ? "intro--disappear" : ""}`}>
            <div className="logo-image" />
            {!showLogoAtEnd && <p className="intro__scroll">Scroll to begin the journey</p>}
            {!showLogoAtEnd && (
            <button
              className="explore"
              onClick={() => {
                setPlay(true);
              }}
            >
              Explore
            </button>
            )}
          </div>
        )}
        {/* <div className={`outro ${end ? "outro--appear" : ""}`}>
          <p className="outro__text">Wish you had a great journey with us...</p>
        
          <button
            className="outro__button"
            onClick={() => {
              window.location.href = "https://trilight-combi-html.vercel.app/";
            }}
          >
            Know More
          </button>
        </div> */}
      </div>
    </>
  );
};
