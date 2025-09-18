import React, { useEffect, useState, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Router, Route, Switch, useLocation, Redirect } from "wouter";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import OfficeSpace from "@/pages/services/OfficeSpace";
import Coworking from "@/pages/services/Coworking";
import VirtualOffices from "@/pages/services/VirtualOffices";
import MeetingRooms from "@/pages/services/MeetingRooms";
import Membership from "@/pages/services/Membership";
import BusinessAddress from "@/pages/services/BusinessAddress";
import TelephoneAnswering from "@/pages/services/TelephoneAnswering";
import PrivateOffices from "@/pages/services/PrivateOffices";
import HotDesking from "@/pages/services/HotDesking";
import DedicatedDesk from "@/pages/services/DedicatedDesk";
import Checkout from "@/pages/Checkout";
import NelloreLocation from "@/pages/Locations/Nellore";
import NotFound from "@/pages/not-found";
import ProfileSettings from "@/pages/ProfileSettings"; 
import { queryClient } from "@/lib/queryClient";
import { AuthProvider, useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ children, publicRoute = false }: { children: React.ReactNode, publicRoute?: boolean }) => {
  const { user, loading } = useAuth();
  const [location, setLocation] = useLocation();
  const [initialLoad, setInitialLoad] = useState(true);
  const redirectingRef = useRef(false);

  // Handle redirects
  useEffect(() => {
    // Skip if still loading or already redirecting
    if (loading || redirectingRef.current) return;

    const currentPath = window.location.pathname;
    
    console.log('ProtectedRoute:', { 
      path: currentPath, 
      user: !!user, 
      publicRoute, 
      loading, 
      initialLoad 
    });

    // If we're still on initial load, wait for auth to complete
    if (initialLoad) {
      setInitialLoad(false);
      return;
    }

    // Handle authenticated user on public route (like login/register)
    if (user && publicRoute) {
      if (currentPath !== '/dashboard') {
        console.log('Redirecting to dashboard');
        redirectingRef.current = true;
        setLocation('/dashboard');
      }
      return;
    }

    // Handle unauthenticated user on protected route
    if (!user && !publicRoute) {
      if (currentPath !== '/login') {
        console.log('Redirecting to login');
        redirectingRef.current = true;
        setLocation('/login');
      }
      return;
    }

    // Reset redirecting flag if we get here
    redirectingRef.current = false;
  }, [user, loading, publicRoute, location, setLocation, initialLoad]);

  // Show loading state only during initial load
  if (loading && initialLoad) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // Show nothing while redirecting
  if (redirectingRef.current) {
    return null;
  }

  // If authenticated and on protected route, or unauthenticated and on public route, show content
  if ((user && !publicRoute) || (!user && publicRoute)) {
    return <>{children}</>;
  }

  // In all other cases, show nothing (redirect will happen on next render)
  return null;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <Switch>
                  <Route path="/">
                    <Home />
                  </Route>
                  <Route path="/about">
                    <About />
                  </Route>
                  <Route path="/contact">
                    <Contact />
                  </Route>
                  <Route path="/dashboard">
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  </Route>
                  <Route path="/profile/settings">
                    <ProtectedRoute>
                      <ProfileSettings />
                    </ProtectedRoute>
                  </Route>
                  <Route path="/checkout/:serviceId">
                    <Checkout />
                  </Route>
                  <Route path="/locations/nellore">
                    <NelloreLocation />
                  </Route>
                  <Route path="/services/office-space">
                    <OfficeSpace />
                  </Route>
                  <Route path="/services/coworking">
                    <Coworking />
                  </Route>
                  <Route path="/services/virtual-offices">
                    <VirtualOffices />
                  </Route>
                  <Route path="/services/meeting-rooms">
                    <MeetingRooms />
                  </Route>
                  <Route path="/services/dedicated-desk">
                    <DedicatedDesk />
                  </Route>
                  <Route path="/services/membership">
                    <Membership />
                  </Route>
                  <Route path="/services/business-address">
                    <BusinessAddress />
                  </Route>
                  <Route path="/services/telephone-answering">
                    <TelephoneAnswering />
                  </Route>
                  <Route path="/services/private-offices">
                    <PrivateOffices />
                  </Route>
                  <Route path="/services/hot-desking">
                    <HotDesking />
                  </Route>
                  <Route path="/profile">
                    <Redirect to="/profile/settings" />
                  </Route>
                </Switch>
              </main>
              
              {/* Login and Register routes */}
              <Route path="/login">
                <ProtectedRoute publicRoute>
                  <Login />
                </ProtectedRoute>
              </Route>
              <Route path="/register">
                <ProtectedRoute publicRoute>
                  <Register />
                </ProtectedRoute>
              </Route>
              <Route path="/not-found">
                <NotFound />
              </Route>
              <Footer />
            </div>
          </Router>
        </AuthProvider>
      </TooltipProvider>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
