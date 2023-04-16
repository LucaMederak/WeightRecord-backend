export const corsOptions = {
  origin: ['https://dashboard.calendpay.com', 'http://localhost:3000'],
};

if (process.env.NODE_ENV === 'dev') {
  corsOptions.origin.push('http://localhost:3000');
}
