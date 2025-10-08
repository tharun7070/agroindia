import { useState } from "react";
import { motion, AnimatePresence } from 'motion/react';
import { Button } from "./components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Progress } from './components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { Label } from './components/ui/label';
import { Avatar, AvatarFallback } from './components/ui/avatar';
import { Checkbox } from './components/ui/checkbox';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import {
  Menu,
  X,
  Sprout,
  ArrowRight,
  TrendingUp,
  Users,
  Target,
  Leaf,
  Droplets,
  Sun,
  Wind,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  MapPin,
  Download,
  TrendingDown,
  FileText,
  Brain,
  Cpu,
  Layers,
  Zap,
  Globe,
  Code,
  Database,
  Mail,
  Phone,
  MessageCircle,
  Send,
  Smartphone,
  LogIn,
  LogOut,
  UserCircle,
  Lock,
  Eye,
  EyeOff,
} from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { Toaster } from "./components/ui/sonner";
import { toast } from 'sonner@2.0.3';

// ============================================================================
// USER TYPE
// ============================================================================
interface User {
  name: string;
  email: string;
  role: 'farmer' | 'policymaker' | 'admin';
}

// ============================================================================
// NAVIGATION COMPONENT
// ============================================================================
interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  user: User | null;
  onLogout: () => void;
}

function Navigation({ currentPage, onNavigate, user, onLogout }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'farmer', label: 'Farmer Dashboard' },
    { id: 'policymaker', label: 'Policymaker' },
    { id: 'insights', label: 'Model Insights' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  // Handle mouse movement to show/hide navbar
  useState(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Show navbar when mouse is within 50px of top
      if (e.clientY <= 50) {
        setIsNavVisible(true);
      } else if (e.clientY > 100 && !mobileMenuOpen) {
        setIsNavVisible(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Show navbar briefly on page load
    setIsNavVisible(true);
    const timer = setTimeout(() => {
      setIsNavVisible(false);
    }, 3000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  });

  return (
    <motion.nav 
      initial={{ y: 0 }}
      animate={{ y: isNavVisible || mobileMenuOpen ? 0 : -100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Agro India
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={currentPage === item.id ? 'default' : 'ghost'}
                onClick={() => onNavigate(item.id)}
                className={currentPage === item.id ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                {item.label}
              </Button>
            ))}
            {user ? (
              <>
                <div className="ml-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50">
                  <UserCircle className="w-4 h-4 text-green-700" />
                  <span className="text-sm text-green-700">{user.name}</span>
                </div>
                <Button
                  variant="ghost"
                  onClick={onLogout}
                  className="ml-2"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                onClick={() => onNavigate('login')}
                className="ml-4 border-green-600 text-green-700 hover:bg-green-50"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-border"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? 'default' : 'ghost'}
                  className={`w-full justify-start ${currentPage === item.id ? 'bg-green-600 hover:bg-green-700' : ''}`}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </Button>
              ))}
              {user ? (
                <>
                  <div className="px-3 py-2 rounded-lg bg-green-50 text-sm text-green-700">
                    Logged in as: {user.name}
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  className="w-full justify-start border-green-600 text-green-700"
                  onClick={() => {
                    onNavigate('login');
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Hover trigger area - invisible div at top of screen */}
      <div 
        className="fixed top-0 left-0 right-0 h-1 z-40"
        onMouseEnter={() => setIsNavVisible(true)}
      />
    </motion.nav>
  );
}

// ============================================================================
// LANDING PAGE COMPONENT
// ============================================================================
interface LandingPageProps {
  onNavigate: (page: string) => void;
}

function LandingPage({ onNavigate }: LandingPageProps) {
  const stats = [
    { icon: TrendingUp, value: '+20%', label: 'Yield Accuracy' },
    { icon: Users, value: '50K+', label: 'Farmers Helped' },
    { icon: Target, value: '95%', label: 'Prediction Rate' },
    { icon: Leaf, value: 'SDG 2', label: 'Zero Hunger' },
  ];

  const features = [
    {
      title: 'Real-time Monitoring',
      description: 'Track your farm with satellite imagery and IoT sensors',
      gradient: 'from-green-500 to-emerald-600',
    },
    {
      title: 'AI-Powered Predictions',
      description: 'Deep learning models predict yields with 95% accuracy',
      gradient: 'from-blue-500 to-cyan-600',
    },
    {
      title: 'Actionable Insights',
      description: 'Get specific recommendations to maximize your harvest',
      gradient: 'from-purple-500 to-pink-600',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1724531281596-cfae90d5a082?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJpYWwlMjBmYXJtbGFuZCUyMGFncmljdWx0dXJlfGVufDF8fHx8MTc1OTc0Njc5OXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Farmland aerial view"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl text-white mb-6">
              AI-Powered Crop Yield Predictions for a{' '}
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                Food-Secure Future
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Harness the power of deep learning to maximize your harvest and contribute to global food security
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-lg px-8 py-6"
                onClick={() => onNavigate('farmer')}
              >
                Try Demo <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                onClick={() => onNavigate('farmer')}
              >
                For Farmers 🌾
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                onClick={() => onNavigate('policymaker')}
              >
                For Policymakers 🏛️
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
          >
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 bg-white/10 backdrop-blur-md border-white/20">
                <stat.icon className="w-8 h-8 text-green-400 mb-2 mx-auto" />
                <div className="text-3xl text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl mb-4">How Agro India Works</h2>
            <p className="text-xl text-muted-foreground">
              Combining satellite data, IoT sensors, and AI to revolutionize agriculture
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="p-8 h-full hover:shadow-xl transition-shadow">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} mb-4`} />
                  <h3 className="text-2xl mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-600 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl mb-6">Supporting SDG: Zero Hunger</h2>
            <p className="text-xl mb-8 text-green-100">
              Our mission is to ensure food security for all by helping farmers optimize yields 
              and policymakers make informed decisions about food supply chains.
            </p>
            <Button
              size="lg"
              variant="outline"
              className="bg-white text-green-700 hover:bg-green-50 border-0"
              onClick={() => onNavigate('about')}
            >
              Learn Our Story
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// ============================================================================
// FARMER DASHBOARD COMPONENT
// ============================================================================
function FarmerDashboard() {
  const [selectedPlot, setSelectedPlot] = useState('Plot A');

  const plots = [
    { id: 'Plot A', status: 'healthy', moisture: 65, health: 92 },
    { id: 'Plot B', status: 'warning', moisture: 45, health: 78 },
    { id: 'Plot C', status: 'healthy', moisture: 70, health: 95 },
    { id: 'Plot D', status: 'critical', moisture: 30, health: 62 },
  ];

  const weatherData = [
    { day: 'Mon', temp: 28, rainfall: 0 },
    { day: 'Tue', temp: 30, rainfall: 5 },
    { day: 'Wed', temp: 29, rainfall: 12 },
    { day: 'Thu', temp: 27, rainfall: 8 },
    { day: 'Fri', temp: 28, rainfall: 0 },
    { day: 'Sat', temp: 31, rainfall: 0 },
    { day: 'Sun', temp: 30, rainfall: 3 },
  ];

  const yieldPrediction = [
    { month: 'Jan', predicted: 45, actual: 42 },
    { month: 'Feb', predicted: 52, actual: 50 },
    { month: 'Mar', predicted: 61, actual: 58 },
    { month: 'Apr', predicted: 68, actual: 65 },
    { month: 'May', predicted: 75, actual: null },
    { month: 'Jun', predicted: 82, actual: null },
  ];

  const insights = [
    {
      type: 'urgent',
      icon: AlertTriangle,
      title: 'Irrigation Required',
      message: 'Plot D soil moisture at 30%. Irrigate within 2 days.',
      action: 'Schedule Irrigation',
    },
    {
      type: 'success',
      icon: CheckCircle2,
      title: 'Optimal Growth',
      message: 'Plot C showing excellent growth. Expected yield: 95%',
      action: 'View Details',
    },
    {
      type: 'info',
      icon: TrendingUp,
      title: 'Yield Forecast',
      message: 'Season prediction: 82 tons. 8% above average.',
      action: 'See Forecast',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl mb-2">Welcome, Ramesh! 🌾</h1>
          <p className="text-xl text-muted-foreground">
            Here's your farm's outlook for this season
          </p>
        </div>

        {/* Farm Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div>
            <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Total Area</p>
                    <p className="text-3xl">25 Ha</p>
                  </div>
                  <MapPin className="w-10 h-10 opacity-80" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Avg Moisture</p>
                    <p className="text-3xl">55%</p>
                  </div>
                  <Droplets className="w-10 h-10 opacity-80" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="bg-gradient-to-br from-orange-500 to-amber-600 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Temperature</p>
                    <p className="text-3xl">29°C</p>
                  </div>
                  <Sun className="w-10 h-10 opacity-80" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Predicted Yield</p>
                    <p className="text-3xl">82 T</p>
                  </div>
                  <TrendingUp className="w-10 h-10 opacity-80" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Interactive Farm Map */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Farm Plot Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {plots.map((plot) => (
                    <div
                      key={plot.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-105 ${
                        selectedPlot === plot.id
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                      onClick={() => setSelectedPlot(plot.id)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4>{plot.id}</h4>
                        <Badge
                          variant={
                            plot.status === 'healthy'
                              ? 'default'
                              : plot.status === 'warning'
                              ? 'secondary'
                              : 'destructive'
                          }
                          className={
                            plot.status === 'healthy'
                              ? 'bg-green-600'
                              : plot.status === 'warning'
                              ? 'bg-yellow-600'
                              : ''
                          }
                        >
                          {plot.status === 'healthy' ? (
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                          ) : (
                            <AlertTriangle className="w-3 h-3 mr-1" />
                          )}
                          {plot.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Soil Moisture</span>
                            <span>{plot.moisture}%</span>
                          </div>
                          <Progress value={plot.moisture} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Crop Health</span>
                            <span>{plot.health}%</span>
                          </div>
                          <Progress value={plot.health} className="h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weather Forecast */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  7-Day Weather
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={weatherData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="temp"
                      stroke="#f59e0b"
                      fill="#fed7aa"
                      name="Temp (°C)"
                    />
                    <Area
                      type="monotone"
                      dataKey="rainfall"
                      stroke="#3b82f6"
                      fill="#bfdbfe"
                      name="Rain (mm)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Yield Prediction */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Yield Prediction with Confidence Intervals</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={yieldPrediction}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis label={{ value: 'Yield (Tons)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="#16a34a"
                    strokeWidth={3}
                    name="Predicted Yield"
                  />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Actual Yield"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Actionable Insights */}
        <div>
          <h2 className="text-2xl mb-4">Actionable Insights</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {insights.map((insight, index) => (
              <Card
                key={index}
                className={`border-l-4 ${
                  insight.type === 'urgent'
                    ? 'border-l-red-500'
                    : insight.type === 'success'
                    ? 'border-l-green-500'
                    : 'border-l-blue-500'
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3 mb-4">
                    <insight.icon
                      className={`w-6 h-6 ${
                        insight.type === 'urgent'
                          ? 'text-red-600'
                          : insight.type === 'success'
                          ? 'text-green-600'
                          : 'text-blue-600'
                      }`}
                    />
                    <div>
                      <h3 className="mb-1">{insight.title}</h3>
                      <p className="text-sm text-muted-foreground">{insight.message}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    {insight.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// POLICYMAKER DASHBOARD COMPONENT
// ============================================================================
function PolicymakerDashboard() {
  const regionalData = [
    { region: 'North', yield: 85, risk: 'low', farmers: 12500 },
    { region: 'South', yield: 72, risk: 'medium', farmers: 15300 },
    { region: 'East', yield: 68, risk: 'high', farmers: 9800 },
    { region: 'West', yield: 91, risk: 'low', farmers: 14200 },
    { region: 'Central', yield: 58, risk: 'critical', farmers: 8600 },
  ];

  const supplyDemandData = [
    { month: 'Jan', supply: 4500, demand: 4200 },
    { month: 'Feb', supply: 4800, demand: 4400 },
    { month: 'Mar', supply: 5200, demand: 5000 },
    { month: 'Apr', supply: 5500, demand: 5800 },
    { month: 'May', supply: 4900, demand: 6200 },
    { month: 'Jun', supply: 4600, demand: 6500 },
  ];

  const cropDistribution = [
    { name: 'Wheat', value: 35, color: '#f59e0b' },
    { name: 'Rice', value: 30, color: '#16a34a' },
    { name: 'Corn', value: 20, color: '#eab308' },
    { name: 'Vegetables', value: 15, color: '#22c55e' },
  ];

  const warnings = [
    {
      type: 'critical',
      region: 'Central Region',
      issue: 'Drought Risk',
      affected: '8,600 farmers',
      message: 'Critical water shortage predicted in next 30 days',
    },
    {
      type: 'warning',
      region: 'East Region',
      issue: 'Pest Outbreak',
      affected: '3,200 farmers',
      message: 'Locust activity detected. Immediate intervention needed',
    },
    {
      type: 'info',
      region: 'South Region',
      issue: 'Supply Gap',
      affected: '15,300 farmers',
      message: 'Demand exceeds supply by 1,200 tons in Q2',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl mb-2">National Agricultural Dashboard 🏛️</h1>
          <p className="text-xl text-muted-foreground">
            Real-time insights for policy planning and food security
          </p>
        </div>

        {/* National Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Total Farmers</p>
                  <p className="text-3xl">60.4K</p>
                </div>
                <Users className="w-10 h-10 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Avg Yield</p>
                  <p className="text-3xl">74.8%</p>
                </div>
                <TrendingUp className="w-10 h-10 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">High Risk Areas</p>
                  <p className="text-3xl">2</p>
                </div>
                <AlertTriangle className="w-10 h-10 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Regions</p>
                  <p className="text-3xl">5</p>
                </div>
                <MapPin className="w-10 h-10 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Regional Heatmap */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Regional Yield Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={regionalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis label={{ value: 'Yield %', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="yield" fill="#16a34a" name="Predicted Yield %" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-5 gap-2 mt-4">
                  {regionalData.map((region, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg text-center ${
                        region.risk === 'critical'
                          ? 'bg-red-100 border border-red-300'
                          : region.risk === 'high'
                          ? 'bg-orange-100 border border-orange-300'
                          : region.risk === 'medium'
                          ? 'bg-yellow-100 border border-yellow-300'
                          : 'bg-green-100 border border-green-300'
                      }`}
                    >
                      <div className="text-xs text-muted-foreground mb-1">{region.region}</div>
                      <Badge
                        variant={region.risk === 'critical' ? 'destructive' : 'secondary'}
                        className={
                          region.risk === 'low'
                            ? 'bg-green-600'
                            : region.risk === 'medium'
                            ? 'bg-yellow-600'
                            : region.risk === 'high'
                            ? 'bg-orange-600'
                            : ''
                        }
                      >
                        {region.risk}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Crop Distribution */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Crop Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={cropDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {cropDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Supply vs Demand */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Food Supply Chain: Supply vs Demand Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={supplyDemandData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis label={{ value: 'Tons (1000s)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="supply"
                    stroke="#16a34a"
                    strokeWidth={3}
                    name="Predicted Supply"
                  />
                  <Line
                    type="monotone"
                    dataKey="demand"
                    stroke="#ef4444"
                    strokeWidth={3}
                    strokeDasharray="5 5"
                    name="Expected Demand"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Early Warning System */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl">Early Warning System</h2>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
          <div className="space-y-4">
            {warnings.map((warning, index) => (
              <Card
                key={index}
                className={`border-l-4 ${
                  warning.type === 'critical'
                    ? 'border-l-red-600 bg-red-50'
                    : warning.type === 'warning'
                    ? 'border-l-orange-500 bg-orange-50'
                    : 'border-l-blue-500 bg-blue-50'
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <AlertTriangle
                        className={`w-6 h-6 mt-1 ${
                          warning.type === 'critical'
                            ? 'text-red-600'
                            : warning.type === 'warning'
                            ? 'text-orange-600'
                            : 'text-blue-600'
                        }`}
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3>{warning.region}</h3>
                          <Badge
                            variant={warning.type === 'critical' ? 'destructive' : 'secondary'}
                            className={
                              warning.type === 'warning' ? 'bg-orange-600' : warning.type === 'info' ? 'bg-blue-600' : ''
                            }
                          >
                            {warning.issue}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{warning.message}</p>
                        <p className="text-sm">
                          <Users className="w-4 h-4 inline mr-1" />
                          Affected: {warning.affected}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Take Action
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Data Export Panel */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Data Export & Reporting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Download className="w-5 h-5" />
                  Regional Report (PDF)
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Download className="w-5 h-5" />
                  Supply Chain Data (CSV)
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Download className="w-5 h-5" />
                  Risk Assessment (Excel)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MODEL INSIGHTS COMPONENT
// ============================================================================
function ModelInsights() {
  const modelArchitecture = [
    { layer: 'Input', type: 'Satellite & IoT', neurons: '1024' },
    { layer: 'CNN', type: 'Image Processing', neurons: '512' },
    { layer: 'LSTM', type: 'Time Series', neurons: '256' },
    { layer: 'Transformer', type: 'Attention', neurons: '128' },
    { layer: 'Output', type: 'Yield Prediction', neurons: '1' },
  ];

  const featureImportance = [
    { feature: 'Soil Moisture', importance: 92 },
    { feature: 'Temperature', importance: 88 },
    { feature: 'Rainfall', importance: 85 },
    { feature: 'Satellite NDVI', importance: 82 },
    { feature: 'Historical Yield', importance: 78 },
    { feature: 'Crop Type', importance: 75 },
    { feature: 'pH Level', importance: 68 },
  ];

  const accuracyMetrics = [
    { metric: 'RMSE', value: 2.3, target: 3.0 },
    { metric: 'MAE', value: 1.8, target: 2.5 },
    { metric: 'R²', value: 0.95, target: 0.90 },
  ];

  const modelPerformance = [
    { epoch: 10, trainLoss: 4.5, valLoss: 4.8 },
    { epoch: 20, trainLoss: 3.2, valLoss: 3.6 },
    { epoch: 30, trainLoss: 2.5, valLoss: 2.9 },
    { epoch: 40, trainLoss: 2.0, valLoss: 2.4 },
    { epoch: 50, trainLoss: 1.8, valLoss: 2.1 },
  ];

  const shapValues = [
    { feature: 'Soil Moisture', impact: 0.45 },
    { feature: 'Temperature', impact: 0.38 },
    { feature: 'Rainfall', impact: 0.32 },
    { feature: 'NDVI', impact: 0.28 },
    { feature: 'History', impact: 0.22 },
    { feature: 'pH', impact: 0.15 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl mb-2">AI Model Insights 🧠</h1>
          <p className="text-xl text-muted-foreground">
            Understanding how deep learning predicts crop yields
          </p>
        </motion.div>

        {/* Model Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Accuracy</p>
                    <p className="text-3xl">95.2%</p>
                  </div>
                  <Target className="w-10 h-10 opacity-80" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Training Data</p>
                    <p className="text-3xl">2.5M</p>
                  </div>
                  <Brain className="w-10 h-10 opacity-80" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Model Layers</p>
                    <p className="text-3xl">5</p>
                  </div>
                  <Layers className="w-10 h-10 opacity-80" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-gradient-to-br from-orange-500 to-amber-600 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Inference Time</p>
                    <p className="text-3xl">0.3s</p>
                  </div>
                  <Zap className="w-10 h-10 opacity-80" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Model Architecture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="w-5 h-5" />
                Model Architecture: CNN + LSTM + Transformers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {modelArchitecture.map((layer, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white flex items-center justify-center">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4>{layer.layer}</h4>
                          <p className="text-sm text-muted-foreground">{layer.type}</p>
                        </div>
                        <Badge variant="secondary">{layer.neurons} units</Badge>
                      </div>
                      {index < modelArchitecture.length - 1 && (
                        <div className="h-1 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Feature Importance */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Feature Importance (SHAP Values)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {featureImportance.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span>{item.feature}</span>
                        <span>{item.importance}%</span>
                      </div>
                      <Progress value={item.importance} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Accuracy Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Accuracy Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {accuracyMetrics.map((metric, index) => (
                    <div key={index} className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4>{metric.metric}</h4>
                        <Badge className="bg-green-600">
                          {metric.value < metric.target ? (
                            <TrendingUp className="w-3 h-3 mr-1" />
                          ) : null}
                          {metric.metric === 'R²' ? metric.value : metric.value.toFixed(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Target: {metric.metric === 'R²' ? metric.target : metric.target.toFixed(1)}
                      </p>
                      <Progress
                        value={metric.metric === 'R²' ? metric.value * 100 : ((metric.target - metric.value) / metric.target) * 100}
                        className="h-2 mt-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Model Performance Over Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Training Performance: Loss Over Epochs</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={modelPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="epoch" label={{ value: 'Epoch', position: 'insideBottom', offset: -5 }} />
                  <YAxis label={{ value: 'Loss', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="trainLoss"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    name="Training Loss"
                  />
                  <Line
                    type="monotone"
                    dataKey="valLoss"
                    stroke="#ec4899"
                    strokeWidth={3}
                    strokeDasharray="5 5"
                    name="Validation Loss"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Explainability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>AI Explainability: Why This Prediction?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="mb-4">SHAP Feature Impact</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={shapValues} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="feature" type="category" width={100} />
                      <Tooltip />
                      <Bar dataKey="impact" fill="#8b5cf6" name="Impact Score" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center">
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <h4 className="mb-2">Example Prediction Breakdown</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        For Plot A in North Region:
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          High soil moisture (+12% to yield)
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          Optimal temperature (+8% to yield)
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          Good rainfall pattern (+7% to yield)
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-yellow-500" />
                          Moderate NDVI (+5% to yield)
                        </li>
                      </ul>
                      <div className="mt-4 pt-4 border-t border-purple-200">
                        <p className="text-sm">
                          <span className="font-medium">Final Prediction:</span> 92% yield
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

// ============================================================================
// ABOUT PAGE COMPONENT
// ============================================================================
function AboutPage() {
  const timeline = [
    {
      phase: 'Problem Identification',
      year: '2023',
      description: 'Climate change threatens global food security. Traditional farming methods lack predictive insights.',
      icon: Target,
    },
    {
      phase: 'Research & Development',
      year: '2023-24',
      description: 'Developed deep learning models combining CNN, LSTM, and Transformers for yield prediction.',
      icon: Brain,
    },
    {
      phase: 'Pilot Program',
      year: '2024',
      description: 'Tested with 1,000 farmers across 5 regions. Achieved 20% yield improvement.',
      icon: Users,
    },
    {
      phase: 'Scale & Impact',
      year: '2025',
      description: 'Now serving 60,000+ farmers. Contributing to UN SDG 2: Zero Hunger.',
      icon: Globe,
    },
  ];

  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'AI Research Lead',
      avatar: 'SC',
      bg: 'from-purple-500 to-pink-500',
    },
    {
      name: 'Raj Patel',
      role: 'Agricultural Expert',
      avatar: 'RP',
      bg: 'from-green-500 to-emerald-500',
    },
    {
      name: 'Emily Zhang',
      role: 'Full-Stack Developer',
      avatar: 'EZ',
      bg: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'Michael Johnson',
      role: 'Data Scientist',
      avatar: 'MJ',
      bg: 'from-orange-500 to-amber-500',
    },
    {
      name: 'Priya Sharma',
      role: 'UX/UI Designer',
      avatar: 'PS',
      bg: 'from-pink-500 to-rose-500',
    },
    {
      name: 'Ahmed Hassan',
      role: 'IoT Engineer',
      avatar: 'AH',
      bg: 'from-indigo-500 to-purple-500',
    },
  ];

  const techStack = [
    { name: 'Deep Learning', icon: Brain, color: 'purple' },
    { name: 'React & TypeScript', icon: Code, color: 'blue' },
    { name: 'Satellite Data', icon: Globe, color: 'green' },
    { name: 'IoT Sensors', icon: Database, color: 'orange' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-green-600 to-emerald-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }} />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Sprout className="w-10 h-10" />
            </div>
            <h1 className="text-5xl mb-6">Our Story</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              We're on a mission to ensure food security for all by combining artificial intelligence 
              with agricultural expertise to help farmers optimize yields and policymakers make informed decisions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-red-100 text-red-700 hover:bg-red-100">The Challenge</Badge>
              <h2 className="text-4xl mb-4">Climate Change Threatens Food Security</h2>
              <p className="text-lg text-muted-foreground mb-4">
                By 2050, we'll need to feed 10 billion people. Climate change, unpredictable weather, 
                and resource scarcity make traditional farming increasingly difficult.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2" />
                  <span>20% crop yield losses due to climate variability</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2" />
                  <span>Farmers lack predictive tools for planning</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2" />
                  <span>Policymakers need real-time food supply data</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1727024554760-9ecf5910b277?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwY3JvcHMlMjBzdXN0YWluYWJsZXxlbnwxfHx8fDE3NTk3NDY4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Sustainable farming"
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
              />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mt-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1614093269896-a8cfa2cb05b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjBmaWVsZCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU5NzQ2ODAwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Farmer with technology"
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-100">Our Solution</Badge>
              <h2 className="text-4xl mb-4">AI-Powered Crop Predictions</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Agro India uses deep learning to analyze satellite imagery, IoT sensor data, and historical 
                patterns to predict crop yields with 95% accuracy.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2" />
                  <span>Real-time monitoring and actionable insights</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2" />
                  <span>20% average yield improvement for farmers</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2" />
                  <span>Early warning systems for policymakers</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground">
              From concept to impact in 2 years
            </p>
          </motion.div>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br ${
                        index === 0 ? 'from-red-500 to-orange-500' :
                        index === 1 ? 'from-blue-500 to-cyan-500' :
                        index === 2 ? 'from-purple-500 to-pink-500' :
                        'from-green-500 to-emerald-500'
                      } text-white flex items-center justify-center`}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl">{item.phase}</h3>
                          <Badge variant="outline">{item.year}</Badge>
                        </div>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground">
              Experts in AI, agriculture, and software engineering
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center hover:shadow-xl transition-shadow">
                  <CardContent className="pt-6">
                    <Avatar className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-br ${member.bg} text-white`}>
                      <AvatarFallback className={`bg-gradient-to-br ${member.bg} text-white text-xl`}>
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="mb-1">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-4 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl mb-4">Our Technology</h2>
            <p className="text-xl text-muted-foreground">
              Built with cutting-edge tools and frameworks
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <tech.icon className={`w-12 h-12 mx-auto mb-3 text-${tech.color}-600`} />
                    <p>{tech.name}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================================
// LOGIN PAGE COMPONENT
// ============================================================================
interface LoginPageProps {
  onLogin: (user: User) => void;
  onNavigate: (page: string) => void;
}

function LoginPage({ onLogin, onNavigate }: LoginPageProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'farmer' as 'farmer' | 'policymaker',
    rememberMe: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match!');
        return;
      }
      // Mock signup
      const newUser: User = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
      };
      onLogin(newUser);
      toast.success(`Welcome to Agro India, ${formData.name}! 🌾`);
      onNavigate(formData.role === 'farmer' ? 'farmer' : 'policymaker');
    } else {
      // Mock login - accept any email/password
      const user: User = {
        name: formData.email.split('@')[0],
        email: formData.email,
        role: formData.role,
      };
      onLogin(user);
      toast.success(`Welcome back, ${user.name}! 🌾`);
      onNavigate(formData.role === 'farmer' ? 'farmer' : 'policymaker');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <Sprout className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Agro India
              </span>
            </div>
            <h2 className="mt-6 text-3xl">
              {isSignUp ? 'Create your account' : 'Welcome back'}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {isSignUp 
                ? 'Join thousands of farmers using AI for better yields'
                : 'Sign in to access your dashboard and insights'
              }
            </p>
          </div>

          {/* Form */}
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && (
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ramesh Kumar"
                      required
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ramesh@example.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {isSignUp && (
                  <>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        placeholder="••••••••"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="role">I am a</Label>
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, role: 'farmer' })}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            formData.role === 'farmer'
                              ? 'border-green-600 bg-green-50'
                              : 'border-gray-200 hover:border-green-300'
                          }`}
                        >
                          <div className="text-center">
                            <Leaf className={`w-6 h-6 mx-auto mb-1 ${formData.role === 'farmer' ? 'text-green-600' : 'text-gray-400'}`} />
                            <p className="text-sm">Farmer</p>
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, role: 'policymaker' })}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            formData.role === 'policymaker'
                              ? 'border-green-600 bg-green-50'
                              : 'border-gray-200 hover:border-green-300'
                          }`}
                        >
                          <div className="text-center">
                            <Target className={`w-6 h-6 mx-auto mb-1 ${formData.role === 'policymaker' ? 'text-green-600' : 'text-gray-400'}`} />
                            <p className="text-sm">Policymaker</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {!isSignUp && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={formData.rememberMe}
                        onCheckedChange={(checked) => 
                          setFormData({ ...formData, rememberMe: checked as boolean })
                        }
                      />
                      <label
                        htmlFor="remember"
                        className="text-sm text-muted-foreground cursor-pointer"
                      >
                        Remember me
                      </label>
                    </div>
                    <button
                      type="button"
                      className="text-sm text-green-600 hover:text-green-700"
                      onClick={() => toast.info('Password reset feature coming soon!')}
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  {isSignUp ? 'Create Account' : 'Sign In'}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {isSignUp ? (
                      <>Already have an account? <span className="text-green-600">Sign in</span></>
                    ) : (
                      <>Don't have an account? <span className="text-green-600">Sign up</span></>
                    )}
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </motion.div>
      </div>

      {/* Right Side - Hero Image */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjB0ZWNobm9sb2d5JTIwZmllbGR8ZW58MXx8fHwxNzU5NzQ2ODAwfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Farmer using technology"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 to-emerald-900/80" />
        </div>
        
        <div className="relative z-10 flex items-center justify-center p-12">
          <div className="text-white max-w-md">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-4xl mb-6">
                Revolutionizing Agriculture with AI
              </h2>
              <p className="text-xl text-green-100 mb-8">
                Join 50,000+ farmers using deep learning to predict yields with 95% accuracy
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-300" />
                  </div>
                  <span>Real-time crop monitoring</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-300" />
                  </div>
                  <span>AI-powered yield predictions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-300" />
                  </div>
                  <span>Actionable farming insights</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// CONTACT PAGE COMPONENT
// ============================================================================
function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', message: "Hi! I'm Agro India AI assistant. How can I help you today?" },
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;

    setChatMessages([...chatMessages, { type: 'user', message: chatInput }]);
    
    setTimeout(() => {
      const responses = [
        "To check your farm's yield prediction, please visit the Farmer Dashboard.",
        "Our AI models use CNN, LSTM, and Transformer architectures for predictions.",
        "You can download our mobile app for iOS and Android to get real-time notifications.",
        "For technical support, please email support@agroindia.com or call +91-1800-AGRO-IN.",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatMessages(prev => [...prev, { type: 'bot', message: randomResponse }]);
    }, 1000);

    setChatInput('');
  };

  const quickQuestions = [
    "How accurate are your predictions?",
    "How do I sign up as a farmer?",
    "What regions do you support?",
    "Tell me about your pricing",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl mb-4">Get in Touch</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out via the form, chat, or download our mobile app.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p>Email</p>
                    <p className="text-sm text-muted-foreground">support@agroindia.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <p>Phone</p>
                    <p className="text-sm text-muted-foreground">+91-1800-AGRO-IN</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-600 mt-1" />
                  <div>
                    <p>Address</p>
                    <p className="text-sm text-muted-foreground">
                      Sector 62, Noida<br />
                      Uttar Pradesh 201301<br />
                      India
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="How can we help you?"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us more about your inquiry..."
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Chatbot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="h-[500px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  AI Chat Assistant
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                  {chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          msg.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        {msg.message}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {quickQuestions.map((question, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer hover:bg-blue-50"
                        onClick={() => setChatInput(question)}
                      >
                        {question}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                      placeholder="Ask about your farm's yield prediction..."
                    />
                    <Button onClick={handleChatSubmit} className="bg-blue-600 hover:bg-blue-700">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Mobile App Download */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="h-[500px] bg-gradient-to-br from-green-500 to-emerald-600 text-white">
              <CardContent className="pt-6 h-full flex flex-col justify-center items-center text-center">
                <Smartphone className="w-20 h-20 mb-6 opacity-90" />
                <h2 className="text-3xl mb-4">Download Our Mobile App</h2>
                <p className="text-green-100 mb-8 max-w-md">
                  Get real-time crop predictions, weather alerts, and actionable insights 
                  right on your smartphone. Available for iOS and Android.
                </p>
                <div className="space-y-3 w-full max-w-xs">
                  <Button
                    size="lg"
                    className="w-full bg-white text-green-700 hover:bg-green-50"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download for iOS
                  </Button>
                  <Button
                    size="lg"
                    className="w-full bg-white text-green-700 hover:bg-green-50"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download for Android
                  </Button>
                </div>
                <div className="mt-8 pt-8 border-t border-white/20 w-full">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl mb-1">4.8★</p>
                      <p className="text-xs text-green-100">App Rating</p>
                    </div>
                    <div>
                      <p className="text-2xl mb-1">50K+</p>
                      <p className="text-xs text-green-100">Downloads</p>
                    </div>
                    <div>
                      <p className="text-2xl mb-1">24/7</p>
                      <p className="text-xs text-green-100">Support</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    localStorage.setItem('agroIndiaUser', JSON.stringify(loggedInUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('agroIndiaUser');
    setCurrentPage('home');
    toast.success('Logged out successfully');
  };

  const handleNavigate = (page: string) => {
    // Check if user needs to be logged in for certain pages
    const protectedPages = ['farmer', 'policymaker'];
    
    if (protectedPages.includes(page) && !user) {
      toast.error('Please login to access this page');
      setCurrentPage('login');
      return;
    }
    
    setCurrentPage(page);
  };

  // Check for saved user on mount
  useState(() => {
    const savedUser = localStorage.getItem('agroIndiaUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  });

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <LandingPage onNavigate={handleNavigate} />;
      case "login":
        return <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />;
      case "farmer":
        return user ? <FarmerDashboard /> : <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />;
      case "policymaker":
        return user ? <PolicymakerDashboard /> : <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />;
      case "insights":
        return <ModelInsights />;
      case "about":
        return <AboutPage />;
      case "contact":
        return <ContactPage />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen">
      {currentPage !== 'login' && (
        <Navigation
          currentPage={currentPage}
          onNavigate={handleNavigate}
          user={user}
          onLogout={handleLogout}
        />
      )}
      <main>{renderPage()}</main>
      <Toaster />
    </div>
  );
}
