import { useFormStatus as reactUseFormStatus } from 'react-dom';

type FormStatus = {
  pending: boolean;
  data: FormData | null;
  method: string | null;
  action: string | null;
};

const useFormStatus = (): FormStatus => {
  const status = reactUseFormStatus();
  return {
    pending: status.pending,
    data: (status as any).data,
    method: (status as any).method,
    action: (status as any).action,
  };
};

export default useFormStatus;
