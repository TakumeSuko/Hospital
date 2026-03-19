import { FormProps } from './propType';

export const validate = (form: FormProps) => {
  const newErrors: Partial<FormProps> = {};

  if (!form.firstName) newErrors.firstName = 'Please enter first name';
  if (!form.lastName) newErrors.lastName = 'Please enter last name';
  if (!form.dateofbirth) newErrors.dateofbirth = 'Please enter date of birth';
  if (!form.gender) newErrors.gender = 'Please select gender';
  if (!form.phone) newErrors.phone = 'Please enter phone number';
  if (!/^\d{10}$/.test(form.phone)) newErrors.phone = 'Phone must be 10 digits';

  if (!form.email) newErrors.email = 'Please enter email';
  if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email';

  if (!form.address) newErrors.address = 'Please enter address';
  if (!form.nationality) newErrors.nationality = 'Please enter nationality';
  if (!form.emergencyName)
    newErrors.emergencyName = 'Please enter emergency contact name';

  return newErrors;
};
