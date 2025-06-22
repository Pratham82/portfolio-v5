const MiniFooter = () => {
  return (
    <footer className="fixed bottom-2 right-2 text-xs text-gray-500 z-10 text-right space-y-1">
      <div>
        Designed & Developed by{" "}
        <a
          href="https://github.com/Pratham82"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-400 transition-colors"
        >
          Prathamesh
        </a>
      </div>
      <div>
        Animation inspired by{" "}
        <a
          href="https://antfu.me"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-400 transition-colors"
        >
          @antfu
        </a>
      </div>
    </footer>
  );
};

export default MiniFooter;
