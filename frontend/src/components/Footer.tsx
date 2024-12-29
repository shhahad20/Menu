import "../styles/footer.scss";

const Footer: React.FC = () => {
  const cureentYear = new Date().getFullYear();
  return (
    <section id="footer-section">
      <footer className="text-white py-5">
        <div className="container mx-auto px-5">
          {/* Footer content */}
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0">
            {/* Company Column */}
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400">
                    Customers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400">
                    About us
                  </a>
                </li>
                {/* <li><a href="#" className="hover:text-gray-400">Work at Expo</a></li> */}
              </ul>
            </div>
            {/* Product Column */}
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400">
                    How to Start
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400">
                    Request Design ↗
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400">
                    Menu Templates ↗
                  </a>
                </li>
                {/* <li><a href="#" className="hover:text-gray-400">EAS CLI on GitHub ↗</a></li>
              <li><a href="#" className="hover:text-gray-400">Expo Go</a></li>
              <li><a href="#" className="hover:text-gray-400">Expo Orbit</a></li>
              <li><a href="#" className="hover:text-gray-400">Snack ↗</a></li> */}
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400">
                    Docs ↗
                  </a>
                </li>
                {/* <li><a href="#" className="hover:text-gray-400">Blog</a></li> */}
                <li>
                  <a href="#" className="text-gray-400">
                    Star us on GitHub ↗
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400">
                    Newsletter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400">
                    Support
                  </a>
                </li>
                {/* Social Media Icons */}
                <div className="icons-container flex space-x-4 text-lg">
                  <a href="#" className="text-gray-400">
                    <img
                      src="/githubIcon.svg"
                      alt="GitHub Icon"
                      className="h-6 w-6"
                    />
                  </a>
                  <a href="#" className="text-gray-400">
                    <img
                      src="/linkedinIcon.svg"
                      alt="LinkedIn Icon"
                      className="h-6 w-6"
                    />
                  </a>
                  {/* <a href="#" className="text-gray-400"></a> */}
                </div>
                {/* <li><a href="#" className="hover:text-gray-400">Job Board ↗</a></li> */}
              </ul>
            </div>
          </div>

          {/* Footer bottom content */}
          <div className="mt-1 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              © {cureentYear} MenuCraft. All rights reserved.
            </div>

            {/* <div className="icons-container flex space-x-4 text-lg">
              <a href="#" className="text-gray-400">
                <img
                  src="/githubIcon.svg"
                  alt="GitHub Icon"
                  className="h-6 w-6"
                />
              </a>
              <a href="#" className="text-gray-400">
                <img
                  src="/linkedinIcon.svg"
                  alt="LinkedIn Icon"
                  className="h-6 w-6"
                />
              </a>
      
            </div> */}
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
