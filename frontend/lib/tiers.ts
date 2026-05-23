export type Tier = "free" | "pro" | "premium";

export interface TierLimits {
  maxActivePlans: number; // -1 = unlimited
  maxPlanDurationDays: number; // -1 = unlimited
  maxAiPlansPerMonth: number; // -1 = unlimited
  analytics: "basic" | "full" | "advanced";
  prioritySupport: boolean;
  export: boolean;
}

export const TIER_LIMITS: Record<Tier, TierLimits> = {
  free: {
    maxActivePlans: 1,
    maxPlanDurationDays: 5,
    maxAiPlansPerMonth: 1,
    analytics: "basic",
    prioritySupport: false,
    export: false,
  },
  pro: {
    maxActivePlans: -1,
    maxPlanDurationDays: 365,
    maxAiPlansPerMonth: -1,
    analytics: "full",
    prioritySupport: false,
    export: true,
  },
  premium: {
    maxActivePlans: -1,
    maxPlanDurationDays: 365,
    maxAiPlansPerMonth: -1,
    analytics: "advanced",
    prioritySupport: true,
    export: true,
  },
};

export interface PricingTier {
  id: Tier;
  name: string;
  price: number; // INR per month
  tagline: string;
  features: string[];
  cta: string;
  highlight?: boolean;
}

export const PRICING: PricingTier[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    tagline: "Try the product, no credit card required.",
    features: [
      "1 active learning plan",
      "Up to 5-day plans",
      "1 AI-generated plan / month",
      "Basic progress tracking",
      "Daily habit checklist",
    ],
    cta: "Start free",
  },
  {
    id: "pro",
    name: "Pro",
    price: 499,
    tagline: "For serious learners who want full power.",
    highlight: true,
    features: [
      "Unlimited learning plans",
      "Plans up to 365 days",
      "Unlimited AI generation",
      "Full progress analytics",
      "Plan editing + export",
      "Email support",
    ],
    cta: "Upgrade to Pro",
  },
  {
    id: "premium",
    name: "Premium",
    price: 999,
    tagline: "Everything in Pro, plus advanced insights.",
    features: [
      "Everything in Pro",
      "Priority AI generation",
      "Streaks & completion trends",
      "Advanced analytics dashboard",
      "Priority support",
    ],
    cta: "Go Premium",
  },
];

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;
