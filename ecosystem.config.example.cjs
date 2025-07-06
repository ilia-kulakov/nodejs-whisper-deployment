module.exports = {
  apps: [
    {
      name: 'whisper',
      script: 'index.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        SALT_ROUNDS: 10,
        MONGODB_URI:
          'mongodb+srv://root:MONGODB_PASSWORD@whispercluster.r0jgcnt.mongodb.net/?retryWrites=true&w=majority&appName=WhisperCluster',
        JWT_SECRET:
          'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0',
      },
    },
  ],
};
