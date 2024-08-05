import { Outlet, useLocation } from '@remix-run/react';
import TransitionGroup from '~/components/TransitionGroup';

export default function BillingRoute() {
  const location = useLocation();
  const successRoute = location.pathname.includes('success');

  return !successRoute ? (
    <div className="md:p-8">
      <ul className="w-full bg-white mx-auto md:max-w-[576px] md:rounded-2xl divide-y md:py-4">
        <TransitionGroup
          path="payment"
          step={1}
          title="Payment Information"
          canEdit={true}
        />
        <TransitionGroup path="review" step={2} title="Review and Pay" />
      </ul>
    </div>
  ) : (
    <Outlet />
  );
}
