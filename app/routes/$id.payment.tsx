import { ActionFunction } from '@remix-run/node';
import {
  Form,
  json,
  useActionData,
  useLocation,
  useNavigate
} from '@remix-run/react';
import { useEffect } from 'react';
import { TextInput } from '~/components/TextInput';
import { Button } from '~/components/Button';
import {
  formatCardNumber,
  formatDate,
  stripNonNumeric
} from '~/utils/formatters';
import {
  validateCreditCard,
  validateDate,
  validateSecurityCode,
  validateZipCode,
  validateName
} from '~/utils/validation';

interface ActionResponse {
  success: boolean;
  errors: { [key: string]: boolean };
  entries: { [key: string]: string };
}

export const action: ActionFunction = async ({ request }) => {
  // Get form values
  const formData = await request.formData();
  const entries = Object.fromEntries(formData.entries());

  // Check validity of form values
  const errors: { [key: string]: boolean } = {
    creditCard: !validateCreditCard(entries.creditCard.toString()),
    expirationDate: !validateDate(entries.expirationDate.toString()),
    securityCode: !validateSecurityCode(entries.securityCode.toString()),
    fullName: !validateName(entries.fullName.toString()),
    zipCode: !validateZipCode(entries.zipCode.toString())
  };

  return json({
    errors,
    entries,
    success: Object.values(errors).every((value) => value === false)
  });
};

export default function PaymentRoute() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const actionData = useActionData() as ActionResponse;

  useEffect(() => {
    // If all values are valid, navigate to review step
    if (actionData?.success) {
      navigate('../review', {
        state: { ...actionData.entries }
      });
    }
  }, [actionData, navigate, state]);

  return (
    <Form method="post" className="flex flex-col gap-6 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput
          label="Credit Card Info"
          id="creditCard"
          name="creditCard"
          maxLength={19}
          className="md:col-span-2"
          onKeyDown={formatCardNumber}
          defaultValue={state?.creditCard}
          autoComplete="cc-number"
          validationHandler={validateCreditCard}
          validationMessage={
            actionData?.errors?.creditCard
              ? 'This field is required'
              : undefined
          }
        />
        <TextInput
          label="Expires (MM/YY)"
          id="expirationDate"
          name="expirationDate"
          maxLength={5}
          onKeyDown={formatDate}
          defaultValue={state?.expirationDate}
          autoComplete="cc-exp"
          validationHandler={validateDate}
          validationMessage={
            actionData?.errors?.expirationDate
              ? 'This field is required'
              : undefined
          }
        />
        <TextInput
          label="Security code (CCV)"
          id="securityCode"
          name="securityCode"
          maxLength={3}
          onKeyDown={stripNonNumeric}
          defaultValue={state?.securityCode}
          autoComplete="cc-csc"
          validationHandler={validateSecurityCode}
          validationMessage={
            actionData?.errors?.securityCode
              ? 'This field is required'
              : undefined
          }
        />
        <TextInput
          label="Name on card"
          id="fullName"
          name="fullName"
          className="md:col-span-2"
          defaultValue={state?.fullName}
          autoComplete="cc-name"
          validationHandler={validateName}
          validationMessage={
            actionData?.errors?.fullName ? 'This field is required' : undefined
          }
        />
        <TextInput
          label="Zip code"
          id="zipCode"
          name="zipCode"
          maxLength={5}
          className="md:col-span-2"
          onKeyDown={stripNonNumeric}
          defaultValue={state?.zipCode}
          autoComplete="postal-code"
          validationHandler={validateZipCode}
          validationMessage={
            actionData?.errors?.zipCode ? 'This field is required' : undefined
          }
        />
      </div>
      <Button className="md:col-span-2">Continue</Button>
    </Form>
  );
}
