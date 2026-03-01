/** @type {import('next').NextConfig} */
const nextConfig = {
  // Headers for vCard serving
  async headers() {
    return [
      {
        source: "/api/vcf",
        headers: [
          {
            key: "Content-Type",
            value: "text/vcard; charset=utf-8",
          },
          {
            key: "Content-Disposition",
            value: 'attachment; filename="mohamed-khedher.vcf"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
