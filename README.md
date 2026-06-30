cd backend-cv/terraform
terraform init
terraform apply -var="db_password=XXX" -var="ec2_key_name=your-key-pair-name"


 Get outputs and fill your .env on EC2

terraform output ec2_public_ip       # → add to GitHub Secret EC2_HOST
terraform output -raw rds_endpoint   # → POSTGRES_HOST in .env
terraform output -raw s3_aws_secret_access_key  # → AWS_SECRET_ACCESS_KEY



3. Add GitHub Secrets (Settings → Secrets → Actions)

Secret	Value
EC2_HOST	Elastic IP from terraform output
EC2_SSH_KEY	contents of your .pem key file
BACKEND_ENV	entire contents of your filled .env
4. Push to main → GitHub Actions builds the Docker image on EC2 and restarts the containers automatically.


Now you need to:

SSH into EC2 and set up the environment

Build and run the app

Set up Nginx + SSL

Step 1 — SSH into EC2

ssh -i your-key.pem ec2-user@<ec2-public-ip>
Step 2 — Create .env on EC2
cd /app
nano .env

Fill it using .env.production.example as reference. Get the RDS endpoint from:

# on your local machine
cd backend-cv/terraform
terraform output -raw rds_endpoint
terraform output -raw s3_aws_secret_access_key


Step 3 — Copy code & build Docker image

cd /app
docker build -t cv-backend:latest .
docker compose -f docker-compose.prod.yml up -d

Step 4 — Install and configure Nginx
sudo yum install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx

sudo nano /etc/nginx/conf.d/cv-backend.conf


server {
    listen 80;
    server_name <your-ec2-ip-or-domain>;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}


sudo nginx -t
sudo systemctl reload nginx


Option 1 — SSH Tunnel through EC2 (recommended, no infrastructure changes)

EC2 is in the public subnet and can reach RDS. Use it as a jump host:
ssh -i your-key.pem -L 5432:<rds-endpoint>:5432 ec2-user@<ec2-public-ip> -N

Then in your DB client (DBeaver, TablePlus, pgAdmin) connect to:

Host:     localhost
Port:     5432
User:     postgres
Password: <your-db-password>
Database: nestjs_postgres_db




Quickest fix — run the SQL manually via your SSH tunnel:

Connect to RDS through your tunnel in DBeaver/TablePlus and check:

-- see what schemas exist
SELECT schema_name FROM information_schema.schemata;

-- see all tables
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';


ssh -i your-key.pem ec2-user@<ec2-public-ip>
cd /app
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml up -d
docker logs cv-backend --follow


The TypeORM connection is fine. The problem is synchronize: true is not creating tables because RDS requires you to be connected to the correct schema.

Check what's actually in the database right now via your SSH tunnel:

SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

Copy
sql
If it's empty, the issue is TypeORM is connecting but not running CREATE TABLE. This happens when the database exists but was created without the public schema in some RDS setups.

Fix it by running this in your RDS connection: