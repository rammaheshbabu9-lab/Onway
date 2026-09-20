import {
  TestSuite,
  VisualRegressionDiff,
  DeploymentPipeline,
  LatencyEdgeNode,
  AuditLogEntry,
  ABTestVariant,
  UserProfile
} from '../types';

export const INITIAL_USER_PROFILES: UserProfile[] = [
  {
    id: 'usr-1',
    name: 'Ram Mahesh Babu',
    email: 'rammaheshbabu0@gmail.com',
    role: 'SUPER_ADMIN',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    assignedRegions: ['te', 'hi', 'ta', 'kn', 'ml', 'mr', 'gu', 'bn', 'en']
  },
  {
    id: 'usr-2',
    name: 'Ananya Sharma',
    email: 'ananya.qa@onwaynews.com',
    role: 'QA_LEAD',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    assignedRegions: ['hi', 'mr', 'gu', 'en']
  },
  {
    id: 'usr-3',
    name: 'Karthik Raja',
    email: 'karthik.devops@onwaynews.com',
    role: 'DEVOPS_ENGINEER',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    assignedRegions: ['te', 'ta', 'kn', 'ml']
  },
  {
    id: 'usr-4',
    name: 'Srinivas Rao',
    email: 'srinivas.editor@onwaynews.com',
    role: 'REGIONAL_EDITOR',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    assignedRegions: ['te']
  }
];

export const INITIAL_TEST_SUITES: TestSuite[] = [
  {
    id: 'suite-e2e-loc',
    name: 'Playwright: Regional Localization & Brand Names',
    category: 'E2E_LOCALIZATION',
    description: 'Validates 8 regional brand names, UTF-8 font loading, and localized UI copy without truncation.',
    status: 'passed',
    lastRunTimestamp: '10 mins ago',
    testCases: [
      {
        id: 'tc-loc-te',
        suiteId: 'suite-e2e-loc',
        title: 'Verify Telugu localized brand name "ఆన్ వే న్యూస్"',
        description: 'Asserts header branding and Telugu font rendering without broken conjunct consonants.',
        language: 'te',
        durationMs: 412,
        status: 'passed',
        assertionsCount: 14,
        flakinessScore: 2,
        browser: 'mobile-chrome'
      },
      {
        id: 'tc-loc-hi',
        suiteId: 'suite-e2e-loc',
        title: 'Verify Hindi localized brand name "ऑनवे न्यूज़"',
        description: 'Checks Devanagari ligature accuracy and dynamic region tagline switching.',
        language: 'hi',
        durationMs: 388,
        status: 'passed',
        assertionsCount: 12,
        flakinessScore: 1,
        browser: 'mobile-chrome'
      },
      {
        id: 'tc-loc-ta',
        suiteId: 'suite-e2e-loc',
        title: 'Verify Tamil localized brand name "ஆன்வே நியூஸ்"',
        description: 'Tests Tamil typography line height and pill-button label single-line adherence.',
        language: 'ta',
        durationMs: 440,
        status: 'passed',
        assertionsCount: 12,
        flakinessScore: 4,
        browser: 'chromium'
      },
      {
        id: 'tc-loc-bn',
        suiteId: 'suite-e2e-loc',
        title: 'Verify Bengali localized brand name "অনওয়ে নিউজ"',
        description: 'Checks Bengali script rendering in mobile viewport 390px.',
        language: 'bn',
        durationMs: 495,
        status: 'passed',
        assertionsCount: 11,
        flakinessScore: 3,
        browser: 'webkit'
      }
    ]
  },
  {
    id: 'suite-hyperlocal',
    name: 'Playwright: Hyperlocal 400+ District Engine',
    category: 'HYPERLOCAL_CORE',
    description: 'Validates state-to-district-to-mandal cascade selection and live wire filtering.',
    status: 'passed',
    lastRunTimestamp: '14 mins ago',
    testCases: [
      {
        id: 'tc-hl-warangal',
        suiteId: 'suite-hyperlocal',
        title: 'Cascade Filter: Telangana -> Warangal -> Hanamkonda',
        description: 'Ensures news items from selected mandal are populated with zero delay.',
        language: 'te',
        durationMs: 310,
        status: 'passed',
        assertionsCount: 8,
        flakinessScore: 0,
        browser: 'mobile-chrome'
      },
      {
        id: 'tc-hl-varanasi',
        suiteId: 'suite-hyperlocal',
        title: 'Cascade Filter: Uttar Pradesh -> Varanasi Sadar',
        description: 'Verifies North regional wire accuracy and GPS auto-locate fallback.',
        language: 'hi',
        durationMs: 295,
        status: 'passed',
        assertionsCount: 9,
        flakinessScore: 1,
        browser: 'chromium'
      }
    ]
  },
  {
    id: 'suite-flip-gestures',
    name: 'Playwright: Magazine Flip & Gesture Navigation',
    category: 'GESTURES_FLIP',
    description: 'Validates 3D card flip transitions, swipe vertical gesture, and keyboard navigation.',
    status: 'passed',
    lastRunTimestamp: '22 mins ago',
    testCases: [
      {
        id: 'tc-flip-vertical',
        suiteId: 'suite-flip-gestures',
        title: 'Vertical Swipe Up/Down transitions next article in <60ms',
        description: 'Benchmarks touch physics and DOM recycling on flip magazine layout.',
        durationMs: 520,
        status: 'passed',
        assertionsCount: 18,
        flakinessScore: 5,
        browser: 'mobile-chrome'
      },
      {
        id: 'tc-flip-audio',
        suiteId: 'suite-flip-gestures',
        title: 'Text-To-Speech audio player sync with active slide',
        description: 'Tests speech synthesizer pauses gracefully on flip change.',
        durationMs: 640,
        status: 'passed',
        assertionsCount: 7,
        flakinessScore: 2,
        browser: 'firefox'
      }
    ]
  },
  {
    id: 'suite-whatsapp-share',
    name: 'Playwright: WhatsApp Card Generator & Buzz Hub',
    category: 'WHATSAPP_SHARE',
    description: 'Tests instant WhatsApp status card generation, copy link, and meme share intents.',
    status: 'passed',
    lastRunTimestamp: '35 mins ago',
    testCases: [
      {
        id: 'tc-wa-card-render',
        suiteId: 'suite-whatsapp-share',
        title: 'Render styled WhatsApp preview card with OnWay watermark',
        description: 'Checks canvas export resolution, branding badge, and regional headline wrap.',
        durationMs: 410,
        status: 'passed',
        assertionsCount: 10,
        flakinessScore: 0,
        browser: 'chromium'
      },
      {
        id: 'tc-wa-status-download',
        suiteId: 'suite-whatsapp-share',
        title: 'Validate free WhatsApp status media download URL resolution',
        description: 'Ensures high-speed CDN pre-signed link retrieval within 200ms.',
        durationMs: 380,
        status: 'passed',
        assertionsCount: 6,
        flakinessScore: 1,
        browser: 'mobile-chrome'
      }
    ]
  },
  {
    id: 'suite-vis-reg',
    name: 'Playwright: Visual Regression & Cross-Script Layouts',
    category: 'VISUAL_REGRESSION',
    description: 'Pixel-by-pixel differential testing against baseline snapshots across all 8 languages.',
    status: 'passed',
    lastRunTimestamp: '42 mins ago',
    testCases: [
      {
        id: 'tc-vr-telugu-card',
        suiteId: 'suite-vis-reg',
        title: 'Visual Diff: Telugu Magazine Card on iPhone 15 Pro (390px)',
        description: 'Diff tolerance < 0.15% across dynamic typography height.',
        language: 'te',
        durationMs: 890,
        status: 'passed',
        assertionsCount: 5,
        flakinessScore: 1,
        browser: 'mobile-chrome'
      },
      {
        id: 'tc-vr-tamil-badge',
        suiteId: 'suite-vis-reg',
        title: 'Visual Diff: Tamil Category Pills on Tablet (768px)',
        description: 'Asserts no single-line truncation in Tamil script pills.',
        language: 'ta',
        durationMs: 760,
        status: 'passed',
        assertionsCount: 6,
        flakinessScore: 0,
        browser: 'chromium'
      }
    ]
  }
];

