import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, HeatMap,
  AreaChart, Area
} from 'recharts';
import { TrendingUp, Users, Clock, PieChart as PieChartIcon } from 'lucide-react';

const AnalyticsPage = () => {
  // Dummy data for top authors
  const authorData = [
    { name: '0xe68e...e6af', rentals: 156 },
    { name: '0x7a9f...1234', rentals: 142 },
    { name: '0xb3c1...5678', rentals: 128 },
    { name: '0x9d2e...9abc', rentals: 115 },
    { name: '0x4f8a...def0', rentals: 98 },
  ];

  // Dummy data for model market share
  const marketShareData = [
    { name: 'GPT-4', value: 35 },
    { name: 'Claude 3', value: 25 },
    { name: 'Gemini Pro', value: 20 },
    { name: 'Llama 2', value: 15 },
    { name: 'Others', value: 5 },
  ];

  // Dummy data for cost comparison
  const costComparisonData = [
    { month: 'Jan', traditional: 2500, suisaw: 750 },
    { month: 'Feb', traditional: 2800, suisaw: 840 },
    { month: 'Mar', traditional: 3200, suisaw: 960 },
    { month: 'Apr', traditional: 3600, suisaw: 1080 },
    { month: 'May', traditional: 4000, suisaw: 1200 },
    { month: 'Jun', traditional: 4500, suisaw: 1350 },
  ];

  // Dummy data for hourly demand
  const hourlyDemandData = Array.from({ length: 24 }, (_, hour) => ({
    hour: `${hour}:00`,
    value: Math.floor(Math.random() * 100) + 20,
  }));

  const COLORS = ['#da7756', '#c46647', '#a85538', '#8c442a', '#70331b'];

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-accent mb-12 flex items-center gap-3 animate-slide-up">
          <TrendingUp className="w-10 h-10" />
          Platform Analytics
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Authors */}
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-accent/10 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-accent" />
              <h2 className="text-xl font-semibold text-accent">Top Authors</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={authorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#000', 
                    border: '1px solid rgba(218, 119, 86, 0.2)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="rentals" fill="#da7756" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Market Share */}
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-accent/10 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <PieChartIcon className="w-6 h-6 text-accent" />
              <h2 className="text-xl font-semibold text-accent">Model Market Share</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={marketShareData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {marketShareData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#000', 
                    border: '1px solid rgba(218, 119, 86, 0.2)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Hourly Demand */}
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-accent/10 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-accent" />
              <h2 className="text-xl font-semibold text-accent">Hourly Demand</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hourlyDemandData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="hour" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#000', 
                    border: '1px solid rgba(218, 119, 86, 0.2)',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#da7756" 
                  strokeWidth={2}
                  dot={{ fill: '#da7756' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Cost Savings */}
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-accent/10 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-accent" />
              <h2 className="text-xl font-semibold text-accent">Cost Savings vs Traditional</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={costComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#000', 
                    border: '1px solid rgba(218, 119, 86, 0.2)',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="traditional" 
                  stackId="1" 
                  stroke="#666" 
                  fill="#666" 
                  fillOpacity={0.3}
                  name="Traditional Cost"
                />
                <Area 
                  type="monotone" 
                  dataKey="suisaw" 
                  stackId="2" 
                  stroke="#da7756" 
                  fill="#da7756" 
                  fillOpacity={0.3}
                  name="SuiSaw Cost"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-accent/10 animate-fade-in">
            <h3 className="text-lg font-semibold text-accent mb-2">Total Models</h3>
            <p className="text-3xl font-bold text-white">1,234</p>
            <p className="text-sm text-gray-400 mt-1">+12% from last month</p>
          </div>
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-accent/10 animate-fade-in">
            <h3 className="text-lg font-semibold text-accent mb-2">Active Rentals</h3>
            <p className="text-3xl font-bold text-white">567</p>
            <p className="text-sm text-gray-400 mt-1">+8% from last week</p>
          </div>
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-accent/10 animate-fade-in">
            <h3 className="text-lg font-semibold text-accent mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold text-white">89.5K SUI</p>
            <p className="text-sm text-gray-400 mt-1">+15% from last month</p>
          </div>
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-accent/10 animate-fade-in">
            <h3 className="text-lg font-semibold text-accent mb-2">User Savings</h3>
            <p className="text-3xl font-bold text-white">234.2K SUI</p>
            <p className="text-sm text-gray-400 mt-1">Compared to traditional</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;