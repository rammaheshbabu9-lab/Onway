import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { NewsItem } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  typeof supabaseUrl === 'string' &&
  supabaseUrl.startsWith('https://') &&
  supabaseAnonKey.length > 15
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Fetch all published news articles from Supabase 'news' table
 */
export async function fetchSupabaseNews(): Promise<NewsItem[] | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('[Supabase] fetch error:', error.message);
      return null;
    }
    if (data && data.length > 0) {
      return data.map((row: any) => ({
        id: row.id?.toString() || `news-${Date.now()}`,
        title: row.title || '',
        summary: row.summary || row.matter || '',
        category: row.category || 'hyperlocal',
        language: row.language || 'te',
        state: row.state || 'Telangana',
        district: row.district || 'Warangal',
        mandal: row.mandal || '',
        timestamp: row.timestamp || 'ఇప్పుడే (Just now)',
        readCount: row.read_count || 1,
        likesCount: row.likes_count || 1,
        sharesCount: row.shares_count || 0,
        imageUrl: row.image_url || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1080&q=80',
        videoUrl: row.video_url || undefined,
        mediaType: row.media_type || (row.video_url ? 'video' : 'image'),
        author: {
          name: row.author_name || 'Ram Mahesh Babu',
          role: row.author_role || 'Verified Reporter',
          avatar: row.author_avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
          verified: row.author_verified !== false
        },
        source: row.source || 'OnWay News Citizen Desk',
        tags: row.tags || [row.district || 'Warangal', 'LocalBuzz'],
        isBreaking: row.is_breaking ?? true
      }));
    }
    return null;
  } catch (err) {
    console.warn('[Supabase] connection error:', err);
    return null;
  }
}

/**
 * Insert a newly published news article into Supabase 'news' table
 */
export async function insertSupabaseNews(newsItem: NewsItem): Promise<boolean> {
  if (!supabase) return false;
  try {
    const row = {
      title: newsItem.title,
      summary: newsItem.summary,
      category: newsItem.category,
      language: newsItem.language,
      state: newsItem.state,
      district: newsItem.district,
      mandal: newsItem.mandal || '',
      timestamp: newsItem.timestamp,
      read_count: newsItem.readCount,
      likes_count: newsItem.likesCount,
      shares_count: newsItem.sharesCount,
      image_url: newsItem.imageUrl,
      video_url: newsItem.videoUrl || null,
      media_type: newsItem.mediaType,
      author_name: newsItem.author.name,
      author_role: newsItem.author.role,
      author_avatar: newsItem.author.avatar,
      author_verified: newsItem.author.verified,
      source: newsItem.source,
      tags: newsItem.tags,
      is_breaking: newsItem.isBreaking ?? true
    };

    const { error } = await supabase.from('news').insert([row]);
    if (error) {
      console.warn('[Supabase] insert error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('[Supabase] insert exception:', err);
    return false;
  }
}
