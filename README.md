To maintain MongoDB, follow this steps:

1. Install Podman Desktop
2. Go to Extensions > Compose Extension > Install
3. Run PowerShell commands in the current folder:

```PowerShell
podman machine start
podman compose up
```

# Run application at DigitalOcean

1. Launch Droplet Console
2. Pull project updates from repo
3. Rename file `ecosystem.config.example.cjs` to `ecosystem.config.cjs`
4. Edit file `ecosystem.config.cjs` and replace MONGODB_PASSWORD by real MongoDB password
5. Run cmd `pm2 start ecosystem.config.cjs`

## Docker/Podman

1. build image based on Dockerfile `podman build -t nodejs-whisper .`
2. Run container

```bash
podman run -e MONGODB_URI='mongodb+srv://root:MONGODB_PASSWORD@whispercluster.r0jgcnt.mongodb.net/?retryWrites=true&w=majority&appName=WhisperCluster' -e PORT='3000' -e SALT_ROUNDS='10' -e JWT_SECRET='Tu1fo0mO0PcAvjq^q3wQ24BXNI8$9R' -p 3000:3000 nodejs-whisper
```
