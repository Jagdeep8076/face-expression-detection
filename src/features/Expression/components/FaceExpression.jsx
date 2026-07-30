import { useEffect, useRef, useState } from "react";
import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

export default function FaceExpression() {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const animationRef = useRef(null);

  const [expression, setExpression] = useState("Detecting...");

  const [scores, setScores] = useState({
    smile: 0,
    frown: 0,
    jawOpen: 0,
    browUp: 0,
    eyeWide: 0,
  });

  useEffect(() => {
    let stream;

    const init = async () => {
      try {
        // ==============================
        // 1. MEDIAPIPE LOAD
        // ==============================

        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

        // ==============================
        // 2. FACE LANDMARKER
        // ==============================

        landmarkerRef.current =
          await FaceLandmarker.createFromOptions(vision, {
            baseOptions: {
              modelAssetPath:
                "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
            },

            runningMode: "VIDEO",
            numFaces: 1,

            outputFaceBlendshapes: true,
          });

        // ==============================
        // 3. CAMERA
        // ==============================

        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: 640,
            height: 480,
          },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          await videoRef.current.play();

          detect();
        }
      } catch (error) {
        console.error("MediaPipe Error:", error);

        setExpression("Something went wrong");
      }
    };

    // ==============================
    // 4. DETECTION
    // ==============================

    const detect = () => {
      if (!landmarkerRef.current || !videoRef.current) {
        return;
      }

      if (videoRef.current.readyState < 2) {
        animationRef.current =
          requestAnimationFrame(detect);

        return;
      }

      const results =
        landmarkerRef.current.detectForVideo(
          videoRef.current,
          performance.now()
        );

      // ==============================
      // 5. FACE FOUND
      // ==============================

      if (results.faceBlendshapes?.length > 0) {
        const blendshapes =
          results.faceBlendshapes[0].categories;

        const getScore = (name) => {
          return (
            blendshapes.find(
              (item) =>
                item.categoryName === name
            )?.score || 0
          );
        };

        // ==============================
        // 6. RAW SCORES
        // ==============================

        const smileLeft =
          getScore("mouthSmileLeft");

        const smileRight =
          getScore("mouthSmileRight");

        const frownLeft =
          getScore("mouthFrownLeft");

        const frownRight =
          getScore("mouthFrownRight");

        const jawOpen =
          getScore("jawOpen");

        const browInnerUp =
          getScore("browInnerUp");

        const eyeWideLeft =
          getScore("eyeWideLeft");

        const eyeWideRight =
          getScore("eyeWideRight");

        // ==============================
        // 7. AVERAGE SCORES
        // ==============================

        const smile =
          (smileLeft + smileRight) / 2;

        const frown =
          (frownLeft + frownRight) / 2;

        const eyeWide =
          (eyeWideLeft + eyeWideRight) / 2;

        // Debugging ke liye screen par dikhao
        setScores({
          smile,
          frown,
          jawOpen,
          browUp: browInnerUp,
          eyeWide,
        });

        // ==============================
        // 8. EXPRESSION CLASSIFICATION
        // ==============================

        let currentExpression = "Neutral 😐";

        // ------------------------------
        // SURPRISED
        // ------------------------------
        // Mouth open + eyes/brows raised

        if (
          jawOpen > 0.35 &&
          (
            eyeWide > 0.20 ||
            browInnerUp > 0.25
          )
        ) {
          currentExpression = "Surprised 😲";
        }

        // ------------------------------
        // HAPPY
        // ------------------------------

        else if (smile > 0.45) {
          currentExpression = "Happy 😄";
        }

        // ------------------------------
        // SAD-LIKE / FROWN
        // ------------------------------

        else if (
          frown > 0.20 &&
          smile < 0.25
        ) {
          currentExpression = "Sad 😢";
        }

        // ------------------------------
        // NEUTRAL
        // ------------------------------

        else {
          currentExpression = "Neutral 😐";
        }

        setExpression(currentExpression);
      } else {
        setExpression("No Face Detected");
      }

      animationRef.current =
        requestAnimationFrame(detect);
    };

    init();

    // ==============================
    // 9. CLEANUP
    // ==============================

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(
          animationRef.current
        );
      }

      if (landmarkerRef.current) {
        landmarkerRef.current.close();
        landmarkerRef.current = null;
      }

      if (stream) {
        stream
          .getTracks()
          .forEach((track) =>
            track.stop()
          );
      }
    };
  }, []);

  // ==============================
  // UI
  // ==============================

  return (
    <div
      style={{
        textAlign: "center",
        padding: "30px",
      }}
    >
      <h1>Face Expression Detection</h1>

      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{
          width: "450px",
          maxWidth: "100%",
          borderRadius: "12px",
          transform: "scaleX(-1)",
        }}
      />

      <h2>
        Expression: {expression}
      </h2>

      {/* DEBUG SCORES */}

      <div
        style={{
          marginTop: "20px",
          fontFamily: "monospace",
        }}
      >
        <p>
          Smile: {scores.smile.toFixed(2)}
        </p>

        <p>
          Frown: {scores.frown.toFixed(2)}
        </p>

        <p>
          Jaw Open: {scores.jawOpen.toFixed(2)}
        </p>

        <p>
          Brow Up: {scores.browUp.toFixed(2)}
        </p>

        <p>
          Eye Wide: {scores.eyeWide.toFixed(2)}
        </p>
      </div>
    </div>
  );
}