export const VISUAL_REGRESSION_CASES: VisualRegressionDiff[] = [
  {
    id: 'vr-1',
    componentName: 'MagazineFlipCard_Telugu',
    language: 'te',
    screenSize: 'mobile-390',
    baselineUrl: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=600&q=80',
    currentUrl: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=600&q=80',
    diffUrl: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=600&q=80',
    mismatchPercentage: 0.04,
    status: 'passed'
  },
  {
    id: 'vr-2',
    componentName: 'HeaderLocalizedBranding_Hindi',
    language: 'hi',
    screenSize: 'desktop-1280',
    baselineUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=600&q=80',
    currentUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=600&q=80',
    diffUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=600&q=80',
    mismatchPercentage: 0.08,
    status: 'passed'
  },
  {
    id: 'vr-3',
    componentName: 'WhatsAppShareCard_Tamil',
    language: 'ta',
    screenSize: 'mobile-390',
    baselineUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
    currentUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
    diffUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
    mismatchPercentage: 0.12,
    status: 'approved'
  }
];

export const DEPLOYMENT_PIPELINES: DeploymentPipeline[] = [
  {
    id: 'pipe-prod-multi',
    name: 'Production Multi-Region CDN Ingress',
    targetEnv: 'Production Global',
    lastCommit: 'feat(loc): dynamically localized onway brandings across 8 languages (b92e71)',
    author: 'Karthik Raja',
    status: 'healthy',
    uptimePercentage: 99.98,
    latencyMs: 38,
    lastDeployed: '18 mins ago'
  },
  {
    id: 'pipe-apac-south',
    name: 'APAC South Edge Routing (Hyderabad / BLR / Chennai)',
    targetEnv: 'Regional CDN - South',
    lastCommit: 'perf(cache): optimize hyperlocal district JSON shards for 400+ districts (c411a0)',
    author: 'Ram Mahesh Babu',
    status: 'healthy',
    uptimePercentage: 99.99,
    latencyMs: 24,
    lastDeployed: '35 mins ago'
  },
  {
    id: 'pipe-staging-playwright',
    name: 'Staging Playwright Test Verification Pipeline',
    targetEnv: 'Staging',
    lastCommit: 'test(pw): visual regression assertions on mobile-390 viewport (f830d2)',
    author: 'Ananya Sharma',
    status: 'healthy',
    uptimePercentage: 99.95,
    latencyMs: 44,
    lastDeployed: '2 hours ago'
  }
];

