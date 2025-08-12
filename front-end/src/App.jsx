import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Banner from "./components/Banner/Banner.jsx";
import NoOne from "./components/NoOne/NoOne.jsx";
import Kishore from "./components/Kishore/Kishore.jsx";
import Intro from "./components/Intro/Intro.jsx";
import AboutUs from "./components/AboutUs/AboutUs.jsx";
import Merch from "./components/Merch/Merch.jsx";
import OurArtists from "./components/OurArtists/OurArtists.jsx";
import Updates from "./components/UpdatesComp/Updates.jsx";
import Cart from "./components/Cart/Cart.jsx";
// import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import Success from "./components/Pages/Success.jsx";
import Cancel from "./components/Pages/Cancel.jsx";
import OurVision from "./components/OurVision/OurVision.jsx";
import JoinUs from "./components/JoinUs/JoinUs.jsx";
import EcchiPrints from "./components/EcchiPrints/EcchiPrints.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import TShirts from "./components/T-Shirts/TShirts.jsx";
import ProductDetail from "./components/T-Shirts/ProductDetails.jsx";
import NovelReader from "./components/NovelReader/NovelReader.jsx";
import SinglePage from "./components/SinglePage/SinglePage.jsx";
import ScrollableImage from "./components/scrollable_Image/ScrollableImage.jsx";
import OrderList from "./components/Admin/OrderList.jsx";
// import { Toaster } from "react-hot-toast"

const AppContent = () => {
  const location = useLocation();
  const [showIntro, setShowIntro] = useState(true);

  // List of routes where intro should NOT be shown
  const noIntroRoutes = ["/cart", "/comiket-preorder", "/success", "/cancel"];

  // Check if current path should skip intro
  const shouldSkipIntro = noIntroRoutes.includes(location.pathname);

  useEffect(() => {
    // Only show intro if not in the excluded routes
    if (shouldSkipIntro) {
      setShowIntro(false);
      return;
    }

    setShowIntro(true);
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2000); // Show intro for 2 seconds

    return () => clearTimeout(timer);
  }, [location.pathname, shouldSkipIntro]);

  // If we're on a no-intro route, or intro is done, show the main content
  if (!showIntro || shouldSkipIntro) {
    return (
      <>
        {/* <ToastContainer position="top-right" autoClose={2000} /> */}
        {/* <Toaster/> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/photos-of-no-one"
            element={
              <Layout>
                <NoOne />
              </Layout>
            }
          />
          <Route path="/kishore" element={<Kishore />} />
          <Route
            path="/about-us"
            element={
              <Layout>
                <AboutUs />
              </Layout>
            }
          />
          <Route
            path="/our-artists"
            element={
              <Layout>
                <OurArtists />
              </Layout>
            }
          />
          <Route
            path="/updates"
            element={
              <Layout>
                <Updates />
              </Layout>
            }
          />
          <Route
            path="/cart"
            element={
              <Layout>
                <Cart />
              </Layout>
            }
          />
          <Route path="/comiket-preorder" element={<Merch />} />
          <Route
            path="/ecchi-prints"
            element={
              <Layout>
                <EcchiPrints />
              </Layout>
            }
          />
          <Route
            path="/t-shirts"
            element={
              <Layout>
                <TShirts />
              </Layout>
            }
          />
          <Route
            path="/product/:id"
            element={
              <Layout>
                <ProductDetail />
              </Layout>
            }
          />
          <Route
            path="/demon-girl-light-novel"
            element={
                <NovelReader />
            }
          />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route
            path="/our-vision"
            element={
              <Layout>
                <OurVision />
              </Layout>
            }
          />
          <Route
            path="/join-us"
            element={
              <Layout>
                <JoinUs />
              </Layout>
            }
          />

          <Route
            path="/single-page"
            element={
              <Layout>
                <SinglePage/>
              </Layout>
            }
          />
          <Route
            path="/scrollable-image"
            element={
              <Layout>
                <ScrollableImage/>
              </Layout>
            }
          />

           <Route
            path="/verify-orders"
            element={
              <Layout>
                <OrderList/>
              </Layout>
            }
          />
        </Routes>
      </>
    );
  }

  // Otherwise, show the intro
  return <Intro />;
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
