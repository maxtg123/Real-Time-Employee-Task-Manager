// import { useState } from 'react';
// import { sendAccessCode } from './authApi';

// export function useAuth() {
//   const [loading, setLoading] = useState(false);

//   const requestAccessCode = async (phoneNumber) => {
//     try {
//       setLoading(true);
//       const res = await sendAccessCode(phoneNumber);
//       return res;
//     } catch (err) {
//       console.error(err);
//       return { success: false };
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { requestAccessCode, loading };
// }