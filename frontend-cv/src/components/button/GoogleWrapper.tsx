import GoogleButton from '@/components/button/GoogleButton';
import { getGoogleLink } from '@/variables/form/google';

export default function GoogleWrapper() {
  const googleLink = getGoogleLink();
  
  return (
    <div>
      <GoogleButton googleLink={googleLink} />
    </div>
  );
}
