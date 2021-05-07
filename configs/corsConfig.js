const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://app-movies.lod55.nomoredomains.icu',
    'https://app-movies.lod55.nomoredomains.icu',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  credentials: true,
};

module.exports = corsOptions;
