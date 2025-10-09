variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "eu-west-1"
}

variable "bucket_name" {
  description = "S3 bucket name for CV uploads"
  type        = string
  default     = "cv-uploads-images-for-cv-backend"
}

variable "app_name" {
  description = "Application name"
  type        = string
  default     = "cv-backend"
}