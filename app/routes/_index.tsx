import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { Button } from '~/components/Button';

export const meta: MetaFunction = () => {
  return [
    { title: 'ABC Health System' },
    {
      name: 'description',
      content: 'Mock billing flow built with Remix and Tailwind.'
    }
  ];
};

interface LoaderResponse {
  invoiceId: string;
  amountDue: string;
}

export const loader: LoaderFunction = async () => {
  // Make API call to fetch invoice details, ie: fetch('/invoice/:id)
  // When response is recieved, pass data into component. For this exercise,
  // return a mocked response.

  return {
    invoiceId: 123456,
    amountDue: '$600.00'
  };
};

export default function IndexRoute() {
  const navigate = useNavigate();
  const loaderData = useLoaderData() as LoaderResponse;

  const handleNext = () => {
    navigate(`${loaderData?.invoiceId}/payment`, { state: { ...loaderData } });
  };

  return (
    <>
      <div className="flex flex-col items-center text-center gap-4 pt-24 pb-12 px-4 max-w-screen-xs mx-auto">
        <h1>Hi, Taylor</h1>
        <p>
          You have 6 medical bills ready from ABC Health System. You can pay
          your bills here or verify your identity to view full bill details.
        </p>
      </div>
      <div className="flex-1 bg-white rounded-t-[32px] p-8">
        <div className="flex flex-col gap-6 mx-auto max-w-screen-xs">
          <div className="flex items-center justify-between">
            <div className="text-sm text-abc-grey-80 font-semibold">
              Total due
            </div>
            <h1>{loaderData?.amountDue}</h1>
          </div>
          <Button onClick={handleNext}>Pay total</Button>
        </div>
      </div>
    </>
  );
}
