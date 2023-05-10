const Footer = () => {
  return (
      <footer className="bg-gray-800 text-white p-4 shadow-color-red drop-shadow-xl rounded-md">
          <div className="container mx-auto flex items-center justify-between">
              <div className="text-xl font-semibold">MFE-ESHOP</div>
              <nav className="flex items-center space-x-4">
                  <a href="#" className="hover:text-blue-400">
                      About
                  </a>
                  <a href="#" className="hover:text-blue-400">
                      Services
                  </a>
                  <a href="#" className="hover:text-blue-400">
                      Contact
                  </a>
              </nav>
              <div className="text-sm">&copy; {new Date().getFullYear()} MFE-ESHOP. All Rights Reserved.</div>
          </div>
      </footer>
  );
}

export { Footer }
