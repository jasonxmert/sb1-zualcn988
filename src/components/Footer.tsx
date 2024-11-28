import React, { useState } from 'react';
import { Twitter, Mail } from 'lucide-react';
import { PolicyDialog } from './PolicyDialog';

export function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  const privacyContent = (
    <>
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      <h2 className="text-lg font-semibold mt-4 mb-2">Information Collection and Use</h2>
      <p>
        We collect information solely for the purpose of improving your experience with our postcode search service. 
        This includes search queries and general usage patterns to enhance our service accuracy and performance.
      </p>
      <h2 className="text-lg font-semibold mt-4 mb-2">Data Storage</h2>
      <p>
        We do not store personal information. Search queries are processed in real-time and are not permanently stored 
        in our systems.
      </p>
      <h2 className="text-lg font-semibold mt-4 mb-2">Cookies</h2>
      <p>
        We use essential cookies to maintain basic functionality. These cookies do not track personal information 
        and are deleted when you close your browser.
      </p>
      <h2 className="text-lg font-semibold mt-4 mb-2">Third-Party Services</h2>
      <p>
        We use OpenStreetMap for mapping services. Their privacy policy applies to the map data and imagery provided.
      </p>
    </>
  );

  const termsContent = (
    <>
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      <h2 className="text-lg font-semibold mt-4 mb-2">Acceptance of Terms</h2>
      <p>
        By accessing and using this website, you accept and agree to be bound by these Terms and Conditions 
        and our Privacy Policy.
      </p>
      <h2 className="text-lg font-semibold mt-4 mb-2">Use License</h2>
      <p>
        This service is provided for personal and commercial use. You may not modify, copy, distribute, transmit, 
        display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any 
        information obtained from this website.
      </p>
      <h2 className="text-lg font-semibold mt-4 mb-2">Disclaimer</h2>
      <p>
        The information provided by our postcode search service is for general guidance only. We make no 
        representations or warranties of any kind, express or implied, about the completeness, accuracy, 
        reliability, suitability, or availability of the website or the information.
      </p>
      <h2 className="text-lg font-semibold mt-4 mb-2">Limitations</h2>
      <p>
        We shall not be liable for any loss or damage including without limitation, indirect or consequential 
        loss or damage, arising from the use of this service.
      </p>
    </>
  );

  return (
    <footer className="bg-gray-800 text-gray-300 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <p className="text-sm">
              Our postcode search tool helps you find and explore locations worldwide with detailed information about each place.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li>
                <button 
                  onClick={() => setPrivacyOpen(true)} 
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setTermsOpen(true)} 
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <a 
                  href="mailto:sales@sldoptions.com" 
                  className="hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <p className="text-sm mb-4">Stay updated with our latest features and updates.</p>
            <div className="flex items-center space-x-4">
              <a 
                href="https://x.com/DCLjasonx" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a 
                href="mailto:sales@sldoptions.com" 
                className="hover:text-white transition-colors"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Postcode Search. All rights reserved.</p>
        </div>
      </div>

      <PolicyDialog
        title="Privacy Policy"
        content={privacyContent}
        open={privacyOpen}
        onOpenChange={setPrivacyOpen}
      />

      <PolicyDialog
        title="Terms of Service"
        content={termsContent}
        open={termsOpen}
        onOpenChange={setTermsOpen}
      />
    </footer>
  );
}