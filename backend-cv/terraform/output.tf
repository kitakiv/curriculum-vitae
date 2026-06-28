output "ec2_public_ip" {
  description = "Public IP of your EC2 instance — use this in GitHub Secrets and your domain DNS"
  value       = aws_instance.backend.public_ip
}

output "rds_endpoint" {
  description = "RDS host — use as POSTGRES_HOST in your .env on EC2"
  value       = aws_db_instance.postgres.address
  sensitive   = true
}

output "rds_port" {
  value = aws_db_instance.postgres.port
}

output "s3_bucket_name" {
  value = aws_s3_bucket.cv_uploads.bucket
}

output "s3_aws_access_key_id" {
  value = aws_iam_access_key.cv_app_user_key.id
}

output "s3_aws_secret_access_key" {
  value     = aws_iam_access_key.cv_app_user_key.secret
  sensitive = true
}
