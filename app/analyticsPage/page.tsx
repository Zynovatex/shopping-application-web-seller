"use client";
import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Cell, AreaChart, Area
} from 'recharts';
import { 
  DollarSign, ShoppingBag, Users, 
  ArrowUpRight, ArrowDownRight, Calendar 
} from 'lucide-react';

// Mock data - replace with your actual API data later
const monthlyData = [
  { name: 'Jan', revenue: 4000, orders: 240, customers: 150 },
  { name: 'Feb', revenue: 3000, orders: 198, customers: 120 },
  { name: 'Mar', revenue: 5000, orders: 300, customers: 180 },
  { name: 'Apr', revenue: 4500, orders: 270, customers: 170 },
  { name: 'May', revenue: 6000, orders: 350, customers: 210 },
  { name: 'Jun', revenue: 8000, orders: 450, customers: 250 }
];

const weeklyData = [
  { name: 'Mon', revenue: 1200, orders: 70 },
  { name: 'Tue', revenue: 1400, orders: 80 },
  { name: 'Wed', revenue: 1300, orders: 75 },
  { name: 'Thu', revenue: 1500, orders: 85 },
  { name: 'Fri', revenue: 1800, orders: 100 },
  { name: 'Sat', revenue: 2200, orders: 120 },
  { name: 'Sun', revenue: 1700, orders: 95 }
];

const yearlyData = [
  { name: '2020', revenue: 43000, orders: 2580, customers: 1450 },
  { name: '2021', revenue: 52000, orders: 3120, customers: 1680 },
  { name: '2022', revenue: 61000, orders: 3660, customers: 1950 },
  { name: '2023', revenue: 78000, orders: 4680, customers: 2340 },
  { name: '2024', revenue: 92000, orders: 5520, customers: 2760 }
];

const categoryData = [
  { name: 'Electronics', value: 35 },
  { name: 'Clothing', value: 25 },
  { name: 'Home', value: 20 },
  { name: 'Books', value: 10 },
  { name: 'Other', value: 10 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const calculateChange = (data: string | any[], key: string) => {
  if (data.length < 2) return { value: 0, isIncrease: false };
  const currentValue = data[data.length - 1][key];
  const previousValue = data[data.length - 2][key];
  const change = ((currentValue - previousValue) / previousValue) * 100;
  return { 
    value: Math.abs(change).toFixed(1), 
    isIncrease: change > 0 
  };
};

interface StatCardProps {
  title: string;
  value: string | number;
  change: { value: string | number; isIncrease: boolean };
  icon: React.ComponentType<{ size: number; className?: string }>;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon }) => {
  const Icon = icon;
  return (
    <div className="bg-white rounded-lg p-4 md:p-6 shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-xs md:text-sm">{title}</p>
          <h3 className="text-lg md:text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className="p-2 md:p-3 rounded-full bg-blue-50 transform transition-all duration-500 hover:rotate-12">
          <Icon size={16} className="text-blue-500" />
        </div>
      </div>
      <div className="mt-2 md:mt-4 flex items-center">
        {change.isIncrease ? (
          <ArrowUpRight size={14} className="text-green-500 animate-pulse" />
        ) : (
          <ArrowDownRight size={14} className="text-red-500 animate-pulse" />
        )}
        <p className={`text-xs md:text-sm font-medium ${change.isIncrease ? 'text-green-500' : 'text-red-500'}`}>
          {change.value}%
        </p>
        <p className="ml-1 text-xs md:text-sm text-gray-500">from last period</p>
      </div>
    </div>
  );
};

const AnalyticsDashboard = () => {
  const [timeframe, setTimeframe] = useState('monthly');
  const [animatedData, setAnimatedData] = useState<{ name: string; revenue: number; orders: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });
  
  // Update dimensions on window resize
  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);
  
  // Determine data based on timeframe
  let data;
  if (timeframe === 'monthly') {
    data = monthlyData;
  } else if (timeframe === 'weekly') {
    data = weeklyData;
  } else {
    data = yearlyData;
  }
  
  const revenueChange = calculateChange(data, 'revenue');
  const ordersChange = calculateChange(data, 'orders');
  
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = data.reduce((sum, item) => sum + item.orders, 0);
  
  const formattedRevenue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(totalRevenue);
  
  // Animation effect when changing timeframe
  useEffect(() => {
    setIsLoading(true);
    setAnimatedData([]);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    const animationTimer = setTimeout(() => {
      const animateData = () => {
        const dataLength = data.length;
        let currentIndex = 0;
        
        const interval = setInterval(() => {
          if (currentIndex < dataLength) {
            setAnimatedData(prev => [...prev, data[currentIndex]]);
            currentIndex++;
          } else {
            clearInterval(interval);
          }
        }, 150);
      };
      
      animateData();
    }, 400);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(animationTimer);
    };
  }, [timeframe, data]);
  
  // Determine whether to show full labels or simplified based on screen size
  const isMobile = dimensions.width < 640;
  const pieRadius = isMobile ? 50 : 60;
  const pieInnerRadius = isMobile ? 0 : 30;

  return (
    <div className="bg-gray-50 min-h-screen p-2 md:p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 px-4 md:px-0">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Shop Analytics Dashboard</h1>
          <p className="text-sm md:text-base text-gray-500">Monitor your store's performance and metrics</p>
        </header>
        
        <div className="mb-6 px-4 md:px-0 overflow-x-auto">
          <div className="flex space-x-2 md:space-x-4">
            <button
              onClick={() => setTimeframe('yearly')}
              className={`px-3 py-1 md:px-4 md:py-2 text-sm md:text-base rounded-md flex items-center ${
                timeframe === 'yearly' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Calendar size={14} className="mr-1 hidden md:inline" /> Yearly
            </button>
            <button
              onClick={() => setTimeframe('monthly')}
              className={`px-3 py-1 md:px-4 md:py-2 text-sm md:text-base rounded-md ${
                timeframe === 'monthly' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setTimeframe('weekly')}
              className={`px-3 py-1 md:px-4 md:py-2 text-sm md:text-base rounded-md ${
                timeframe === 'weekly' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Weekly
            </button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : null}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4 md:px-0 mb-6 md:mb-8">
          <StatCard 
            title="Total Revenue" 
            value={formattedRevenue} 
            change={revenueChange} 
            icon={DollarSign} 
          />
          <StatCard 
            title="Total Orders" 
            value={totalOrders} 
            change={ordersChange} 
            icon={ShoppingBag} 
          />
          <StatCard 
            title="Conversion Rate" 
            value="3.2%" 
            change={{ value: "0.5", isIncrease: true }} 
            icon={Users} 
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 px-4 md:px-0 mb-6 md:mb-8">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md transform transition-all duration-500 hover:shadow-lg">
            <h2 className="text-base md:text-lg font-semibold mb-2 md:mb-4">Revenue Trend</h2>
            <div className="h-60 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={animatedData.length ? animatedData : data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{fontSize: 12}} />
                  <YAxis tick={{fontSize: 12}} />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3b82f6" 
                    fill="#93c5fd" 
                    isAnimationActive={true}
                    animationDuration={1000}
                    animationEasing="ease-in-out"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md transform transition-all duration-500 hover:shadow-lg">
            <h2 className="text-base md:text-lg font-semibold mb-2 md:mb-4">Orders Overview</h2>
            <div className="h-60 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={animatedData.length ? animatedData : data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{fontSize: 12}} />
                  <YAxis tick={{fontSize: 12}} />
                  <Tooltip />
                  <Bar 
                    dataKey="orders" 
                    fill="#10b981"
                    isAnimationActive={true}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 px-4 md:px-0">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md lg:col-span-2 transform transition-all duration-500 hover:shadow-lg">
            <h2 className="text-base md:text-lg font-semibold mb-2 md:mb-4">Revenue vs Orders</h2>
            <div className="h-60 md:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={animatedData.length ? animatedData : data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{fontSize: 12}} />
                  <YAxis yAxisId="left" tick={{fontSize: 12}} />
                  <YAxis yAxisId="right" orientation="right" tick={{fontSize: 12}} />
                  <Tooltip />
                  <Legend wrapperStyle={{fontSize: '12px'}}/>
                  <Line 
                    yAxisId="left" 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3b82f6" 
                    activeDot={{ r: 6 }}
                    isAnimationActive={true} 
                    animationDuration={1200}
                    animationEasing="ease-in-out"
                    strokeWidth={2}
                  />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="orders" 
                    stroke="#f59e0b"
                    isAnimationActive={true}
                    animationBegin={300}
                    animationDuration={1200}
                    animationEasing="ease-in-out"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md transform transition-all duration-500 hover:shadow-lg">
            <h2 className="text-base md:text-lg font-semibold mb-2 md:mb-4">Sales by Category</h2>
            <div className="h-60 md:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={pieRadius}
                    innerRadius={pieInnerRadius}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => 
                      isMobile
                        ? `${(percent * 100).toFixed(0)}%` 
                        : `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    isAnimationActive={true}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Mobile-specific bottom navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg p-2 flex justify-around border-t border-gray-200">
          <button 
            className="flex flex-col items-center p-2 text-xs text-gray-600 hover:text-blue-600"
            onClick={() => setTimeframe('weekly')}
          >
            <ShoppingBag size={20} />
            <span>This Week</span>
          </button>
          <button 
            className="flex flex-col items-center p-2 text-xs text-gray-600 hover:text-blue-600"
            onClick={() => setTimeframe('monthly')}
          >
            <DollarSign size={20} />
            <span>Monthly</span>
          </button>
          <button 
            className="flex flex-col items-center p-2 text-xs text-gray-600 hover:text-blue-600"
            onClick={() => setTimeframe('yearly')}
          >
            <Calendar size={20} />
            <span>Yearly</span>
          </button>
        </div>
        
        {/* Add padding to ensure content isn't hidden behind the mobile nav */}
        <div className="lg:hidden h-16"></div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;