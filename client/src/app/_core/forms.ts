export class FormInput
{
  errors = new FormErrors();
  value = '';
  required = true;
}

export class FormErrors
{
  required = false;
}