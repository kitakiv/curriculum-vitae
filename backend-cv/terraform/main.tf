# S3 Bucket
resource "aws_s3_bucket" "cv_uploads" {
  bucket = var.bucket_name
}

resource "aws_s3_bucket_versioning" "cv_uploads_versioning" {
  bucket = aws_s3_bucket.cv_uploads.id
  versioning_configuration {
    status = "Disabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "cv_uploads_encryption" {
  bucket = aws_s3_bucket.cv_uploads.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "cv_uploads_pab" {
  bucket                  = aws_s3_bucket.cv_uploads.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false

}

# Add bucket ACL for public read

resource "aws_s3_bucket_ownership_controls" "cv_uploads_acl_ownership" {
  bucket = aws_s3_bucket.cv_uploads.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "cv_uploads_acl" {
  depends_on = [
    aws_s3_bucket_ownership_controls.cv_uploads_acl_ownership,
    aws_s3_bucket_public_access_block.cv_uploads_pab,
  ]
  bucket = aws_s3_bucket.cv_uploads.id
  acl    = "public-read"
}



# Add bucket policy for public read access
resource "aws_s3_bucket_policy" "cv_uploads_policy" {
  bucket     = aws_s3_bucket.cv_uploads.id
  depends_on = [aws_s3_bucket_public_access_block.cv_uploads_pab]

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.cv_uploads.arn}/*"
      }
    ]
  })
}

# IAM User
resource "aws_iam_user" "cv_app_user" {
  name = "${var.app_name}-s3-user"
}

resource "aws_iam_access_key" "cv_app_user_key" {
  user = aws_iam_user.cv_app_user.name
}

# IAM Policy
resource "aws_iam_policy" "s3_upload_policy" {
  name = "${var.app_name}-s3-policy"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = ["s3:PutObject", "s3:GetObject", "s3:DeleteObject"]
        Resource = "${aws_s3_bucket.cv_uploads.arn}/*"
      },
      {
        Effect   = "Allow"
        Action   = ["s3:ListBucket"]
        Resource = "${aws_s3_bucket.cv_uploads.arn}"
      }
    ]
  })
}

resource "aws_iam_user_policy_attachment" "cv_app_user_policy" {
  user       = aws_iam_user.cv_app_user.name
  policy_arn = aws_iam_policy.s3_upload_policy.arn
}
