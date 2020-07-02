// import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
// import * as awsx from "@pulumi/awsx";

const BUCKET_NAME = process.env.BUCKET_NAME || "";
const KEY_NAME = process.env.KEY_NAME || "";

const key = new aws.kms.Key(KEY_NAME);

const bucket = new aws.s3.Bucket(BUCKET_NAME, {
  serverSideEncryptionConfiguration: {
    rule: {
      applyServerSideEncryptionByDefault: {
        sseAlgorithm: "aws:kms",
        kmsMasterKeyId: key.id
      }
    }
  }
});

export const bucketName = bucket.id;
