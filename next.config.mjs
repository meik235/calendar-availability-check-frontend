const nextConfig = {
	env: {
		ENVIRONMENT: "Staging",
		BASE_API_URL: "http://127.0.0.1:8000",
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
};

export default nextConfig;
