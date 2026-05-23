// Demo-mode subscription stub. Everything unlimited, no validations.
import { TIER_LIMITS, type Tier } from '@/lib/tiers';

export function useSubscription() {
  const tier = 'pro' as Tier;
  return {
    loading: false,
    subscription: {
      tier,
      status: 'active',
      currentPeriodEnd: null,
      cancelAtPeriodEnd: false,
      razorpaySubscriptionId: null,
    },
    tier,
    limits: TIER_LIMITS[tier],
    usage: { aiPlansThisMonth: 0, activePlans: 0 },
    canCreatePlan: true,
    canGenerateAi: true,
    canUseDuration: (_days: number) => true,
    refetch: async () => {},
  };
}
