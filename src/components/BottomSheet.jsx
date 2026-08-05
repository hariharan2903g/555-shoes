import "./BottomSheet.css";
import { FiX } from "react-icons/fi";
import { useEffect, useState, useRef } from "react";

function BottomSheet({
    open,
    onClose,
    title,
    children
}) {

    useEffect(() => {

        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    
        return () => {
            document.body.style.overflow = "";
        };
    
    }, [open]);

    const [translateY, setTranslateY] = useState(0);
    const [closing, setClosing] = useState(false);
    const startY = useRef(0);
    const dragging = useRef(false);

    const handleTouchStart = (e) => {
        dragging.current = true;
        startY.current = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e) => {
    
        if (!dragging.current) return;
    
        const delta = e.touches[0].clientY - startY.current;
    
        if (delta > 0) {
            setTranslateY(delta);
        }
    };
    
    const handleTouchEnd = () => {

        dragging.current = false;
    
        if (translateY > 120) {
    
            setClosing(true);
            setTranslateY(window.innerHeight);
    
            setTimeout(() => {
    
                onClose();
    
                setClosing(false);
                setTranslateY(0);
    
            }, 300);
    
        } else {
    
            setTranslateY(0);
    
        }
    
    };



    if (!open) return null;

    return (

        <>

            <div
                className="bottom-sheet-overlay"
                onClick={onClose}
            />

            <div
                    className="bottom-sheet"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={{
                        transform: `translateY(${translateY}px)`,
                        transition: dragging.current
                            ? "none"
                            : "transform .3s cubic-bezier(.22,1,.36,1)"
                    }}
                >

                    <div
                        className="sheet-drag-area"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div className="sheet-handle" />
                    </div>



                <div className="bottom-sheet-header">

                    <h2>{title}</h2>

                    <button
                        className="sheet-close-btn"
                        onClick={onClose}
                    >
                        <FiX />
                    </button>

                </div>

                <div className="bottom-sheet-content">

                    {children}

                </div>

            </div>

        </>

    );

}

export default BottomSheet;