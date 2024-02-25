# financial-dashboard-frontend

## Nginx Server Configuration

Configuration file located at: /etc/nginx/sites-available/financial-dashboard

server {
listen 80;
server_name 54.206.238.232; # Use server IP or domain name

    # Serve static files
    location / {
        root /home/ubuntu/financial-dashboard-frontend/build;
        index index.html;
        try_files $uri $uri/ /index.html; # Fallback to index.html for single-page applications
    }

    # Proxy API requests to backend
    location /api/ {
        proxy_pass http://127.0.0.1:5000/; # Forward API requests to your app
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

}

### Handy nginx commands

View logs:
sudo tail -n 20 /var/log/nginx/error.log

Rotate logs:
sudo logrotate -f /etc/logrotate.d/nginx

Command that fixed my permission error:
sudo chmod o+x /home /home/ubuntu /home/ubuntu/financial-dashboard-frontend

## React Admin Dashboard Help

Build a COMPLETE React Admin Dashboard App | React, Material UI, Data Grid, Light & Dark Mode

Video: https://www.youtube.com/watch?v=wYpCWwD1oz0

For all related questions and discussions about this project, check out the discord: https://discord.gg/2FfPeEk2mX
