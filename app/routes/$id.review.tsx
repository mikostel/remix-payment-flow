import { ActionFunction, LoaderFunction } from '@remix-run/node';
import { Form, redirect, useLoaderData, useLocation } from '@remix-run/react';
import { Button } from '~/components/Button';

interface LoaderResponse {
  amountDue: string;
}

export const loader: LoaderFunction = async () => {
  // Make API call to fetch amount due, ie: fetch('/invoice/:id)
  // When response is recieved, pass data into component. For this exercise,
  // return a mocked response.

  return {
    amountDue: '$600.00'
  };
};

export const action: ActionFunction = async () => {
  // Make API call to process payment.
  // On successfull response, redirect to success route
  return redirect('../success');
};

export default function ReviewRoute() {
  const { state } = useLocation();
  const loaderData = useLoaderData() as LoaderResponse;
  const last4Digits = state?.creditCard.slice(-4);

  return (
    <Form method="post" className="flex flex-col gap-4 pb-8 md:pb-5">
      <div className="text-xl">
        You’re about to make a payment of{' '}
        <strong>{loaderData?.amountDue}</strong>.
      </div>
      <div className="flex flex-col gap-2 py-4">
        <div className="text-sm text-abc-grey-80 font-semibold">
          Payment Method
        </div>
        <div className="flex items-center gap-3">
          <img src="/icon-visa.svg" alt="Visa Icon" />
          <div className="text-abc-grey-100 text-sm">
            Card ending in ••••{last4Digits}
          </div>
        </div>
      </div>
      <Button>Pay {state?.amountDue}</Button>
    </Form>
  );
}
