/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BACK_LINK: process.env.BACK_LINK
    },
    images: {
        domains: ['pocki-resources-bucket-prod.s3.amazonaws.com']
    } 
};

export default nextConfig;
