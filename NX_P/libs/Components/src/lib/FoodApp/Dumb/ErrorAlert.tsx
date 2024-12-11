import { Alert, Collapse } from '@mui/material';
interface IErrorAlertProps {
  errorText: string;
}
export function ErrorAlert(props: IErrorAlertProps) {
  return (
    <Collapse in={props.errorText}>
      <Alert
        variant={'outlined'}
        severity="error"
        sx={{ marginBottom: '20px' }}
      >
        {props.errorText}
      </Alert>
    </Collapse>
  );
}

export default ErrorAlert;
