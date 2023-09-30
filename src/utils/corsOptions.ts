export const corsOptions = {
  origin: ['https://dashboard.weight-record.mederak.com'],
};

if (process.env.NODE_ENV === 'dev') {
  corsOptions.origin.push('http://localhost:3000');
}
