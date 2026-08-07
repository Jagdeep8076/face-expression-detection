import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utlis";

export default function FaceExpression({ onClick = () => {} }) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [expression, setExpression] = useState("Detecting...");

    useEffect(() => {
        init({
            landmarkerRef,
            videoRef,
            streamRef,
        });

        return () => {
            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }

            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);

    function handleClick() {
        const expression = detect({
            landmarkerRef,
            videoRef,
            setExpression,
        });

        console.log(expression);

        onClick(expression);
    }

    return (
        <>
            <div className="camera-header">
                <h2>Live Camera</h2>

                <span className="expression-badge">
                    {expression}
                </span>
            </div>

            <video
                ref={videoRef}
                className="camera"
                playsInline
                autoPlay
                muted
            />

            <button
                className="detect-btn"
                onClick={handleClick}
            >
                Detect Expression
            </button>
        </>
    );
}