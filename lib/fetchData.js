import { server } from '../config/server';

export const options = {
  method: 'GET',

  headers: {
    'X-RapidAPI-Key': 'ee7ecdb2femsh5d089ef5993b56fp19ca8ejsn16d46977365f', // ee7ecdb2femsh5d089ef5993b56fp19ca8ejsn16d46977365f 'a8b28b7f7emsh4226784f1422a58p115bb9jsn19f7d225c8ec',this is for my main acc starts at 20juil //process.env.EXERCISE_API_KEY,
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
  },
};
export const YToptions = {
  method: 'GET',

  params: {
    query: 'rick roll',
    next: 'EogDEgVoZWxsbxr-AlNCU0NBUXRaVVVoeldFMW5iRU01UVlJQkMyMUlUMDVPWTFwaWQwUlpnZ0VMWW1VeE1rSkROWEJSVEVXQ0FRdFZNMEZUYWpGTU5sOXpXWUlCQzJaaGVrMVRRMXBuTFcxM2dnRUxaV3hrWldGSlFYWmZkMFdDQVExU1JGbFJTSE5ZVFdkc1F6bEJnZ0VMT0hwRVUybHJRMmc1Tm1PQ0FRc3pOMFU1VjNORWJVUmxaNElCQzJGaFNXcHpPRXN6YjFsdmdnRUxaMmRvUkZKS1ZuaEdlRldDQVF0clN6UXlURnB4VHpCM1FZSUJDME42VHpOaFNXVXdVbkJ6Z2dFTFNVNHdUMk5WZGtkaU5qQ0NBUXRSYTJWbGFGRTRSRjlXVFlJQkMyWk9NVU41Y2pCYVN6bE5nZ0VMZEZac1kwdHdNMkpYU0RpQ0FRdGZSQzFGT1Rsa01XSk1TWUlCQzJoQlUwNVRSSFZOY2pGUmdnRUxkREEzTVZkdE5EVnhWMDAlM0QYgeDoGCILc2VhcmNoLWZlZWQ%3D',
    hl: 'en',
    gl: 'US',
    upload_date: 't',
    type: 'v',
    duration: 's',
    features: 'li;hd',
    sort: 'v',
  },
  headers: {
    'X-RapidAPI-Key': 'a8b28b7f7emsh4226784f1422a58p115bb9jsn19f7d225c8ec',
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
  },
};
export default async function fetchData(url, option) {
  const res = await fetch(url, option);
  const data = await res.json();

  return data;
}
export const fetchuser = async (session) => {
  const fetchedusers = await fetch(`${server}/api/Users/${session.user.email}`);

  const user = await fetchedusers.json();

  return session;
};
