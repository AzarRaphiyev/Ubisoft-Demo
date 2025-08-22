import React, { useState, useContext } from 'react';
import { Search, Mail, ExternalLink, Trash, Lock, Users, Flag, RefreshCw, AlertTriangle, MessageSquare, X, Settings, ShoppingCart, User, HelpCircle } from 'lucide-react';
import { GameContext } from '../context/DataContext';

// Mock context - replace with your actual GameContext


const UbisoftHelp = () => {
  const { gamedata = [], dlcdata = [] } = useContext(GameContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMoreGames, setShowMoreGames] = useState(false);
  
  // Combine games + DLCs
  const allItems = [...gamedata, ...dlcdata];
  
  // Filter
  const filteredItems = searchTerm.trim()
    ? allItems.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allItems.slice(0, showMoreGames ? allItems.length : 7);
  

  const commonTopics = [
    { icon: Mail, title: "Change your email", description: "Update your email address" },
    { icon: ExternalLink, title: "Link / unlink your account", description: "Connect or disconnect accounts" },
    { icon: Trash, title: "Disable 2-step verification", description: "Turn off two-factor authentication" },
    { icon: Lock, title: "Recover your account", description: "Get back into your account" },
    { icon: Users, title: "Understand sanctions and bans", description: "Learn about account penalties" },
    { icon: Flag, title: "Report a player", description: "Report inappropriate behavior" },
    { icon: RefreshCw, title: "Request a refund", description: "Return a recent purchase" },
    { icon: AlertTriangle, title: "Troubleshoot authentication error", description: "Fix login issues" }
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);

  const popularResources = [
    { 
      title: "Contents of Rainbow Six Siege editions", 
      description: "Learn about the different editions of Rainbow Six Siege, including Standard, Deluxe, and Ultimate, and what each includes." 
    },
    { 
      title: "Reporting a bug in Rainbow Six Siege", 
      description: "Steps on how to properly report a bug to Ubisoft Support with necessary details for quick resolution." 
    },
    { 
      title: "Improving the security on your Ubisoft account", 
      description: "Tips to enhance your Ubisoft account security, including two-factor authentication and password best practices." 
    },
    { 
      title: "Temporary ban in Rainbow Six Siege", 
      description: "Explanation of temporary bans in Rainbow Six Siege, reasons they happen, and how long they last." 
    },
    { 
      title: "Troubleshooting connectivity issues in Ubisoft games", 
      description: "Guidelines to fix connectivity issues such as NAT type errors, packet loss, or server disconnections." 
    },
    { 
      title: "System requirements for Rainbow Six Siege", 
      description: "Minimum and recommended PC system requirements to run Rainbow Six Siege smoothly." 
    }
  ];

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  const allTopicsSections = [
    {
      icon: User,
      title: "Account Management and Security",
      description: "Help with accessing, managing and protecting your account"
    },
    {
      icon: Flag,
      title: "Player Reporting and Sanctions",
      description: "Ban appeals and reports of Code of Conduct violations"
    },
    {
      icon: Settings,
      title: "Information and Troubleshooting",
      description: "General questions, feedback, in-game issues and troubleshooting"
    },
    {
      icon: ShoppingCart,
      title: "Purchases and Subscriptions",
      description: "Queries regarding your recent purchases or active subscriptions"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-[60px]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-gray-900">Ubisoft Help</h1>
              <nav className="hidden md:flex space-x-8">
                <button className="text-gray-600 hover:text-gray-900 flex items-center">
                  All Topics
                  <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <a href="#" className="text-gray-600 hover:text-gray-900">My Cases</a>
              </nav>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search Help"
                  className="pl-10 pr-4 py-2 border text-[#333] border-gray-300 rounded-lg focus:ring-2 outline-none focus:border-transparent w-64"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Common Topics */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Topics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {commonTopics.map((topic, index) => {
              const IconComponent = topic.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border">
                  <div className="flex flex-col items-center text-center">
                    <IconComponent className="h-8 w-8 text-gray-600 mb-3" />
                    <h3 className="font-medium text-gray-900 mb-1">{topic.title}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Games Section */}
        <section className="mb-12">
          <div className='flex justify-between'>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Games</h2>
          <div className="relative mb-6 w-[250px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="E.g. Assassins Creed, Far Cry 6"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 border border-gray-600 placeholder:text-[#333] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            />
          </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 mb-6">
            {filteredItems.map((item) => (
              <a 
                key={`${item.type}-${item.id}`} 
                href={`detail/${item.type}/${item.id}`}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                    <img 
                      src={item.cardImg} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.type === 'dlc' && (
                      <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                        DLC
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {item.title.slice(0 , 15) } 
                    </h3>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {!searchTerm && (
            <div className="text-center">
              <button 
                onClick={() => setShowMoreGames(!showMoreGames)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                {showMoreGames ? 'Show less games' : 'Show more games'}
                <svg className={`ml-2 h-4 w-4 transition-transform ${showMoreGames ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
        </section>

        {/* Popular Resources */}
        <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Resources</h2>
      
      {/* Grid 2 sütun */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {popularResources.map((resource, index) => (
          <div key={index} className="bg-white rounded-lg border">
            <button
              onClick={() => toggleExpand(index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900">{resource.title}</span>
              <svg
                className={`h-5 w-5 text-gray-400 transition-transform ${
                  expandedIndex === index ? "rotate-180" : ""
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {expandedIndex === index && (
              <div className="px-6 pb-4">
                <p className="text-gray-600">{resource.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>

        {/* All Topics */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allTopicsSections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <IconComponent className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{section.title}</h3>
                      <p className="text-gray-600 text-sm">{section.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Support Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to receive support</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-lg p-3">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Discord support</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Experiencing an urgent issue while in-game or simply have a question? Our Discord can offer real-time assistance when querying and a diverse community of players.
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    Please note our server chat account receive support on this platform.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 rounded-lg p-3">
                  <X className="h-6 w-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">X support</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Follow and tweet to us or see other Ubisoft Support accounts can not help fix for your questions or ideas, and help connect with the latest news, service updates and more live.
                  </p>
                  <p className="text-gray-600 text-sm">
                    Please note we cannot offer account support on this platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-gray-100 rounded-lg p-3">
                  <Mail className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email support.</h3>
                  <p className="text-gray-600 text-sm">Contact our online form for help related to your account, or any other questions you might have.</p>
                </div>
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Contact us
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UbisoftHelp;