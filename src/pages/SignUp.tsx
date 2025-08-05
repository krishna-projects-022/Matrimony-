
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    lookingFor: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    religion: "",
    community: "",
    motherTongue: "",
    maritalStatus: "",
    height: "",
    education: "",
    occupation: "",
    income: "",
    city: "",
    state: "",
    mobile: "",
    otp: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });

  const [otpSent, setOtpSent] = useState(false);
  const [filteredCities, setFilteredCities] = useState([]);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  // Comprehensive list of Indian cities
  const indianCities = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Surat", "Pune", "Jaipur",
    "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", "Patna", "Vadodara",
    "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", "Kalyan-Dombivli", "Vasai-Virar", "Varanasi",
    "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai", "Allahabad", "Ranchi", "Howrah", "Coimbatore", "Jabalpur",
    "Gwalior", "Vijayawada", "Jodhpur", "Madurai", "Raipur", "Kota", "Guwahati", "Chandigarh", "Solapur", "Hubli-Dharwad",
    "Bareilly", "Moradabad", "Mysore", "Gurgaon", "Aligarh", "Jalandhar", "Tiruchirappalli", "Bhubaneswar", "Salem", "Warangal",
    "Guntur", "Bhiwandi", "Saharanpur", "Gorakhpur", "Bikaner", "Amravati", "Noida", "Jamshedpur", "Bhilai", "Cuttack",
    "Firozabad", "Kochi", "Nellore", "Bhavnagar", "Dehradun", "Durgapur", "Asansol", "Rourkela", "Nanded", "Kolhapur",
    "Ajmer", "Akola", "Gulbarga", "Jamnagar", "Ujjain", "Loni", "Siliguri", "Jhansi", "Ulhasnagar", "Jammu",
    "Sangli-Miraj & Kupwad", "Mangalore", "Erode", "Belgaum", "Ambattur", "Tirunelveli", "Malegaon", "Gaya", "Jalgaon", "Udaipur",
    "Maheshtala", "Davanagere", "Kozhikode", "Kurnool", "Rajpur Sonarpur", "Rajahmundry", "Bokaro", "South Dumdum", "Bellary", "Patiala",
    "Gopalpur", "Agartala", "Bhagalpur", "Muzaffarnagar", "Bhatpara", "Panihati", "Latur", "Dhule", "Rohtak", "Korba",
    "Bhilwara", "Berhampur", "Muzaffarpur", "Ahmednagar", "Mathura", "Kollam", "Avadi", "Kadapa", "Kamarhati", "Sambalpur",
    "Bilaspur", "Shahjahanpur", "Satara", "Bijapur", "Rampur", "Shivamogga", "Chandrapur", "Junagadh", "Thrissur", "Alwar",
    "Bardhaman", "Kulti", "Kakinada", "Nizamabad", "Parbhani", "Tumkur", "Khammam", "Ozhukarai", "Bihar Sharif", "Panipat",
    "Darbhanga", "Bally", "Aizawl", "Dewas", "Ichalkaranji", "Karnal", "Bathinda", "Jalna", "Eluru", "Kirari Suleman Nagar",
    "Barabanki", "Purnia", "Satna", "Mau", "Sonipat", "Farrukhabad", "Sagar", "Rourkela", "Durg", "Imphal",
    "Ratlam", "Hapur", "Arrah", "Anantapur", "Karimnagar", "Etawah", "Ambernath", "North Dumdum", "Bharatpur", "Begusarai",
    "New Delhi", "Gandhidham", "Baranagar", "Tiruvottiyur", "Puducherry", "Sikar", "Thoothukudi", "Rewa", "Mirzapur", "Raichur",
    "Pali", "Ramagundam", "Silchar", "Orai", "Nandyal", "Morena", "Bhiwani", "Sambalpur", "Bellary", "Hospet"
  ];

  const appVersion = "v2.1.3";

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Handle city input for autocomplete
    if (field === 'city') {
      if (value.length > 0) {
        const filtered = indianCities.filter(city => 
          city.toLowerCase().includes(value.toLowerCase())
        ).slice(0, 10); // Show max 10 suggestions
        setFilteredCities(filtered);
        setShowCityDropdown(true);
      } else {
        setShowCityDropdown(false);
      }
    }
  };

  const selectCity = (city) => {
    setFormData(prev => ({ ...prev, city }));
    setShowCityDropdown(false);
  };

  const sendOTP = () => {
    if (formData.mobile.length === 10) {
      setOtpSent(true);
      alert(`OTP sent to ${formData.mobile}`);
      // Here you would make an API call to send the actual OTP
    } else {
      alert("Please enter a valid 10-digit mobile number");
    }
  };

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.name && formData.email && formData.gender && formData.lookingFor;
      case 2:
        return formData.birthDay && formData.birthMonth && formData.birthYear && formData.height && formData.maritalStatus;
      case 3:
        return formData.religion && formData.community && formData.motherTongue;
      case 4:
        return formData.education && formData.occupation && formData.income && formData.city && formData.state;
      case 5:
        return (
          formData.mobile.length === 10 &&
          (otpSent ? formData.otp.length === 6 : true) &&
          formData.password.length >= 6 &&
          formData.password === formData.confirmPassword
        );
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    if (isStepValid()) {
      try {
        // Prepare the profile data
        const profileData = {
          personalInfo: {
            name: formData.name,
            email: formData.email,
            gender: formData.gender,
            lookingFor: formData.lookingFor,
            mobile: formData.mobile,
          },
          demographics: {
            dateOfBirth: `${formData.birthDay}-${formData.birthMonth}-${formData.birthYear}`,
            height: formData.height,
            maritalStatus: formData.maritalStatus,
            religion: formData.religion,
            community: formData.community,
            motherTongue: formData.motherTongue,
          },
          professionalInfo: {
            education: formData.education,
            occupation: formData.occupation,
            income: formData.income,
          },
          location: {
            city: formData.city,
            state: formData.state,
          },
          credentials: {
            password: formData.password,
            rememberMe: formData.rememberMe,
          },
          profileCreatedAt: new Date().toISOString(),
          appVersion: appVersion,
        };

        // Show loading state
        const submitButton = document.querySelector('[data-submit-btn]');
        if (submitButton) {
          submitButton.textContent = 'Creating Profile...';
          submitButton.disabled = true;
        }

        // Simulate API call (replace with your actual API endpoint)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Here you would make the actual API call
        // const response = await fetch('/api/create-profile', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(profileData),
        // });
        // 
        // if (!response.ok) {
        //   throw new Error('Failed to create profile');
        // }

        console.log("Profile Data:", profileData);
        
        // Success message
        alert(`🎉 Congratulations ${formData.name}!\n\nYour KannadaMatch profile has been created successfully!\n\n✅ Profile ID: KM${Date.now()}\n✅ Email: ${formData.email}\n✅ Mobile: ${formData.mobile}\n\nYou can now start finding your perfect match!`);
        
        // Reset form or redirect to login/dashboard
        // window.location.href = '/login'; // Uncomment to redirect
        
      } catch (error) {
        console.error('Error creating profile:', error);
        alert('❌ Sorry! There was an error creating your profile. Please try again.');
        
        // Reset button state
        const submitButton = document.querySelector('[data-submit-btn]');
        if (submitButton) {
          submitButton.textContent = 'Submit ✅';
          submitButton.disabled = false;
        }
      }
    } else {
      alert('Please fill in all required fields correctly.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="border-orange-100 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-800">Public Matrimony</CardTitle>
              <CardDescription>Step {step} of 5 - Create your profile</CardDescription>
              <div className="text-xs text-gray-500 mb-2">App Version: {appVersion}</div>
              <div className="flex items-center justify-center mt-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                      i <= step ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {i}
                    </div>
                    {i < 5 && <div className={`w-6 h-0.5 ${i < step ? 'bg-orange-500' : 'bg-gray-200'}`} />}
                  </div>
                ))}
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      className="border-orange-200 focus:border-orange-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email"
                      className="border-orange-200 focus:border-orange-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                      <SelectTrigger className="border-orange-200 focus:border-orange-400">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="lookingFor">Looking For</Label>
                    <Select value={formData.lookingFor} onValueChange={(value) => handleInputChange('lookingFor', value)}>
                      <SelectTrigger className="border-orange-200 focus:border-orange-400">
                        <SelectValue placeholder="Looking for" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label>Date of Birth</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Select value={formData.birthDay} onValueChange={(value) => handleInputChange('birthDay', value)}>
                        <SelectTrigger className="border-orange-200 focus:border-orange-400">
                          <SelectValue placeholder="Day" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 31 }, (_, i) => (
                            <SelectItem key={i + 1} value={String(i + 1).padStart(2, '0')}>
                              {String(i + 1).padStart(2, '0')}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={formData.birthMonth} onValueChange={(value) => handleInputChange('birthMonth', value)}>
                        <SelectTrigger className="border-orange-200 focus:border-orange-400">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => (
                            <SelectItem key={month} value={String(i + 1).padStart(2, '0')}>
                              {month}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={formData.birthYear} onValueChange={(value) => handleInputChange('birthYear', value)}>
                        <SelectTrigger className="border-orange-200 focus:border-orange-400">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 50 }, (_, i) => (
                            <SelectItem key={2005 - i} value={String(2005 - i)}>
                              {2005 - i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="height">Height</Label>
                    <Select value={formData.height} onValueChange={(value) => handleInputChange('height', value)}>
                      <SelectTrigger className="border-orange-200 focus:border-orange-400">
                        <SelectValue placeholder="Select height" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4.6-4.8">4'6" - 4'8"</SelectItem>
                        <SelectItem value="4.9-4.11">4'9" - 4'11"</SelectItem>
                        <SelectItem value="5.0-5.2">5'0" - 5'2"</SelectItem>
                        <SelectItem value="5.3-5.5">5'3" - 5'5"</SelectItem>
                        <SelectItem value="5.6-5.8">5'6" - 5'8"</SelectItem>
                        <SelectItem value="5.9-5.11">5'9" - 5'11"</SelectItem>
                        <SelectItem value="6.0-6.2">6'0" - 6'2"</SelectItem>
                        <SelectItem value="6.3+">6'3" and above</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="maritalStatus">Marital Status</Label>
                    <Select value={formData.maritalStatus} onValueChange={(value) => handleInputChange('maritalStatus', value)}>
                      <SelectTrigger className="border-orange-200 focus:border-orange-400">
                        <SelectValue placeholder="Select marital status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="never-married">Never Married</SelectItem>
                        <SelectItem value="divorced">Divorced</SelectItem>
                        <SelectItem value="widowed">Widowed</SelectItem>
                        <SelectItem value="separated">Separated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="religion">Religion</Label>
                    <Select value={formData.religion} onValueChange={(value) => handleInputChange('religion', value)}>
                      <SelectTrigger className="border-orange-200 focus:border-orange-400">
                        <SelectValue placeholder="Select religion" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hindu">Hindu</SelectItem>
                        <SelectItem value="muslim">Muslim</SelectItem>
                        <SelectItem value="christian">Christian</SelectItem>
                        <SelectItem value="sikh">Sikh</SelectItem>
                        <SelectItem value="buddhist">Buddhist</SelectItem>
                        <SelectItem value="jain">Jain</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="community">Community</Label>
                    <Select value={formData.community} onValueChange={(value) => handleInputChange('community', value)}>
                      <SelectTrigger className="border-orange-200 focus:border-orange-400">
                        <SelectValue placeholder="Select community" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lingayat">Lingayat</SelectItem>
                        <SelectItem value="brahmin">Brahmin</SelectItem>
                        <SelectItem value="vokkaliga">Vokkaliga</SelectItem>
                        <SelectItem value="kuruba">Kuruba</SelectItem>
                        <SelectItem value="devanga">Devanga</SelectItem>
                        <SelectItem value="naidu">Naidu</SelectItem>
                        <SelectItem value="reddy">Reddy</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="motherTongue">Mother Tongue</Label>
                    <Select value={formData.motherTongue} onValueChange={(value) => handleInputChange('motherTongue', value)}>
                      <SelectTrigger className="border-orange-200 focus:border-orange-400">
                        <SelectValue placeholder="Select mother tongue" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kannada">Kannada</SelectItem>
                        <SelectItem value="telugu">Telugu</SelectItem>
                        <SelectItem value="tamil">Tamil</SelectItem>
                        <SelectItem value="hindi">Hindi</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="malayalam">Malayalam</SelectItem>
                        <SelectItem value="marathi">Marathi</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="education">Education</Label>
                    <Select value={formData.education} onValueChange={(value) => handleInputChange('education', value)}>
                      <SelectTrigger className="border-orange-200 focus:border-orange-400">
                        <SelectValue placeholder="Select education" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high-school">High School</SelectItem>
                        <SelectItem value="diploma">Diploma</SelectItem>
                        <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                        <SelectItem value="master">Master's Degree</SelectItem>
                        <SelectItem value="phd">PhD</SelectItem>
                        <SelectItem value="professional">Professional Degree</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="occupation">Occupation</Label>
                    <Select value={formData.occupation} onValueChange={(value) => handleInputChange('occupation', value)}>
                      <SelectTrigger className="border-orange-200 focus:border-orange-400">
                        <SelectValue placeholder="Select occupation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="software-engineer">Software Engineer</SelectItem>
                        <SelectItem value="doctor">Doctor</SelectItem>
                        <SelectItem value="teacher">Teacher</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="government">Government Service</SelectItem>
                        <SelectItem value="banking">Banking</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="income">Annual Income</Label>
                    <Select value={formData.income} onValueChange={(value) => handleInputChange('income', value)}>
                      <SelectTrigger className="border-orange-200 focus:border-orange-400">
                        <SelectValue placeholder="Select income range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2-5">₹2-5 Lakhs</SelectItem>
                        <SelectItem value="5-10">₹5-10 Lakhs</SelectItem>
                        <SelectItem value="10-15">₹10-15 Lakhs</SelectItem>
                        <SelectItem value="15-25">₹15-25 Lakhs</SelectItem>
                        <SelectItem value="25-50">₹25-50 Lakhs</SelectItem>
                        <SelectItem value="50+">₹50+ Lakhs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="Enter city"
                        className="border-orange-200 focus:border-orange-400"
                        onFocus={() => {
                          if (formData.city.length > 0) {
                            const filtered = indianCities.filter(city => 
                              city.toLowerCase().includes(formData.city.toLowerCase())
                            ).slice(0, 10);
                            setFilteredCities(filtered);
                            setShowCityDropdown(true);
                          }
                        }}
                        onBlur={() => {
                          // Delay hiding dropdown to allow selection
                          setTimeout(() => setShowCityDropdown(false), 200);
                        }}
                      />
                      {showCityDropdown && filteredCities.length > 0 && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                          {filteredCities.map((city, index) => (
                            <div
                              key={index}
                              className="px-3 py-2 hover:bg-orange-50 cursor-pointer text-sm"
                              onClick={() => selectCity(city)}
                            >
                              {city}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                        <SelectTrigger className="border-orange-200 focus:border-orange-400">
                          <SelectValue placeholder="State" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="karnataka">Karnataka</SelectItem>
                          <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                          <SelectItem value="andhra-pradesh">Andhra Pradesh</SelectItem>
                          <SelectItem value="telangana">Telangana</SelectItem>
                          <SelectItem value="kerala">Kerala</SelectItem>
                          <SelectItem value="maharashtra">Maharashtra</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <Input
                      id="mobile"
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) => handleInputChange('mobile', e.target.value)}
                      placeholder="Enter 10-digit mobile number"
                      className="border-orange-200 focus:border-orange-400"
                      maxLength={10}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      🔒 Your number stays secure and private
                    </p>
                  </div>

                  <div className="text-center">
                    <Button 
                      onClick={sendOTP}
                      disabled={formData.mobile.length !== 10}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium"
                    >
                      Verify Your Mobile
                    </Button>
                    <p className="text-sm text-gray-600 mt-2">
                      We'll send an OTP to verify your number
                    </p>
                  </div>

                  {otpSent && (
                    <div className="space-y-4 border-t pt-4">
                      <div className="flex gap-2 items-end">
                        <div className="flex-1">
                          <Label htmlFor="otp">Enter OTP</Label>
                          <Input
                            id="otp"
                            value={formData.otp}
                            onChange={(e) => handleInputChange('otp', e.target.value)}
                            placeholder="Enter 6-digit OTP"
                            className="border-orange-200 focus:border-orange-400 text-center font-mono text-lg"
                            maxLength={6}
                          />
                        </div>
                        <Button variant="outline" className="h-10">
                          Verify OTP
                        </Button>
                      </div>

                      <p className="text-xs text-center text-gray-500">
                        Didn't receive OTP? <button className="text-orange-600 hover:underline" onClick={sendOTP}>Resend</button>
                      </p>
                    </div>
                  )}
                  <div>
                    <Label htmlFor="password">Create Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      placeholder="Create password"
                      className="border-orange-200 focus:border-orange-400"
                    />
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Re-enter Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      placeholder="Re-enter password"
                      className="border-orange-200 focus:border-orange-400"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      checked={formData.rememberMe}
                      onChange={(e) => handleInputChange("rememberMe", e.target.checked)}
                      className="accent-orange-500 w-4 h-4"
                    />
                    <Label htmlFor="rememberMe" className="text-sm text-gray-700">
                      Remember me
                    </Label>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-4">
                {step > 1 && (
                  <Button variant="outline" onClick={prevStep}>
                    ⬅ Back
                  </Button>
                )}
                {step < 5 ? (
                  <Button
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className={`ml-auto bg-gradient-to-r from-[#FFD700] to-[#FFA500] hover:from-[#FFC300] hover:to-[#FF8C00] text-white font-semibold rounded-md px-6 py-2 transition duration-300 ${
                      !isStepValid() ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    Continue ➡
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    data-submit-btn
                    className="ml-auto bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold rounded-md px-6 py-2"
                    disabled={!isStepValid()}
                  >
                    Submit ✅
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUp;