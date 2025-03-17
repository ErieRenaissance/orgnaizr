import { Input } from '@/components/ui/input';
import { type AddressFormData } from '@/types/address-types';
import { useFormContext } from 'react-hook-form';

export function AddressForm() {
  const { register, formState: { errors } } = useFormContext<{ address: AddressFormData }>();

  return (
    <div className="space-y-4">
      <div>
        <Input
          placeholder="Street Address"
          {...register('address.street')}
          className={errors.address?.street ? 'border-destructive' : ''}
        />
        {errors.address?.street && (
          <p className="text-sm text-destructive mt-1">{errors.address.street.message}</p>
        )}
      </div>

      <div>
        <Input
          placeholder="Apartment, suite, etc. (optional)"
          {...register('address.unit')}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Input
            placeholder="City"
            {...register('address.city')}
            className={errors.address?.city ? 'border-destructive' : ''}
          />
          {errors.address?.city && (
            <p className="text-sm text-destructive mt-1">{errors.address.city.message}</p>
          )}
        </div>

        <div>
          <Input
            placeholder="State"
            {...register('address.state')}
            className={errors.address?.state ? 'border-destructive' : ''}
          />
          {errors.address?.state && (
            <p className="text-sm text-destructive mt-1">{errors.address.state.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Input
            placeholder="Postal Code"
            {...register('address.postalCode')}
            className={errors.address?.postalCode ? 'border-destructive' : ''}
          />
          {errors.address?.postalCode && (
            <p className="text-sm text-destructive mt-1">{errors.address.postalCode.message}</p>
          )}
        </div>

        <div>
          <Input
            placeholder="Country"
            {...register('address.country')}
            className={errors.address?.country ? 'border-destructive' : ''}
          />
          {errors.address?.country && (
            <p className="text-sm text-destructive mt-1">{errors.address.country.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}