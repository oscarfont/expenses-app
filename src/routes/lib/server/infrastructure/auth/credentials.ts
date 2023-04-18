import { env } from '$env/dynamic/private';

export const keys = {
	type: 'service_account',
	project_id: 'my-spreadsheets-api',
	token_uri: 'https://oauth2.googleapis.com/token',
	auth_uri: 'https://accounts.google.com/o/oauth2/auth',
	auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
	client_x509_cert_url:
		'https://www.googleapis.com/robot/v1/metadata/x509/my-sheets-api%40my-spreadsheets-api.iam.gserviceaccount.com',
	private_key_id: env.GOOGLE_PRIVATE_KEY_ID,
	private_key: env.GOOGLE_PRIVATE_KEY,
	client_email: env.GOOGLE_CLIENT_EMAIL,
	client_id: env.GOOGLE_CLIENT_ID
};
