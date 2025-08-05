import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Grid,
  List,
  Search as SearchIcon,
  Heart,
  X,
  User,
  MapPin,
  Briefcase,
} from "lucide-react";
import Header from "@/components/Header";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Search = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [ageRange, setAgeRange] = useState([25, 35]);
  const [showResults, setShowResults] = useState(false);
  const [passedProfiles, setPassedProfiles] = useState<number[]>([]);
  const [interestedProfiles, setInterestedProfiles] = useState<number[]>([]);

  const [selectedCommunity, setSelectedCommunity] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedEducation, setSelectedEducation] = useState("");
  const [selectedProfession, setSelectedProfession] = useState("");
  const [selectedIncome, setSelectedIncome] = useState("");
  const [horoscopeMatch, setHoroscopeMatch] = useState(false);
  const [photoAvailable, setPhotoAvailable] = useState(true);

  const { toast } = useToast();

  const profiles = [
    { id: 1, name: "Ananya K.", age: 27, profession: "Software Developer", location: "Bangalore", education: "B.E in IT", community: "lingayat", income: "8-12", horoscope: true, image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
    { id: 2, name: "Divya N.", age: 25, profession: "Nurse", location: "Chennai", education: "B.Sc Nursing", community: "brahmin", income: "5-8", horoscope: true, image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
    { id: 3, name: "Rashmi P.", age: 29, profession: "Bank Manager", location: "Hubli", education: "MBA Finance", community: "vokkaliga", income: "12-20", horoscope: false, image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
    { id: 4, name: "Shreya M.", age: 26, profession: "Civil Engineer", location: "Mysore", education: "B.E Civil", community: "kuruba", income: "8-12", horoscope: true, image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
    { id: 5, name: "Varsha S.", age: 24, profession: "Graphic Designer", location: "Mangalore", education: "B.Des", community: "lingayat", income: "5-8", horoscope: false, image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
    { id: 6, name: "Pooja R.", age: 28, profession: "Pharmacist", location: "Davangere", education: "B.Pharm", community: "brahmin", income: "8-12", horoscope: true, image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" }
  ];

  const getFilteredProfiles = () => {
    return profiles.filter(profile => {
      if (profile.age < ageRange[0] || profile.age > ageRange[1]) return false;
      if (selectedCommunity && selectedCommunity !== "all" && profile.community !== selectedCommunity) return false;
      if (selectedLocation && profile.location.toLowerCase() !== selectedLocation.toLowerCase()) return false;

      const educationMap = {
        "graduate": ["B.E", "B.Sc", "B.Des", "B.Pharm"],
        "postgraduate": ["MBA", "M.E", "M.Sc"],
        "professional": ["B.E", "MBA", "B.Pharm"],
        "doctorate": ["Ph.D", "MD"]
      };
      if (selectedEducation) {
        const keywords = educationMap[selectedEducation] || [];
        if (!keywords.some(k => profile.education.includes(k))) return false;
      }

      const professionMap = {
        "engineer": ["Developer", "Engineer"],
        "doctor": ["Doctor", "Nurse"],
        "teacher": ["Teacher", "Professor"],
        "business": ["Manager", "Business"],
        "government": ["Government", "Officer"]
      };
      if (selectedProfession) {
        const keywords = professionMap[selectedProfession] || [];
        if (!keywords.some(k => profile.profession.includes(k))) return false;
      }

      if (selectedIncome && profile.income !== selectedIncome) return false;
      if (horoscopeMatch && !profile.horoscope) return false;
      if (photoAvailable && !profile.image) return false;

      return true;
    });
  };

  const handleSearch = () => setShowResults(true);
  const handlePass = (id: number) => {
    setPassedProfiles(prev => [...prev, id]);
    toast({ title: "Profile Passed", description: "You have passed on this profile." });
  };
  const handleInterest = (id: number) => {
    setInterestedProfiles(prev => [...prev, id]);
    toast({ title: "Interest Sent", description: "Your interest has been sent." });
  };

  const filteredProfiles = showResults ? getFilteredProfiles() : [];
  const displayProfiles = filteredProfiles.filter(p => !passedProfiles.includes(p.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Advanced Search</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card className="border-yellow-200 sticky top-4">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-6">Search Filters</h2>
                <div className="space-y-6">
                  <div>
                    <Label className="block mb-3">Age Range: {ageRange[0]} - {ageRange[1]} years</Label>
                    <Slider value={ageRange} onValueChange={setAgeRange} min={18} max={60} />
                  </div>
                  <div>
                    <Label className="mb-2 block">Community</Label>
                    <Select value={selectedCommunity} onValueChange={setSelectedCommunity}>
                      <SelectTrigger className="border-orange-200">
                        <SelectValue placeholder="Select community" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lingayat">Lingayat</SelectItem>
                        <SelectItem value="brahmin">Brahmin</SelectItem>
                        <SelectItem value="vokkaliga">Vokkaliga</SelectItem>
                        <SelectItem value="kuruba">Kuruba</SelectItem>
                        <SelectItem value="all">All Communities</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="mb-2 block">Location</Label>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger className="border-orange-200">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bangalore">Bangalore</SelectItem>
                        <SelectItem value="Mysore">Mysore</SelectItem>
                        <SelectItem value="Hubli">Hubli</SelectItem>
                        <SelectItem value="Mangalore">Mangalore</SelectItem>
                        <SelectItem value="Davangere">Davangere</SelectItem>
                        <SelectItem value="Chennai">Chennai</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="mb-2 block">Education</Label>
                    <Select value={selectedEducation} onValueChange={setSelectedEducation}>
                      <SelectTrigger className="border-orange-200">
                        <SelectValue placeholder="Select education" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="graduate">Graduate</SelectItem>
                        <SelectItem value="postgraduate">Post Graduate</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="doctorate">Doctorate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="mb-2 block">Profession</Label>
                    <Select value={selectedProfession} onValueChange={setSelectedProfession}>
                      <SelectTrigger className="border-orange-200">
                        <SelectValue placeholder="Select profession" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineer">Engineer</SelectItem>
                        <SelectItem value="doctor">Doctor</SelectItem>
                        <SelectItem value="teacher">Teacher</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="government">Government Job</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="mb-2 block">Annual Income</Label>
                    <Select value={selectedIncome} onValueChange={setSelectedIncome}>
                      <SelectTrigger className="border-orange-200">
                        <SelectValue placeholder="Select income range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3-5">₹3-5 LPA</SelectItem>
                        <SelectItem value="5-8">₹5-8 LPA</SelectItem>
                        <SelectItem value="8-12">₹8-12 LPA</SelectItem>
                        <SelectItem value="12-20">₹12-20 LPA</SelectItem>
                        <SelectItem value="20+">₹20+ LPA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Horoscope Match</Label>
                    <Switch checked={horoscopeMatch} onCheckedChange={setHoroscopeMatch} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Photo Available</Label>
                    <Switch checked={photoAvailable} onCheckedChange={setPhotoAvailable} />
                  </div>
                  <Button 
                    onClick={handleSearch}
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700"
                  >
                    <SearchIcon size={16} className="mr-2" />
                    Search Profiles
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Search Results</h2>
                <p className="text-gray-600">
                  {showResults ? `Showing ${displayProfiles.length} profiles matching your criteria` : "Use filters to find your perfect match"}
                </p>
              </div>

              {showResults && (
                <div className="flex items-center gap-2">
                  <Button size="sm" onClick={() => setViewMode('grid')} variant={viewMode === 'grid' ? 'default' : 'outline'} className={viewMode === 'grid' ? 'bg-yellow-500 hover:bg-yellow-600' : 'border-yellow-300'}>
                    <Grid size={16} />
                  </Button>
                  <Button size="sm" onClick={() => setViewMode('list')} variant={viewMode === 'list' ? 'default' : 'outline'} className={viewMode === 'list' ? 'bg-yellow-500 hover:bg-yellow-600' : 'border-yellow-300'}>
                    <List size={16} />
                  </Button>
                </div>
              )}
            </div>

            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6' : 'gap-4'}`}>
              {displayProfiles.map(profile => (
                <Card key={profile.id} className={`overflow-hidden hover:shadow-lg transition-shadow border-yellow-200 ${viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''}`}>
                  <div className={`relative ${viewMode === 'list' ? 'w-full sm:w-40 h-40' : 'aspect-square'}`}>
                    <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" />
                  </div>

                  <CardContent className="p-4 flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{profile.name}</h3>
                    <div className="space-y-1 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1"><User size={14} /><span>{profile.age} years</span></div>
                      <div className="flex items-center gap-1"><Briefcase size={14} /><span>{profile.profession}</span></div>
                      <div className="flex items-center gap-1"><MapPin size={14} /><span>{profile.location}</span></div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" className="flex-1 border-red-200 text-red-600 hover:bg-red-50" onClick={() => handlePass(profile.id)}>
                        <X size={16} className="mr-1" /> Pass
                      </Button>
                      <Button size="sm" className={`flex-1 ${interestedProfiles.includes(profile.id) ? "bg-green-600 hover:bg-green-700" : "bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700"}`} onClick={() => handleInterest(profile.id)}>
                        <Heart size={16} className="mr-1" /> {interestedProfiles.includes(profile.id) ? "Interest Sent" : "Interest"}
                      </Button>
                    </div>
                    <Link to={`/profile/${profile.id}`}>
                      <Button variant="ghost" className="w-full mt-2 text-yellow-600 hover:bg-yellow-50">View Profile</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
