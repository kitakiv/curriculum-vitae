output "bucket_name" {
  value = aws_s3_bucket.cv_uploads.bucket
}

output "aws_access_key_id" {
  value = aws_iam_access_key.cv_app_user_key.id
}

output "aws_secret_access_key" {
  value     = aws_iam_access_key.cv_app_user_key.secret
  sensitive = true
}

output "bucket_region" {
  value = var.aws_region
}


