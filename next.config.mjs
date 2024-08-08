/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BACK_LINK: process.env.BACK_LINK
    },
    images: {
        remotePatterns: [{
            protocol: 'https', 
            hostname: 'pocki-resources-bucket-prod.s3.amazonaws.com',
            pathname: '/**'
        }]
    } 
};

export default nextConfig;
