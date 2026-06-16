export function saveScrollAndNavigate(
    navigate,
    path
  ) {
    sessionStorage.setItem(
      "homeScroll",
      window.scrollY
    );
  
    navigate(path);
  }