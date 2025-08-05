import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Page Components
import Index from "./pages/Index";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import ProfileDetails from "./pages/ProfileDetails";
import PublicProfile from "./pages/PublicProfile";
import Search from "./pages/Search";
import Messages from "./pages/Messages";
import SuccessStories from "./pages/SuccessStories";
import Membership from "./pages/Membership";
import Payment from "./pages/Payment";
import Support from "./pages/Support";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import Notifications from "./pages/Notifications";
import Admin from "./pages/Admin";
import AdminReports from "./pages/AdminReports";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminSettings from "./pages/AdminSettings";
import NotFound from "./pages/NotFound";
import Events from "./pages/Events"; // ✅ NEW: Events Page
import FeaturedProfiles from "./components/FeaturedProfiles"; // ✅ NEW: FeaturedProfiles Page

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        {/* ✅ Toast Notifications */}
        <Toaster /> {/* from shadcn/ui */}
        <Sonner />  {/* from sonner */}
        
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<ProfileDetails />} />
            <Route path="/profile/:id" element={<PublicProfile />} />
            <Route path="/search" element={<Search />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/support" element={<Support />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/events" element={<Events />} /> {/* ✅ Events Route */}
            <Route path="/featured" element={<FeaturedProfiles />} /> {/* ✅ FeaturedProfiles Route */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