export const LATENCY_EDGE_NODES: LatencyEdgeNode[] = [
  { city: 'Hyderabad', region: 'Telangana & AP Hub', latencyMs: 18, status: 'optimal', loadPercentage: 64 },
  { city: 'Bengaluru', region: 'Karnataka Hub', latencyMs: 22, status: 'optimal', loadPercentage: 58 },
  { city: 'Mumbai', region: 'Western India Hub', latencyMs: 28, status: 'optimal', loadPercentage: 72 },
  { city: 'New Delhi', region: 'North India Hub', latencyMs: 31, status: 'optimal', loadPercentage: 69 },
  { city: 'Chennai', region: 'Tamil Nadu Hub', latencyMs: 25, status: 'optimal', loadPercentage: 52 },
  { city: 'Kolkata', region: 'Eastern India Hub', latencyMs: 36, status: 'optimal', loadPercentage: 61 }
];

export const AB_TEST_EXPERIMENTS: ABTestVariant[] = [
  {
    id: 'exp-telugu-flip',
    name: 'Telugu: Magazine Flip Card vs Infinite Scroll',
    description: 'Evaluating reader retention and WhatsApp share intent on 60-word cards vs traditional feed.',
    language: 'te',
    trafficSplit: 50,
    impressions: 482000,
    ctr: 8.9,
    avgReadTimeSec: 142,
    bounceRate: 19.4,
    winningMetric: 'Magazine Flip (+34% shares, +2.8x retention)'
  },
  {
    id: 'exp-hindi-video',
    name: 'Hindi: Video-First Buzz Feed vs Text Headline',
    description: 'Assessing viral video & WhatsApp status drawer prominence for Tier-2/3 cities.',
    language: 'hi',
    trafficSplit: 50,
    impressions: 740000,
    ctr: 11.2,
    avgReadTimeSec: 168,
    bounceRate: 16.2,
    winningMetric: 'Video-First Buzz (+41% WhatsApp forwards)'
  }
];

export const HISTORICAL_TREND_POINTS = [
  { date: 'Sep 13', passed: 98.4, failed: 1.6, avgDurationMs: 420, runs: 148 },
  { date: 'Sep 14', passed: 99.1, failed: 0.9, avgDurationMs: 395, runs: 162 },
  { date: 'Sep 15', passed: 97.8, failed: 2.2, avgDurationMs: 460, runs: 154 },
  { date: 'Sep 16', passed: 99.5, failed: 0.5, avgDurationMs: 380, runs: 190 },
  { date: 'Sep 17', passed: 99.2, failed: 0.8, avgDurationMs: 375, runs: 204 },
  { date: 'Sep 18', passed: 99.8, failed: 0.2, avgDurationMs: 360, runs: 215 },
  { date: 'Sep 19', passed: 100.0, failed: 0.0, avgDurationMs: 352, runs: 232 }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log-101',
    timestamp: '2026-09-19 17:28:40 IST',
    user: 'Ram Mahesh Babu (SUPER_ADMIN)',
    role: 'SUPER_ADMIN',
    action: 'DISPATCH_PLAYWRIGHT_SUITE',
    target: 'suite-e2e-loc (8 Indian Languages)',
    status: 'SUCCESS',
    ipAddress: '10.128.0.42 (Edge-HYD)'
  },
  {
    id: 'log-102',
    timestamp: '2026-09-19 17:20:15 IST',
    user: 'Karthik Raja (DEVOPS_ENGINEER)',
    role: 'DEVOPS_ENGINEER',
    action: 'UPDATE_DEPLOYMENT_PIPELINE',
    target: 'Production Multi-Region CDN Ingress',
    status: 'SUCCESS',
    ipAddress: '10.128.0.18 (Edge-BLR)'
  },
  {
    id: 'log-103',
    timestamp: '2026-09-19 17:15:02 IST',
    user: 'Ananya Sharma (QA_LEAD)',
    role: 'QA_LEAD',
    action: 'APPROVE_VISUAL_REGRESSION',
    target: 'WhatsAppShareCard_Tamil (Tolerance 0.12%)',
    status: 'SUCCESS',
    ipAddress: '10.128.0.95 (Edge-DEL)'
  },
  {
    id: 'log-104',
    timestamp: '2026-09-19 17:05:30 IST',
    user: 'Srinivas Rao (REGIONAL_EDITOR)',
    role: 'REGIONAL_EDITOR',
    action: 'PUBLISH_HYPERLOCAL_BULLETIN',
    target: 'Telangana/Warangal: Kakatiya Canal ₹450 Cr Release',
    status: 'SUCCESS',
    ipAddress: '10.128.0.64 (Edge-WGL)'
  }
];
