variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "eu-west-1"
}

variable "app_name" {
  description = "Application name"
  type        = string
  default     = "cv-backend"
}

# VPC
variable "vpc_cidr" {
  type    = string
  default = "10.0.0.0/16"
}

variable "public_subnet_cidr" {
  type    = string
  default = "10.0.1.0/24"
}

variable "private_subnet_cidr" {
  type    = string
  default = "10.0.2.0/24"
}

variable "availability_zone" {
  type    = string
  default = "eu-west-1a"
}

# S3
variable "bucket_name" {
  description = "S3 bucket name for CV uploads"
  type        = string
  default     = "cv-uploads-images-for-cv-backend-vika"
}

# RDS
variable "db_name" {
  type    = string
  default = "nestjs_postgres_db"
}

variable "db_username" {
  type    = string
  default = "postgres"
}

variable "db_password" {
  type      = string
  sensitive = true
}

variable "db_instance_class" {
  type    = string
  default = "db.t3.micro"
}

variable "db_allocated_storage" {
  type    = number
  default = 10
}

# EC2
variable "ec2_instance_type" {
  type    = string
  default = "t3.micro"
}

variable "ec2_key_name" {
  description = "Name of your existing EC2 key pair for SSH access"
  type        = string
  default     = "ec2_cv_key_pair"
}

variable "backend_port" {
  type    = number
  default = 4000
}

variable "ec2_public_key" {
  type      = string
  sensitive = true
}
