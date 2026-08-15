import { useEffect, useState } from "react";

function MobileOnlyGuard({ children }) {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 768
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isMobile) {
    return (
      <div className="mobile-only-page">

        <div className="mobile-only-content">

          <h1>SkookS</h1>

          <div className="mobile-only-icon">
            📱
          </div>

          <h2>Mobile Only for Now</h2>

          <p>
            SkookS is designed exclusively
            for mobile devices.
          </p>

          <p>
            Please open this website on your
            mobile phone for the best experience.
          </p>

        </div>

      </div>
    );
  }

  return children;
}

export default MobileOnlyGuard;