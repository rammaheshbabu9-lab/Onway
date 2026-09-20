import React, { useState } from 'react';
import { 
  Sparkles, 
  MessageCircle, 
  Download, 
  Share2, 
  Play, 
  Heart, 
  Smile, 
  Flame, 
  Film, 
  Briefcase,
  Check
} from 'lucide-react';
import { LanguageCode } from '../../types';

interface BuzzItem {
  id: string;
  type: 'status' | 'meme' | 'video' | 'job';
  title: string;
  category: string;
  mediaUrl: string;
  downloads: number;
  shares: number;
  likes: number;
  tags: string[];
}

const BUZZ_ITEMS: BuzzItem[] = [
  {
    id: 'bz-1',
    type: 'status',
    title: 'శ్రీ వెంకటేశ్వర స్వామి సుప్రభాతం & తిరుమల దర్శనం వాట్సాప్ వీడియో స్టేటస్',
    category: 'Devotional Status',
    mediaUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
    downloads: 48200,
    shares: 23100,
    likes: 12400,
    tags: ['తిరుమల', 'భక్తి స్టేటస్', 'వాట్సాప్']
  },
  {
    id: 'bz-2',
    type: 'meme',
    title: 'సోమవారం మార్నింగ్ ఆఫీస్ మీటింగ్స్ చూసి ఉద్యోగుల రియాక్షన్! 😂',
    category: 'Daily Viral Meme',
    mediaUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    downloads: 31200,
    shares: 18900,
    likes: 9800,
    tags: ['ఆఫీస్ మీమ్స్', 'హైదరాబాద్ ఫన్', 'వైరల్']
  },
  {
    id: 'bz-3',
    type: 'video',
    title: 'వైరల్ వీడియో: వరంగల్ వేయి స్తంభాల గుడి డ్రోన్ విజువల్స్ అద్భుతం!',
    category: 'Trending Video',
    mediaUrl: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=600&q=80',
    downloads: 56700,
    shares: 28400,
    likes: 18200,
    tags: ['వరంగల్', 'డ్రోన్ వీడియో', 'హెరిటేజ్']
  },
  {
    id: 'bz-4',
    type: 'status',
    title: 'వర్షపు జల్లులలో వేడి వేడి చాయ్ & సమోసా - మాన్సూన్ మూడ్ స్టేటస్',
    category: 'Monsoon Status',
    mediaUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80',
    downloads: 39400,
    shares: 19800,
    likes: 11200,
    tags: ['వర్షం', 'చాయ్ లవర్స్', 'స్టేటస్']
  },
  {
    id: 'bz-5',
    type: 'job',
    title: 'హైపర్లోకల్ జాబ్స్: జిల్లా కో-ఆపరేటివ్ బ్యాంక్ లో 42 అసిస్టెంట్ పోస్టులు',
    category: 'Hyperlocal Jobs',
    mediaUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    downloads: 24100,
    shares: 14500,
    likes: 6700,
    tags: ['ఉద్యోగాలు', 'డిస్ట్రిక్ట్ రిక్రూట్‌మెంట్', 'బ్యాంక్ జాబ్స్']
  }
];

interface EntertainmentBuzzHubProps {
  selectedLanguage: LanguageCode;
}

export const EntertainmentBuzzHub: React.FC<EntertainmentBuzzHubProps> = ({ selectedLanguage }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'status' | 'meme' | 'video' | 'job'>('all');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredItems = activeFilter === 'all' 
    ? BUZZ_ITEMS 
    : BUZZ_ITEMS.filter(b => b.type === activeFilter);

  const handleDownload = (id: string, mediaUrl: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      window.open(mediaUrl, '_blank');
    }, 500);
  };

  const handleShare = (item: BuzzItem) => {
    const text = `🔥 Check out this viral ${item.category}: "${item.title}" on OnWay News! Read and download free: https://onwaynews.app/buzz/${item.id}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Top Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-900/50 via-slate-900 to-pink-900/50 border border-purple-800/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-pink-500/20 text-pink-400 border border-pink-500/30">
              <Flame className="w-4 h-4" />
            </span>
            <h2 className="text-base sm:text-lg font-bold text-white">
              వినోదం & బజ్ హబ్ (Entertainment, Memes & Free Statuses)
            </h2>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            డైలీ వైరల్ మీమ్స్, ఉచిత వాట్సాప్ స్టేటస్ వీడియోలు, ట్రెండింగ్ రీల్స్ మరియు లోకల్ జాబ్స్ అలర్ట్స్
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
          {[
            { id: 'all', label: 'All Buzz' },
            { id: 'status', label: 'WhatsApp Status' },
            { id: 'meme', label: 'Memes' },
            { id: 'video', label: 'Viral Videos' },
            { id: 'job', label: 'Local Jobs' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                activeFilter === tab.id
                  ? 'bg-pink-600 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Buzz Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map(item => (
          <div 
            key={item.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:border-slate-700 transition-all flex flex-col group"
          >
            {/* Visual Thumbnail */}
            <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
              <img
                src={item.mediaUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              
              {/* Category pill */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900/90 text-pink-300 border border-pink-500/30 backdrop-blur-sm">
                  {item.category}
                </span>
              </div>

              {/* Play icon if video/status */}
              {(item.type === 'video' || item.type === 'status') && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h4 className="font-bold text-sm text-white leading-snug line-clamp-2">
                  {item.title}
                </h4>
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.tags.map((t, idx) => (
                    <span key={idx} className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Engagement metrics & actions */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  {(item.downloads / 1000).toFixed(1)}k
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleShare(item)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 text-xs font-semibold transition-all"
                    title="Share to WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                  <button
                    onClick={() => handleDownload(item.id, item.mediaUrl)}
                    disabled={downloadingId === item.id}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                    title="Download Media File"
                  >
                    <Download className={`w-3.5 h-3.5 ${downloadingId === item.id ? 'animate-bounce text-amber-400' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
