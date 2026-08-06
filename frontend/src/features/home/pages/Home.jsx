import React from "react";
import { useNavigate } from "react-router-dom";

import FaceExpression from "../../Expression/components/FaceExpression";
import Player from "../components/player";

import { useSong } from "../hooks/use song";
import { useAuth } from "../../auth/hooks/useAuth";

import "./home.scss";
import logo from "../../../assets/logo.png";

const Home = () => {

  const navigate = useNavigate();

  const { handleGetSong, song } = useSong();

  const { user, handleLogout } = useAuth();

  const logoutUser = async () => {
    await handleLogout();
    navigate("/login");
  };

  return (
    <div className="home">

      {/* ================= HEADER ================= */}

      <header className="home-header">

        <div className="header-left">

          <div className="logo">
            <img src={logo} alt="FaceBeat" />
          </div>

          <div className="header-text">

            <h1>Welcome to FaceBeat</h1>

            <p>AI Mood Based Music Recommendation</p>

          </div>

        </div>

        <div className="header-right">

          <div className="profile">

            <div className="avatar">

              {user?.username
                ? user.username.charAt(0).toUpperCase()
                : "U"}

            </div>

            <span>

              {user?.username || "User"}

            </span>

          </div>

          <button
            className="logout-btn"
            onClick={logoutUser}
          >
            Logout
          </button>

        </div>

      </header>

      {/* ================= BODY ================= */}

      <div className="home-body">

        {/* CAMERA */}

        <div className="camera-section">

          <div className="camera-card">

            <FaceExpression
              onClick={(expression) =>
                handleGetSong({
                  mood: expression,
                })
              }
            />

          </div>

        </div>

        {/* SONG */}

        <div className="song-section">

          <div className="song-card">

            <h2 className="section-title">
              Recommended Song
            </h2>

            {song ? (

              <>

                <img
                  src={song.posterUrl}
                  alt={song.title}
                  className="song-poster"
                />

                <div className="song-info">

                  <h2>{song.title}</h2>

                  <p className="artist">

                    AI Recommendation

                  </p>

                  <span className="mood">

                    😊 {song.mood}

                  </span>

                </div>

                <div className="lyrics">

                  <h3>Lyrics</h3>

                  <p>

                    {song.lyrics || "Lyrics not available"}

                  </p>

                </div>

              </>

            ) : (

              <div className="empty-card">

                <h2>No Song Selected</h2>

                <p>

                  Detect your face to get music recommendations 🎵

                </p>

              </div>

            )}

          </div>

        </div>

      </div>

      {/* ================= PLAYER ================= */}

      <Player />

    </div>
  );
};

export default Home;