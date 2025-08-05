import { useParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Mail,
  User,
  MapPin,
  Briefcase,
  GraduationCap,
  Home,
  Star,
} from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

const profiles = [
  {
    id: "1",
    name: "Priya Sharma",
    age: 26,
    profession: "Software Engineer",
    location: "Bangalore, Karnataka",
    education: "B.Tech in Computer Science",
    salary: "₹8-12 LPA",
    height: "5'4\"",
    community: "Lingayat",
    motherTongue: "Kannada",
    images: [
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    ],
    about:
      "I am a passionate software engineer working in a leading tech company. I love traveling, reading books, and spending time with family. Looking for a caring and understanding life partner who shares similar values.",
    family: {
      father: "Business Owner",
      mother: "Homemaker",
      siblings: "1 Sister (Married)",
    },
    preferences: [
      "Age: 26-32 years",
      "Education: Graduate",
      "Profession: Any",
      "Location: Karnataka preferred",
    ],
  },
];

const PublicProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [isInterested, setIsInterested] = useState(false);

  const profile = profiles.find((p) => p.id === id) || profiles[0];

  const handleSendInterest = () => {
    setIsInterested(!isInterested);
    toast({
      title: isInterested ? "Interest Removed" : "Interest Sent!",
      description: isInterested
        ? "You have removed interest from this profile."
        : "Your interest has been sent successfully.",
    });
  };

  const handleChatNow = () => {
    toast({
      title: "Starting Chat",
      description: `Opening conversation with ${profile.name}...`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <Header />
      <div className="w-full max-w-screen-md mx-auto px-2 sm:px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-6 border-orange-100">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col lg:flex-row gap-y-6 gap-x-8">
                {/* Left: Main & secondary images */}
                <div className="w-full lg:w-1/3">
                  <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-orange-100 to-red-100">
                    <img
                      src={profile.images[0]}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {profile.images.slice(1).map((img, index) => (
                      <div
                        key={index}
                        className="aspect-square rounded overflow-hidden bg-orange-100"
                      >
                        <img
                          src={img}
                          alt={`${profile.name} ${index + 2}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Info + Buttons */}
                <div className="w-full lg:w-2/3">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
                        {profile.name}
                      </h1>
                      <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
                        <span className="flex items-center gap-1">
                          <User size={16} />
                          {profile.age} years
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={16} />
                          {profile.location}
                        </span>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 w-fit">
                      <Star size={12} className="mr-1" />
                      Verified
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-6 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Briefcase size={16} className="text-orange-500" />
                        <span className="font-medium">Profession:</span>
                        <span>{profile.profession}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <GraduationCap size={16} className="text-orange-500" />
                        <span className="font-medium">Education:</span>
                        <span>{profile.education}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-orange-500" />
                        <span className="font-medium">Height:</span>
                        <span>{profile.height}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Home size={16} className="text-orange-500" />
                        <span className="font-medium">Community:</span>
                        <span>{profile.community}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Mother Tongue:</span>
                        <span>{profile.motherTongue}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Salary:</span>
                        <span>{profile.salary}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      className={`w-full transition-all duration-300 hover:scale-105 ${
                        isInterested
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                      }`}
                      onClick={handleSendInterest}
                    >
                      <Heart
                        size={16}
                        className={`mr-2 ${isInterested ? "fill-current" : ""}`}
                      />
                      {isInterested ? "Interest Sent" : "Send Interest"}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-orange-200 text-orange-600 hover:bg-orange-50 transition-all duration-300 hover:scale-105"
                      onClick={handleChatNow}
                    >
                      <Mail size={16} className="mr-2" />
                      Chat Now
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About Me */}
          <Card className="mb-6 border-orange-100">
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-4">
                About Me
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {profile.about}
              </p>
            </CardContent>
          </Card>

          {/* Family */}
          <Card className="mb-6 border-orange-100">
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-4">
                Family Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Father:</span>
                  <p className="text-gray-600">{profile.family.father}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Mother:</span>
                  <p className="text-gray-600">{profile.family.mother}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Siblings:</span>
                  <p className="text-gray-600">{profile.family.siblings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Partner Preferences */}
          <Card className="border-orange-100">
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-4">
                Partner Preferences
              </h2>
              <div className="space-y-2 text-sm">
                {profile.preferences.map((pref, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-600">{pref}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
