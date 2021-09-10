import React, { useState } from 'react';
import useQuery from '../../hooks/useQuery';
import { STATUS } from '../../constant';

export default function EmailVerificationResult() {
  const query = useQuery();
  const token = query.get('token');
  const [status, setStatus] = useState(STATUS.IDLE);

  return (
    <div>
      Result :
      {' '}
      {token}
    </div>
  );
}
