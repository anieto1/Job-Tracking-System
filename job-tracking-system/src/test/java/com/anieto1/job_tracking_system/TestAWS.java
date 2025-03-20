package com.anieto1.job_tracking_system;

import software.amazon.awssdk.services.s3.S3Client;

public class TestAWS {
    public static void main(String[] args) {
        try {
            S3Client s3 = S3Client.create();
            System.out.println("AWS SDK is working: " + s3.serviceName());
        } catch (Exception e) {
            System.out.println("Error initializing AWS SDK: " + e.getMessage());
        }
    }
}
