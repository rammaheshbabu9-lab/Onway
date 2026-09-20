export type LanguageCode = 
  | 'te' // Telugu
  | 'hi' // Hindi
  | 'ta' // Tamil
  | 'kn' // Kannada
  | 'ml' // Malayalam
  | 'mr' // Marathi
  | 'gu' // Gujarati
  | 'bn' // Bengali
  | 'en'; // English

export interface LanguageConfig {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  brandName: string; // Regionalized OnWay News name
  tagline: string;
  primaryRegion: string;
  activeUsers: string;
  flagIcon: string;
}

export type NewsCategory = 
  | 'all'
  | 'hyperlocal'
  | 'state'
  | 'national'
  | 'entertainment'
  | 'status_memes'
  | 'viral_videos'
  | 'sports'
  | 'jobs';

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  fullBody?: string;
  category: NewsCategory;
  language: LanguageCode;
  state: string;
  district: string;
  mandal?: string;
  village?: string;
  timestamp: string;
  readCount: number;
  likesCount: number;
  sharesCount: number;
  imageUrl: string;
  videoUrl?: string;
  mediaType: 'image' | 'video' | 'meme' | 'status';
  author: {
    name: string;
    role: string;
    avatar: string;
    verified: boolean;
  };
  source: string;
  sourceUrl?: string;
  tags: string[];
  isBreaking?: boolean;
  isTrending?: boolean;
  whatsappDownloadUrl?: string;
  isUserUploaded?: boolean;
}

export interface DistrictLocation {
  state: string;
  district: string;
  mandals: string[];
}

export type UserRole = 
  | 'SUPER_ADMIN'
  | 'QA_LEAD'
  | 'DEVOPS_ENGINEER'
  | 'REGIONAL_EDITOR';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  assignedRegions: LanguageCode[];
}

export interface ReporterProfile {
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
  state: string;
  district: string;
  bio?: string;
  verified: boolean;
  preferredLanguage?: LanguageCode | 'all';
}

// Testing & Quality Ops Types
export type TestStatus = 'idle' | 'running' | 'passed' | 'failed' | 'skipped';

export interface TestCase {
  id: string;
  suiteId: string;
  title: string;
  description: string;
  language?: LanguageCode;
  durationMs: number;
  status: TestStatus;
  errorMessage?: string;
  stackTrace?: string;
  assertionsCount: number;
  flakinessScore: number; // 0 to 100
  browser: 'chromium' | 'firefox' | 'webkit' | 'mobile-chrome';
}

export interface TestSuite {
  id: string;
  name: string;
  category: 'E2E_LOCALIZATION' | 'VISUAL_REGRESSION' | 'HYPERLOCAL_CORE' | 'GESTURES_FLIP' | 'WHATSAPP_SHARE' | 'API_LATENCY';
  description: string;
  testCases: TestCase[];
  lastRunTimestamp: string;
  status: TestStatus;
}

export interface VisualRegressionDiff {
  id: string;
  componentName: string;
  language: LanguageCode;
  screenSize: 'mobile-390' | 'tablet-768' | 'desktop-1280';
  baselineUrl: string;
  currentUrl: string;
  diffUrl: string;
  mismatchPercentage: number;
  status: 'passed' | 'failed' | 'approved';
  detectedIssue?: string;
}

export interface DeploymentPipeline {
  id: string;
  name: string;
  targetEnv: 'Staging' | 'Regional CDN - South' | 'Regional CDN - North' | 'Production Global';
  lastCommit: string;
  author: string;
  status: 'deploying' | 'healthy' | 'warning' | 'failed';
  uptimePercentage: number;
  latencyMs: number;
  lastDeployed: string;
}

export interface LatencyEdgeNode {
  city: string;
  region: string;
  latencyMs: number;
  status: 'optimal' | 'moderate' | 'degraded';
  loadPercentage: number;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  role: UserRole;
  action: string;
  target: string;
  status: 'SUCCESS' | 'WARNING' | 'DENIED';
  ipAddress: string;
}

export interface ABTestVariant {
  id: string;
  name: string;
  description: string;
  language: LanguageCode;
  trafficSplit: number;
  impressions: number;
  ctr: number;
  avgReadTimeSec: number;
  bounceRate: number;
  winningMetric: string;
}
